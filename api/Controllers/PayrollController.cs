using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using api.Models;
using System.Transactions;
using System.Dynamic;

namespace api.Controllers
{

    [RoutePrefix("api/payroll")]
    public class PayrollController : ApiController
    {
        fmpEntities fmp = new fmpEntities();
        users logUser;
        

        [HttpGet]
        [Route("get")]
        public IHttpActionResult getall()
        {
            var payrolls = fmp.payments.ToList<payments>().Select(p => new 
                           {
                               payment_id = p.payment_id,
                               startdate = ((DateTime)(p.startdate)).ToString("MM/dd/yyyy"),	
                               enddate	= ((DateTime)(p.enddate)).ToString("MM/dd/yyyy"),
                               username	 = p.username,
                               applied	= (p.applied == true) ? "Applied" : "Not Applied",
                               payment_code = p.payment_code
                           });

            return Ok(payrolls);
        }

        [HttpGet]
        [Route("get/{payment_id}")]
        public IHttpActionResult get(int payment_id)
        {
            var payroll_details = fmp.payments_details.ToList<payments_details>().Where(p => p.payment_id == payment_id).Select(p => p);
            var employees = (from e in payroll_details
                             select e.employee_code).Distinct();

            var payment = (from p in fmp.payments
                           where p.payment_id == payment_id
                           select p).FirstOrDefault();

            dynamic payroll = new ExpandoObject();
            payroll.startdate = payment.startdate;
            payroll.enddate = payment.enddate;
            payroll.username = payment.username;

            List<dynamic> lst = new List<dynamic>();

            foreach (string employee in employees)
            {
                dynamic emp = new ExpandoObject();

                var details = from d in payroll_details
                              where d.employee_code == employee
                              select d;
                
                var emp_obj = from emp_o in fmp.staff
                              where emp_o.employee_code == employee
                              select new
                              {
                                  emp_o.name,
                                  emp_o.last_name,
                                  emp_o.phones,
                                  emp_o.address,
                                  emp_o.birthday,
                                  emp_o.email,
                                  emp_o.employee_code,
                                  emp_o.hire_date,
                                  title = new { emp_o.titles.id, emp_o.titles.payrate, emp_o.titles.description, emp_o.titles.nigthdiff },
                                  emp_o.id,
                                  emp_o.middle_name,
                                  emp_o.sex,
                                  emp_o.status,
                                  emp_o.supervisor_code
                              };

                emp.days = new dynamic[7];
                emp.employee = emp_obj;
                emp.totalNigthDiff = 0;
                emp.totalOvertimeHours = 0;
                emp.totalRegHours = 0;

                int count = 0;

                foreach (payments_details item in details)
                {
                    emp.days[count] = new ExpandoObject();
                    emp.days[count].date = item.date;
                    emp.days[count].day = item.day;
                    emp.days[count].nigthDiff = 0;
                    emp.days[count].overtime = item.overtime;
                    emp.days[count].overtimeReimbursement = 0;
                    emp.days[count].regularHours = item.required_hours;
                    emp.days[count].regularReimbursement = 0;

                    emp.totalOvertimeHours += ((item.overtime * item.payrate) * Convert.ToDecimal(1.50));
                    emp.totalRegHours += ((item.required_hours * item.payrate));

                    var reimbursement = from r in fmp.payments_reimbursements
                                        where r.employee_code == employee &&
                                        r.payment_id == payment_id && r.day == item.day
                                        select r;

                    if(reimbursement.Count() > 0)
                    {
                        emp.days[count].reimbursements = new dynamic[reimbursement.Count()];
                        int count_ri = 0;
                        foreach (payments_reimbursements ri in reimbursement)
                        {
                            var reim_type = (from rim in fmp.reimbursement
                                            where rim.id == ri.reimbursement_id
                                            select rim).FirstOrDefault();

                            emp.days[count].reimbursements[count_ri] = new ExpandoObject();
                            emp.days[count].reimbursements[count_ri].comment = ri.comment;
                            emp.days[count].reimbursements[count_ri].description = reim_type.description;
                            emp.days[count].reimbursements[count_ri].hours = ri.hours;
                            emp.days[count].reimbursements[count_ri].id = ri.id;
                            emp.days[count].reimbursements[count_ri].index = count_ri;
                            emp.days[count].reimbursements[count_ri].obj = reim_type;
                            emp.days[count].reimbursements[count_ri].payrate = reim_type.payrate;
                            emp.days[count].reimbursements[count_ri].rate = ri.rate;
                            emp.days[count].reimbursements[count_ri].type = new ExpandoObject();
                            emp.days[count].reimbursements[count_ri].type.id = ri.reimbursement_id;
                            count_ri++;
                        }
                    }
                    count++;

                }
                lst.Add(emp);

            }

            payroll.employees = lst;

            return Ok(payroll);
        }

        [HttpPost]
        [Route("save")]
        public IHttpActionResult save(dynamic payrollData)
        {

            using(TransactionScope scope = new TransactionScope())
            {

                try
                {
                    string username = Request.Headers.GetValues("logusr").FirstOrDefault();
                    payments p = new payments();
                    p.startdate = Convert.ToDateTime(payrollData.startdate);
                    p.enddate = Convert.ToDateTime(payrollData.enddate);
                    p.username = username;

                    fmp.payments.Add(p);
                    fmp.SaveChanges();

                    foreach (dynamic employee in payrollData.employees)
                    {
                        foreach (dynamic day in employee.days)
                        {
                            payments_details detail = new payments_details();
                            detail.required_hours = Convert.ToDecimal(day.regularHours);
                            detail.overtime = Convert.ToDecimal(day.overtime);
                            detail.day = Convert.ToString(day.day);
                            detail.date = Convert.ToDateTime(day.date);
                            detail.payment_id = p.payment_id;
                            detail.employee_code = Convert.ToString(employee.employee.employee_code);
                            detail.payrate = Convert.ToDecimal(employee.employee.title.payrate);
                            fmp.payments_details.Add(detail);

                            if (day.reimbursements != null)
                            {
                                foreach (dynamic reimbursement in day.reimbursements)
                                {
                                    payments_reimbursements pr = new payments_reimbursements();
                                    pr.comment = Convert.ToString(reimbursement.comment);
                                    pr.hours = Convert.ToDecimal(reimbursement.hours);
                                    pr.rate = Convert.ToDecimal(reimbursement.rate);
                                    pr.reimbursement_type = Convert.ToInt32(reimbursement.type.id);
                                    pr.payment_id = p.payment_id;
                                    pr.reimbursement_id = Convert.ToInt32(reimbursement.id);
                                    pr.day = Convert.ToString(day.day);
                                    pr.date = Convert.ToDateTime(day.date);
                                    pr.employee_code = Convert.ToString(employee.employee.employee_code);

                                    fmp.payments_reimbursements.Add(pr);

                                }
                            }
                        }
                    }
                    fmp.SaveChanges();
                    scope.Complete();

                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }

            }

            return Ok("1");
        }




        public string getNextPaymentCode()
        {
            string payment_code = "";

            sys_parameters parameters = new sys_parameters();
            parameters = (from p in fmp.sys_parameters
                          select p).FirstOrDefault<sys_parameters>();
            

            return payment_code;
        }


    }
}

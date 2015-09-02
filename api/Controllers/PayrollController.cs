using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using api.Models;
using System.Transactions;
using System.Dynamic;
using System.Globalization;

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
                               b_applied = p.applied == null ? false : p.applied,
                               payment_code = p.payment_code
                           });

            return Ok(payrolls);
        }

        [HttpPost]
        [Route("apply")]
        public IHttpActionResult apply([FromBody]int payment_id)
        {
            try
            {
                var payment = (from p in fmp.payments
                              where p.payment_id == payment_id
                              select p).FirstOrDefault();

                payment.applied = true;
                fmp.SaveChanges();

                return Ok(1);
            }
            catch (Exception ex)
            {

                return InternalServerError(ex) ;
            }
        }


        [HttpPost]
        [Route("delete")]
        public IHttpActionResult delete([FromBody]int payment_id)
        {
            try
            {
                var payment = (from p in fmp.payments
                               where p.payment_id == payment_id
                               select p).FirstOrDefault();

                deletePayrollData(payment);
                fmp.payments.Remove(payment);
                fmp.SaveChanges();

                return Ok(1);
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
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
            payroll.payment_id = payment_id;
            payroll.startdate = ((DateTime)payment.startdate).ToString("MM/dd/yyyy");
            payroll.enddate = ((DateTime)payment.enddate).ToString("MM/dd/yyyy");
            payroll.username = payment.username;
            payroll.payment_code = payment.payment_code;
            payroll.applied = payment.applied == null ? false : payment.applied;
            /*payroll.employees = from pd in fmp.payments_details
                                from emp in fmp.staff
                                where pd.payment_id == payment_id &&
                                emp.employee_code == pd.employee_code
                                select new
                                {
                                    days = from d in fmp.payments_details
                                           where d.employee_code == emp.employee_code
                                           select new
                                           {
                                               d.date,
                                               d.day,
                                               nigthDiff = 0,
                                               d.overtime,
                                               overtimeReimbursement = 0,
                                               regularHours = d.required_hours,
                                               regularReimbursement = 0

                                           },
                                    totalOvertimeHours =  += ((item.overtime * item.payrate) * Convert.ToDecimal(1.50));
                                };

            
              emp.days[count].date = item.date;
                    emp.days[count].day = item.day;
                    emp.days[count].nigthDiff = 0;
                    emp.days[count].overtime = item.overtime;
                    emp.days[count].overtimeReimbursement = 0;
                    emp.days[count].regularHours = item.required_hours;
                    emp.days[count].regularReimbursement = 0;

                    emp.totalOvertimeHours += ((item.overtime * item.payrate) * Convert.ToDecimal(1.50));
                    emp.totalRegHours += ((item.required_hours * item.payrate));
             
             */



            List<dynamic> lst = new List<dynamic>();

            foreach (string employee in employees)
            {
                dynamic emp = new ExpandoObject();

                var details = from d in payroll_details
                              where d.employee_code == employee
                              select d;
                
                var emp_obj = (from emp_o in fmp.staff
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
                              }).FirstOrDefault();

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

            payroll.employees = from emp in lst
                                    select emp;

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
                    bool editing = false;
                    
                    
                    if(payrollData.payment_id != null)
                    {
                        int payment_id = payrollData.payment_id;
                        p = (from py in fmp.payments
                             where py.payment_id == payment_id
                             select py).FirstOrDefault<payments>();
                        editing = true;
                    }
                    else
                    {
                        p = new payments();
                    }

                    p.startdate = Convert.ToDateTime(payrollData.startdate);
                    p.enddate = Convert.ToDateTime(payrollData.enddate);
                    p.username = username;
                 
                    if (!editing)
                    {
                        p.payment_code = getNextPaymentCode(username);
                        fmp.payments.Add(p);
                        updatePaymentCode(username);
                    }
                    else
                    {
                        deletePayrollData(p);
                    }
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
                                    pr.reimbursement_id = Convert.ToInt32(reimbursement.obj.id);
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


        public void deletePayrollData(payments record)
        {
            var payment_details = (from e in fmp.payments_details
                         where e.payment_id == record.payment_id
                         select e).ToList<payments_details>();

            var payment_reimbursement = (from e in fmp.payments_reimbursements
                                   where e.payment_id == record.payment_id
                                   select e).ToList<payments_reimbursements>();

            foreach (payments_details item in payment_details)
            {
                fmp.payments_details.Remove(item);
            }

            foreach (payments_reimbursements item in payment_reimbursement)
            {
                fmp.payments_reimbursements.Remove(item);
            }
        }

        public string getNextPaymentCode(string username)
        {
            string payment_code = "";

            schools school = (from s in fmp.schools
                              from u in fmp.users
                              where u.username == username &&
                              s.code == u.school_code
                              select s).FirstOrDefault<schools>();

            int last_payment_code = school.last_payment_code_secuence == null ? 0 : (int)school.last_payment_code_secuence;
            last_payment_code++;
            payment_code = String.Format(CultureInfo.InvariantCulture, "{0:PRL0000000000}", last_payment_code);

            return payment_code;
        }

        public bool updatePaymentCode(string username)
        {
            try
            {
                schools school = (from s in fmp.schools
                                  from u in fmp.users
                                  where u.username == username &&
                                  s.code == u.school_code
                                  select s).FirstOrDefault<schools>();

                int last_payment_code = school.last_payment_code_secuence == null ? 0 : (int)school.last_payment_code_secuence;
                school.last_payment_code_secuence = last_payment_code + 1;
                fmp.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }


    }
}

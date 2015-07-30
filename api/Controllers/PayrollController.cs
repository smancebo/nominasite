using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using api.Models;
using System.Transactions;

namespace api.Controllers
{

    [RoutePrefix("api/payroll")]
    public class PayrollController : ApiController
    {
        fmpEntities fmp = new fmpEntities();
        
        [HttpPost]
        [Route("save")]
        public IHttpActionResult save(dynamic payrollData)
        {

            using(TransactionScope scope = new TransactionScope())
            {

                try
                {


                    payments p = new payments();
                    p.startdate = Convert.ToDateTime(payrollData.startdate);
                    p.enddate = Convert.ToDateTime(payrollData.enddate);
                    p.username = "smancebo";

                    fmp.payments.Add(p);
                    fmp.SaveChanges();

                    foreach (dynamic employee in payrollData.employees)
                    {
                        foreach (dynamic day in employee.days)
                        {
                            payments_details detail = new payments_details();
                            detail.required_hours = Convert.ToDecimal(day.regularHours);
                            detail.overtime = Convert.ToDecimal(day.overtime);
                            detail.day = Convert.ToDateTime(day.date);
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

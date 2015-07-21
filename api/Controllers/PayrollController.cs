using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using api.Models;

namespace api.Controllers
{

    [RoutePrefix("api/payroll")]
    public class PayrollController : ApiController
    {
        fmpEntities fmp = new fmpEntities();
        
        [Route("save")]
        public IHttpActionResult save(dynamic payrollData)
        {

            using(var transaction = fmp.Database.Connection.BeginTransaction())
            {

                payments p = new payments();
                p.startdate = Convert.ToDateTime(payrollData.startdate);
                p.enddate = Convert.ToDateTime(payrollData.enddate);
                p.username = "";

                fmp.payments.Add(p);
                fmp.SaveChanges();

                foreach (dynamic employee in payrollData.employees)
                {
                    foreach (dynamic day in employee.days)
                    {
                        payments_details detail = new payments_details();
                        detail.required_hours = Convert.ToDecimal(day.regularHours);
                        detail.overtime = Convert.ToDecimal(day.overtime);
                        detail.day = new DateTime();//day.day
                        detail.payment_id = p.payment_id;
                        fmp.payments_details.Add(detail);

                        try
                        {
                            foreach (dynamic reimbursement in day.reimbursements)
                            {
                                payments_reimbursements pr = new payments_reimbursements()

                            }
                        }
                        catch (Exception)
                        {
                            
                            throw;
                        }

                    }
                }


            }

           


            return Ok();
        }

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

//using api.Models;
using Newtonsoft.Json;
using utilities;

namespace API.Controllers
{
    public class emp
    {
        public string employee_code { get; set; }
    }
    
    [RoutePrefix("api/staff")]
    public class StaffController : ApiController
    {

        fmpEntities fmp = new fmpEntities();

        [HttpGet]
        [Route("get")]
        public IHttpActionResult getAll()
        {
            var staff = from emp in fmp.staff
                        select emp;

            

            return Ok(staff);
        }

        [HttpGet]
        [Route("get/{employee_code}")]
        public IHttpActionResult get(string employee_code)
        {
            var staff = (from emp in fmp.staff
                        where emp.employee_code == employee_code
                        select emp).FirstOrDefault();



            return Ok(staff);
        }


        [Route("save")]
        [HttpPost]
        public IHttpActionResult save([FromBody]staff employee_obj)
        {
            try
            {
                //Models.staff employee = JsonConvert.DeserializeObject<Models.staff>(employee_obj);
                //Models.staff employee = employee_obj;
                string employee_code = (string)employee_obj.employee_code;

                staff record = (from e in fmp.staff
                                       where e.employee_code == employee_code
                                       select e).SingleOrDefault<staff>();

                if (record != null)
                {
                    objMapper.Map<staff>(ref record, employee_obj);
                    //fmp.staff.Add(record);
                }
                else
                {
                   
                    fmp.staff.Add(employee_obj);
                }
                fmp.SaveChanges();
                string a = employee_obj.employee_code;
               
                return Ok("1");
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

//using api.Models;
using Newtonsoft.Json;
//using utilities;

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

        
        [Route("save")]
        [HttpPost]
        public IHttpActionResult save([FromBody]emp employee_obj)
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
                    //objMapper.Map<staff>(ref record, employee_obj);
                    fmp.staff.Add(record);
                }
                else
                {
                    staff new_record = new staff();
                    //objMapper.Map<staff>(ref new_record, employee_obj);
                }
                fmp.SaveChanges();
                return Ok("1");
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("get/{id}")]
        public IHttpActionResult prueba(string id)
        {
            return Ok(new { nombre = "prueba" });
        }

    }
}

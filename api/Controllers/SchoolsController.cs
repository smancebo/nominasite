
using api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using utilities;


namespace api.Controllers
{
    [RoutePrefix("api/schools")]
    public class SchoolsController : ApiController
    {

        fmpEntities fmp = new fmpEntities();

        [HttpGet]
        [Route("get")]
        public IHttpActionResult getAllSchools()
        {
            var sh = from s in fmp.schools
                     from sup in fmp.staff
                     from charge in fmp.staff
                     where sup.employee_code == s.supervisor &&
                     charge.employee_code == s.employee_manager

                     select new
                     {
                         s.id,
                         s.code,
                         employee_manager = new { charge.employee_code, name = charge.name + " " + charge.middle_name + " " + charge.last_name  },
                         s.location,
                         s.name,
                         s.size,
                         supervisor = new { sup.employee_code, name = sup.name + " " + sup.middle_name + " " + sup.last_name }
                     };

            return Ok(sh);
        }

        [HttpGet]
        [Route("get/{schoolId}")]
        public IHttpActionResult get(int schoolId)
        {
            var sh = (from s in fmp.schools
                      where s.id == schoolId
                      select new
                      {
                          s.id,
                          s.code,
                          s.employee_manager,
                          s.location,
                          s.name,
                          s.size,
                          s.supervisor
                      }).FirstOrDefault();



            return Ok(sh);
        }


        [HttpPost]
        [Route("save")]
        public IHttpActionResult saveSchool([FromBody]schools school)
        {
            try
            {
                schools record = (from s in fmp.schools
                                  where s.code == school.code
                                  select s).FirstOrDefault<schools>();

                if (record != null)
                {
                    objMapper.Map<schools>(ref record, school);
                }
                else
                {
                    schools new_record = new schools();
                    objMapper.Map<schools>(ref new_record, school);
                    fmp.schools.Add(new_record);
                }
                fmp.SaveChanges();
                return Ok(1);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

        }
    }
}

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
                     select s;

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

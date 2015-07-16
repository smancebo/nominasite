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
    [RoutePrefix("api/titles")]
    public class TitleController : ApiController
    {

        fmpEntities fmp = new fmpEntities();

        [HttpGet]
        [Route("get")]
        public IHttpActionResult getAll()
        {
            var t = fmp.titles.ToList<titles>().Select(title => new
            {
                title.id,
                title.description,
                payrate = Convert.ToDecimal(title.payrate).ToString("N2"),
                nigthdiff = Convert.ToDecimal(title.nigthdiff).ToString("N2"),
            });

            return Ok(t);
        }

        [HttpGet]
        [Route("get-by-employee/{employee_code}")]
        public IHttpActionResult getEmployeeTitle(string employee_code)
        {
            var title = (from t in fmp.titles
                            from e in fmp.staff
                            where e.title == t.id &&
                            e.employee_code == employee_code
                            select new
                            {
                                t.id,
                                t.payrate,
                                t.description,
                                t.nigthdiff
                            }).FirstOrDefault();

            return Ok(title);

        }

        [HttpGet]
        [Route("get/{titleId}")]
        public IHttpActionResult get(int titleId)
        {
            var t = (from title in fmp.titles
                        where title.id == titleId
                        select new {
                            title.id,
                            title.description,
                            title.payrate,
                            title.nigthdiff
                        }).FirstOrDefault();
            return Ok(t);
        }

        [Route("save")]
        [HttpPost]
        public IHttpActionResult save([FromBody]titles title)
        {
            try
            {
               
                titles record = (from e in fmp.titles
                                where e.id == title.id
                                select e).SingleOrDefault<titles>();

                if (record != null)
                {
                    objMapper.Map<titles>(ref record, title);
                    //fmp.staff.Add(record);
                }
                else
                {

                    fmp.titles.Add(title);
                }
                fmp.SaveChanges();

                return Ok("1");
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }
       
    }
}

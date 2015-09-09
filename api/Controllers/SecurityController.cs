using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using api.Models;

namespace api.Controllers
{

    [RoutePrefix("api/security")]
    public class SecurityController : ApiController
    {

        fmpEntities fmp = new fmpEntities();

        [HttpGet]
        [Route("loadUserGroup")]
        public IHttpActionResult loadUserGroup()
        {

            var queryString = ActionContext.Request.GetQueryNameValuePairs().ToDictionary(x => x.Key, x => x.Value);

            //var found = from 

            return Ok();
        }

        [HttpGet]
        [Route("getAllScreens")]
        public IHttpActionResult getAllScreens()
        {
            try
            {
                var screens = from s in fmp.security_screens
                              where (s.parent == null || s.parent == "")
                              orderby s.id ascending
                              select new
                              {
                                  s.text,
                                  s.url,
                                  s.icon,
                                  s.screen_code,
                                  s.parent,
                                  subItems = (from sub in fmp.security_screens
                                              where sub.parent == s.screen_code
                                              select new
                                              {
                                                  sub.text,
                                                  sub.url,
                                                  sub.icon,
                                                  sub.parent,
                                                  sub.screen_code
                                              })
                              };

                return Ok(screens);
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

    }
}

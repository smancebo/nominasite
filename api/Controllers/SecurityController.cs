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
        [Route("getScreensUserGroup/{id}")]
        public IHttpActionResult getScreensUserGroup(string id)
        {
            var permits = from s in fmp.security_screens
                          join sp in fmp.security_permits
                          on s.screen_code equals sp.screen_code
                          where sp.username == id || sp.@group == id
                          select new {
                                  s.text,
                                  s.url,
                                  s.icon,
                                  s.screen_code,
                                  s.parent,
                                  chkParent = true
                          };

               
           
            return Ok(permits);
        }

        [HttpGet]
        [Route("getScreensUserGroupAble/{id}")]
        public IHttpActionResult getScreensUserGroupAble(string id)
        {
            var screens = from s in fmp.security_screens
                          join sp in fmp.security_permits
                          on s.screen_code equals sp.screen_code into spr
                          from x in spr.DefaultIfEmpty()
                          where (x.username == id || x.username == null) &&
                          (s.parent == null || s.parent == "")
                         
                          orderby s.id ascending
                          select new
                           {
                               s.text,
                               s.url,
                               s.icon,
                               s.screen_code,
                               s.parent,
                               chkParent = x.username == null ? false : true,//((s.screen_code == x.screen_code) == null ? false : (s.screen_code == x.screen_code)),
                               subItems = (from sub in fmp.security_screens
                                           join subsp in fmp.security_permits
                                           on sub.screen_code equals subsp.screen_code into subspr
                                           from subx in subspr.DefaultIfEmpty()
                                           where sub.parent == s.screen_code &&
                                           (subx.username == id || subx.username == null)
                                           select new
                                           {
                                               sub.text,
                                               sub.url,
                                               sub.icon,
                                               sub.parent,
                                               sub.screen_code,
                                               chkParent = subx.username == null ? false : true//((sub.screen_code == subx.screen_code) == null ? false : (sub.screen_code == subx.screen_code))
                                           })
                           };

            return Ok(screens);
        }

        [HttpGet]
        [Route("loadUserGroup")]
        public IHttpActionResult loadUserGroup()
        {

            var queryString = ActionContext.Request.GetQueryNameValuePairs().ToDictionary(x => x.Key, x => x.Value);
            string name = queryString["name"];

            var results = (from u in fmp.users
                           where u.username.Contains(name)
                           select new
                           {
                               text = u.username,
                               type = "user",
                               icon = "fa fa-user",
                               id = u.username
                           })
                           .Union(
                           from g in fmp.security_groups
                           where g.description.Contains(name)
                           select new
                           {
                               text = g.description,
                               type = "group",
                               icon = "fa fa-users",
                               id = g.group_code
                           });

            return Ok(results);
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
                                  chkParent = false,
                                  subItems = (from sub in fmp.security_screens
                                              where sub.parent == s.screen_code
                                              select new
                                              {
                                                  sub.text,
                                                  sub.url,
                                                  sub.icon,
                                                  sub.parent,
                                                  sub.screen_code,
                                                  chkParent = false
                                              })
                              };

                return Ok(screens);
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("save")]
        public IHttpActionResult save([FromBody]dynamic permits)
        {
            try
            {
                string id = permits.id.ToString();
                string type = permits.type.ToString();

                deleteAllPermits(id);

                foreach (dynamic item in permits.screens)
                {
                    security_permits sp = new security_permits();
                    sp.screen_code = item.screen_code;
                    if (type == "group")
                    {
                        sp.group = id;
                    }
                    else
                    {
                        sp.username = id;
                    }

                    fmp.security_permits.Add(sp);
                }

                fmp.SaveChanges();
                return Ok(1);
            }
            catch (Exception)
            {
                return InternalServerError();   
            }
        }

        public void deleteAllPermits(string id)
        {
            var permits = fmp.security_permits.Where(x => x.group == id || x.username == id).Select(x => x);
            foreach (security_permits item in permits)
            {
                fmp.security_permits.Remove(item);
            }


        }


    }
}

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
        [Route("getAllScreensView")]
        public IHttpActionResult getAllScreensView()
        {

            var screens = from s in fmp.security_screens
                          select new
                          {
                              s.id,
                              s.parent,
                              s.screen_code,
                              s.text,
                              s.url,
                              s.icon
                          };

            return Ok(screens);
        }

        [HttpGet]
        [Route("getScreen/{id}")]
        public IHttpActionResult getScreen(int id)
        {

            var screens = from s in fmp.security_screens
                          where s.id == id
                          select new
                          {
                              s.id,
                              s.parent,
                              s.screen_code,
                              s.text,
                              s.url,
                              s.icon
                          };

            return Ok(screens.FirstOrDefault());
        }

        [HttpPost]
        [Route("saveScreen")]
        public IHttpActionResult saveScreen([FromBody] security_screens screen)
        {

            try
            {
                var record = (from s in fmp.security_screens
                              where s.id == screen.id
                              select s).FirstOrDefault();

                if (record != null)
                {
                    utilities.objMapper.Map<security_screens>(ref record, screen);
                }
                else
                {
                    record = new security_screens();
                    fmp.security_screens.Add(screen);
                }
                
                fmp.SaveChanges();

                return Ok(1);
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("deleteScreen")]
        public IHttpActionResult deleteScreen([FromBody] int id)
        {

            try
            {
                var record = (from s in fmp.security_screens
                              where s.id == id
                              select s).FirstOrDefault();

                fmp.security_screens.Remove(record);
                

                fmp.SaveChanges();

                return Ok(1);
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("getScreensUserGroupAble/{id}")]
        public IHttpActionResult getScreensUserGroupAble(string id)
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
                               chkParent = fmp.security_permits.Where(x => (x.username == id || x.@group == id) && x.screen_code == s.screen_code).Select(x => x).Count() > 0 ? true : false,
                               subItems = (from sub in fmp.security_screens
                                           where sub.parent == s.screen_code
                                           select new
                                           {
                                               sub.text,
                                               sub.url,
                                               sub.icon,
                                               sub.parent,
                                               sub.screen_code,
                                               chkParent = fmp.security_permits.Where(x => (x.username == id || x.@group == id) && x.screen_code == sub.screen_code).Select(x => x).Count() > 0 ? true : false
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

        [HttpGet]
        [Route("getGroups")]
        public IHttpActionResult getGroups()
        {
            var groups = from g in fmp.security_groups
                         select new
                         {
                             g.id,
                             g.group_code,
                             g.description,
                             users = from u in fmp.users
                                     join ug in fmp.security_groups_users
                                     on u.username equals ug.username
                                     select new
                                     {
                                         u.id,
                                         u.username,
                                         school = new
                                         {
                                             u.schools.name,
                                             u.schools.id,
                                             u.schools.code,
                                             u.schools.location
                                         }
                                     }
                         };

            return Ok(groups);
        }

        [HttpGet]
        [Route("getGroup/{id}")]
        public IHttpActionResult getGroup(int id)
        {
            var group = from g in fmp.security_groups
                        where g.id == id
                        select new
                        {
                            g.id,
                            g.group_code,
                            g.description,
                            users = from u in fmp.users
                                    join ug in fmp.security_groups_users on u.username equals ug.username
                                    join grp in fmp.security_groups on ug.group_code equals grp.group_code
                                    where grp.id == id
                                    
                                    select new
                                    {
                                        u.id,
                                        u.username,
                                        school = new
                                        {
                                            u.schools.name,
                                            u.schools.id,
                                            u.schools.code,
                                            u.schools.location
                                        }
                                    }
                        };

            return Ok(group.FirstOrDefault());
        }

        [HttpPost]
        [Route("saveGroup")]
        public IHttpActionResult saveGroup([FromBody] security_groups group)
        {

            try
            {
                var record = (from g in fmp.security_groups
                              where g.id == @group.id
                              select g).FirstOrDefault();

                if (record != null)
                {
                    utilities.objMapper.Map<security_groups>(ref record, group);
                    deleteAllUsersInGroup(record);
                }
                else
                {
                    fmp.security_groups.Add(group);
                }

                fmp.SaveChanges();

                return Ok(1);
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("deleteGroup")]
        public IHttpActionResult deleteGroup([FromBody] int id)
        {
            try
            {
                var record = (from g in fmp.security_groups
                              where g.id == id
                              select g).FirstOrDefault();

                fmp.security_groups.Remove(record);
                fmp.SaveChanges();
                return Ok(1);

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        public void deleteAllUsersInGroup(security_groups group)
        {
            var users = fmp.security_groups_users.Where(x=> x.group_code == @group.group_code).Select(x=>x);
            foreach (var item in users)
            {
                fmp.security_groups_users.Remove(item);
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

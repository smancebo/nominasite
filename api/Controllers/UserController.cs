using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using api.Models;
using System.Security.Cryptography;
using System.Text;
using utilities;
using System.Collections;


namespace api.Controllers
{

    [RoutePrefix("api/users")]
    public class UserController : ApiController
    {

         fmpEntities fmp = new fmpEntities();

        [HttpGet]
        [Route("get")]
        public IHttpActionResult getAllUsers()
        {
            var users = from u in fmp.users
                        select new
                        {
                            u.id,
                            u.username,
                            school = new { 
                                u.schools.name,
                                u.schools.id,
                                u.schools.code,
                                u.schools.location
                            },
                        };

            return Ok(users);
        }

        [HttpGet]
        [Route("get/{Id}")]
        public IHttpActionResult getUser(int Id)
        {
            var users = (from u in fmp.users
                     where u.id == Id
                      select new
                      {
                          u.id,
                          u.username,
                          password = "passwordNotChanged",
                          u.school_code,
                          school = new
                          {
                              u.schools.name,
                              u.schools.id,
                              u.schools.code,
                              u.schools.location
                          },
                      }).FirstOrDefault();

            return Ok(users);
        }

        [HttpGet]
        [Route("getUser/{username}")]
        public IHttpActionResult getUser(string username)
        {
            var users = (from u in fmp.users
                         where u.username == username
                         select new
                         {
                             u.id,
                             u.username,
                             password = "passwordNotChanged",
                             u.school_code,
                             school = new
                             {
                                 u.schools.name,
                                 u.schools.id,
                                 u.schools.code,
                                 u.schools.location
                             },
                         }).FirstOrDefault();

            return Ok(users);
        }

        [HttpGet]
        [Route("loadUsers")]
        public IHttpActionResult loadUsers()
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
                           });
            return Ok(results);
        }

        [HttpPost]
        [Route("delete")]
        public IHttpActionResult delete([FromBody]int Id)
        {
            var users = (from u in fmp.users
                         where u.id == Id
                         select u).FirstOrDefault();
            try
            {

                fmp.users.Remove(users);
                fmp.SaveChanges();
                return Ok(1);
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }


        [HttpPost]
        [Route("save")]
        public IHttpActionResult save([FromBody]users user)
        {
            try
            {
                users record = (from s in fmp.users
                                where s.id == user.id
                                select s).FirstOrDefault<users>();
                

                if (record != null)
                {
                    if (user.password != "passwordNotChanged")
                    {
                        user.password = utilities.Security.createPassword(user.password);
                        objMapper.Map<users>(ref record, user);
                    }
                    else
                    {
                        record.school_code = user.school_code;
                    }
                }
                else
                {
                    users new_record = new users();
                    user.password = utilities.Security.createPassword(user.password);
                    objMapper.Map<users>(ref new_record, user);
                    fmp.users.Add(new_record);
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
         [Route("login")]
         public IHttpActionResult login(dynamic credentials)
         {

             string username = credentials.username;
             string password = utilities.Security.createPassword((string)credentials.password);

             string usrpass = (from u in fmp.users
                               where u.username == username
                               select u.password).FirstOrDefault();

             string token = "";
             if(usrpass == password)
             {
                 var user = (from u in fmp.users
                             where u.username == username
                             select u).FirstOrDefault<users>();
                 token = utilities.Security.createToken(username, password);
                 
                 var groups = from gu in fmp.security_groups_users
                              where gu.username == username
                              select gu.group_code;

                 var comparer = new LambdaEqualityComparer<dynamic>(
                     (x, y) => x.text == y.text && x.url == y.url, x => x.url.GetHashCode() ^ x.text.GetHashCode());
                 try
                 {
                     return Ok(new
                     {
                         username = username,
                         token = token,
                         school = new
                         {
                             user.schools.name,
                             user.schools.code,
                             user.schools.id,
                             user.schools.location
                         },
                         screens = (from s in fmp.security_screens
                                   join sp in fmp.security_permits on s.screen_code equals sp.screen_code
                                   where (sp.username == username || (groups.Contains(sp.@group))) &&
                                   (s.parent == null || s.parent == "")
                                   orderby s.id ascending
                                   select new
                                   {
                                       s.text,
                                       s.url,
                                       s.icon,
                                       subItems = (from sub in fmp.security_screens
                                                   join subsp in fmp.security_permits
                                                   on sub.screen_code equals subsp.screen_code
                                                   where (subsp.username == username || (groups.Contains(sp.@group))) &&
                                                   sub.parent == s.screen_code
                                                   select new
                                                   {
                                                       sub.text,
                                                       sub.url,
                                                       sub.icon
                                                   }).Distinct()
                                   })

                     });
                 }
                 catch (Exception ex)
                 {
                     
                     return InternalServerError(ex);
                 }
                
             }
             else
             {
                 return StatusCode(HttpStatusCode.NoContent);
             }
         }
    }

    class StuffComparer<T> : IEqualityComparer<T>
    {
        public StuffComparer(Func<T, T, bool> equals, Func<T, int> getHashCode)
        {
            this.equals = equals;
            this.getHashCode = getHashCode;
        }

        readonly Func<T, T, bool> equals;
        public bool Equals(T x, T y)
        {
            return equals(x, y);
        }

        readonly Func<T, int> getHashCode;
        public int GetHashCode(T obj)
        {
            return getHashCode(obj);
        }
    }

    public class LambdaEqualityComparer<T> : IEqualityComparer<T>
    {
        Func<T, T, bool> _equalsFunction;
        Func<T, int> _hashCodeFunction;

        public LambdaEqualityComparer(
            Func<T, T, bool> equalsFunction, Func<T, int> hashCodeFunction)
        {
            if (equalsFunction == null) throw new ArgumentNullException();
            if (hashCodeFunction == null) throw new ArgumentNullException();

            _equalsFunction = equalsFunction;
            _hashCodeFunction = hashCodeFunction;
        }

        public bool Equals(T x, T y)
        {
            return _equalsFunction(x, y);
        }

        public int GetHashCode(T obj)
        {
            return _hashCodeFunction(obj);
        }
    }
}

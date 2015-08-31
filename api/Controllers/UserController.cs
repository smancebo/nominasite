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
                 token = utilities.Security.createToken(username, password);
                 return Ok(new { username = username, token = token });
             }
             else
             {
                 return StatusCode(HttpStatusCode.NoContent);
             }


         }





        
      
    }
}

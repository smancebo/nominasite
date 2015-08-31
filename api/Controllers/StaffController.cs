using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

//using api.Models;
using Newtonsoft.Json;
using utilities;
using api.Models;

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
                        select new
                        {
                            emp.name,
                            emp.last_name,
                            emp.phones,
                            emp.address,
                            emp.birthday,
                            emp.email,
                            emp.employee_code,
                            emp.hire_date,
                            title = new {emp.titles.id, emp.titles.payrate, emp.titles.description, emp.titles.nigthdiff},
                            emp.id,
                            emp.middle_name,
                            emp.sex,
                            emp.status,
                            emp.supervisor_code
                        };

            

            return Ok(staff);
        }

        [HttpGet]
        [Route("getBySchool")]
        public IHttpActionResult getBySchool()
        {
            string username = Request.Headers.GetValues("logusr").FirstOrDefault();

            var user = (from u in fmp.users
                       where u.username == username
                       select u).FirstOrDefault();

           

            var staff = from emp in fmp.staff
                        from sbs in fmp.staff_by_schools
                        where sbs.employee_code == emp.employee_code &&
                              sbs.school_code == user.school_code
                        select new
                        {
                            emp.name,
                            emp.last_name,
                            emp.phones,
                            emp.address,
                            emp.birthday,
                            emp.email,
                            emp.employee_code,
                            emp.hire_date,
                            title = new { emp.titles.id, emp.titles.payrate, emp.titles.description, emp.titles.nigthdiff },
                            emp.id,
                            emp.middle_name,
                            emp.sex,
                            emp.status,
                            emp.supervisor_code
                        };



            return Ok(staff);
        }

        [HttpGet]
        [Route("supervisors")]
        public IHttpActionResult getSupervisors()
        {
            var staff = from emp in fmp.staff
                        where emp.supervisor_code != null
                        select new
                        {
                            emp.name,
                            emp.last_name,
                            emp.phones,
                            emp.address,
                            emp.birthday,
                            emp.email,
                            emp.employee_code,
                            emp.hire_date,
                            emp.title,
                            emp.id,
                            emp.middle_name,
                            emp.sex,
                            emp.status,
                            emp.supervisor_code
                        };

            

            return Ok(staff);
        }

        

        [HttpGet]
        [Route("get/{employee_code}")]
        public IHttpActionResult get(int employee_code)
        {
            var staff = (from emp in fmp.staff
                        where emp.id == employee_code
                         select new
                         {
                             emp.name,
                             emp.last_name,
                             emp.phones,
                             emp.address,
                             emp.birthday,
                             emp.email,
                             emp.employee_code,
                             emp.hire_date,
                             emp.title,
                             emp.id,
                             emp.middle_name,
                             emp.sex,
                             emp.status,
                             emp.supervisor_code
                         }).FirstOrDefault();



            return Ok(staff);
        }

        [HttpPost]
        [Route("delete")]
        public IHttpActionResult delete([FromBody]int employee_code)
        {
            var staff = (from e in fmp.staff
                         where e.id == employee_code
                         select e).FirstOrDefault();
            try
            {

                fmp.staff.Remove(staff);
                fmp.SaveChanges();
                return Ok(1);
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }

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

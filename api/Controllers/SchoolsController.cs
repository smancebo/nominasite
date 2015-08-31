
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
                          s.supervisor,
                          s.budget,
                          employees = from e in fmp.staff
                                      from sbs in fmp.staff_by_schools
                                      where sbs.employee_code == e.employee_code &&
                                      sbs.school_code == s.code
                                      select new
                                      {
                                          e.employee_code,
                                          e.name,
                                          e.middle_name,
                                          e.last_name
                                      }

                      }).FirstOrDefault();



            return Ok(sh);
        }

        [HttpPost]
        [Route("delete")]
        public IHttpActionResult delete([FromBody]int schoolId)
        {

            var sh = (from s in fmp.schools
                      where s.id == schoolId
                      select s).FirstOrDefault();
            try
            {

                deleteStaffBySchool(sh);
                fmp.schools.Remove(sh);
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
        public IHttpActionResult saveSchool([FromBody]dynamic school)
        {
            try
            {
                bool updating = false;
                string school_code = school.code;
                schools record = (from s in fmp.schools
                                  where s.code == school_code
                                  select s).FirstOrDefault<schools>();

                if (record == null)
                {
                    record = new schools();
                }
                else
                {
                    deleteStaffBySchool(record);
                    updating = true;
                }

                record.code = school.code;
                record.location = school.location;
                record.size = school.size;
                record.employee_manager = school.employee_manager;
                record.supervisor = school.supervisor;
                record.name = school.name;
                record.budget = school.budget;

                parseStaffSchool(ref record, school.employees);

                if (!updating) { fmp.schools.Add(record); }
                fmp.SaveChanges();
                return Ok(1);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

        }

        public void deleteStaffBySchool(schools record)
        {
            var staff = (from e in record.staff_by_schools
                         where e.school_code == record.code
                         select e).ToList<staff_by_schools>();

            foreach (staff_by_schools item in staff)
            {
                fmp.staff_by_schools.Remove(item);
            }
        }
        public void parseStaffSchool(ref schools school, dynamic employees)
        {
            foreach (dynamic item in employees)
            {
                staff_by_schools sbs = new staff_by_schools();
                sbs.school_code = school.code;
                sbs.employee_code = item.employee_code;
                school.staff_by_schools.Add(sbs);
            }
        }
    }
}

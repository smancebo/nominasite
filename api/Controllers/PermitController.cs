using api.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace api.Controllers
{
    [RoutePrefix("api/permit")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PermitController : ApiController
    {
        fmpEntities fmp = new fmpEntities();

        [HttpGet]
        [Route("get")]
        public IHttpActionResult getAllPermits()
        {
            var queryPermit = from datos in fmp.contract_permits.AsEnumerable()
                              select new
                              {
                                  datos.id,
                                  datos.organization_name,
                                  datos.telephone,
                                  datos.mailing_address,
                                  datos.authorized_organization_name,
                                  permit_start_date = datos.permit_start_date != null ? Convert.ToDateTime(datos.permit_start_date.Value).ToString("MM/dd/yyyy") : "",
                                  permit_end_date = datos.permit_end_date != null ? Convert.ToDateTime(datos.permit_end_date.Value).ToString("MM/dd/yyyy") : "",
                                  datos.number_registered,
                                  total_hours = fmp.contract_permit_periods
                                  .Where(s => s.number_registered == datos.number_registered)
                                  .Select(s => s).Count() > 0 ? fmp.contract_permit_periods.Where(s => s.number_registered == datos.number_registered)
                                  .Sum(s => s.hours).Value : 0,
                                  total_hours_worked = (from pp in fmp.contract_permit_periods
                                                        join wh in fmp.contract_permit_periods_hours_worked on pp.guid equals wh.contract_permit_periods_guid
                                                        where datos.number_registered == pp.number_registered
                                                        select new
                                                        {
                                                            wh.total_hours_worked

                                                        }).Sum(s => s.total_hours_worked)
                              };

            return Ok(queryPermit);
        }

        [HttpGet]
        [Route("get/{id}")]
        public IHttpActionResult getById(int id)
        {
            var queryPermit = from c in fmp.contract_permits.AsEnumerable()
                              where c.id == id
                              select new
                              {
                                  c.id,
                                  c.organization_name,
                                  c.telephone,
                                  c.mailing_address,
                                  c.authorized_organization_name,
                                  permit_start_date = Convert.ToDateTime(c.permit_start_date.Value).ToString("MM/dd/yyyy"),
                                  permit_end_date = Convert.ToDateTime(c.permit_end_date.Value).ToString("MM/dd/yyyy"),
                                  c.number_registered,
                                  c = from p in fmp.contract_permit_periods.AsEnumerable()
                                      where p.number_registered.Equals(c.number_registered)
                                      select new
                                      {
                                          p.id,
                                          p.guid,
                                          p.number_registered,
                                          p.week_days,
                                          start_date = Convert.ToDateTime(p.start_date.Value).ToString("MM/dd/yyyy"),
                                          end_date = Convert.ToDateTime(p.end_date.Value).ToString("MM/dd/yyyy"),
                                          p.start_time,
                                          p.end_time,
                                          p.hours,
                                          hw = from hw in fmp.contract_permit_periods_hours_worked.AsEnumerable()
                                               where hw.contract_permit_periods_guid == p.guid
                                               select new
                                               {
                                                   hw.ID,
                                                   hw.contract_permit_periods_guid,
                                                   hw.start_date,
                                                   hw.end_date,
                                                   hw.total_hours_worked
                                               }
                                      }

                              };

            return Ok(queryPermit);
        }

        [HttpGet]
        [Route("getByNumberRegistered/{id}")]
        public IHttpActionResult getByNumberRegistered(string id)
        {
            var queryPermit = from c in fmp.contract_permits.AsEnumerable()
                              where c.number_registered == id
                              select new
                              {
                                  c.id,
                                  c.organization_name,
                                  c.telephone,
                                  c.mailing_address,
                                  c.authorized_organization_name,
                                  permit_start_date = Convert.ToDateTime(c.permit_start_date.Value).ToString("MM/dd/yyyy"),
                                  permit_end_date = Convert.ToDateTime(c.permit_end_date.Value).ToString("MM/dd/yyyy"),
                                  c.number_registered,
                                  pp = from p in fmp.contract_permit_periods.AsEnumerable()
                                       where p.number_registered.Equals(c.number_registered)
                                       select new
                                       {
                                           p.id,
                                           p.guid,
                                           p.number_registered,
                                           p.week_days,
                                           start_date = Convert.ToDateTime(p.start_date.Value).ToString("MM/dd/yyyy"),
                                           end_date = Convert.ToDateTime(p.end_date.Value).ToString("MM/dd/yyyy"),
                                           p.start_time,
                                           p.end_time,
                                           p.hours,
                                           hw = (from hw in fmp.contract_permit_periods_hours_worked.AsEnumerable()
                                                 where hw.contract_permit_periods_guid == p.guid
                                                 select new
                                                 {
                                                     hw.ID,
                                                     hw.contract_permit_periods_guid,
                                                     start_date = hw.start_date != null ? Convert.ToDateTime(hw.start_date.Value).ToString("MM/dd/yyyy") : "",
                                                     end_date = hw.end_date != null ? Convert.ToDateTime(hw.end_date.Value).ToString("MM/dd/yyyy") : "",
                                                     hw.total_hours_worked

                                                 }).FirstOrDefault()
                                       }
                              };

            return Ok(queryPermit);
        }

        [HttpGet]
        [Route("getPeriodsById/{id}")]
        public IHttpActionResult getPeriodsById(string id)
        {
            var queryPermit = from datos in fmp.contract_permit_periods
                              where datos.number_registered == id
                              select datos;

            return Ok(queryPermit);
        }



        [HttpPost]
        [Route("savePermit")]
        public IHttpActionResult savePermit([FromBody]contract_permits contract_permit)
        {
            try
            {
                //verify if the permit exist
                var query = from datos in fmp.contract_permits
                            where datos.number_registered.Equals(contract_permit.number_registered)
                            select datos;

                if (query.Count() > 0)
                {
                    return Ok("EXIST");
                }
                else
                {
                    fmp.contract_permits.Add(contract_permit);
                    fmp.SaveChanges();
                    return Ok(contract_permit.id);
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("savePermitPeriods/{number_registered}")]
        public IHttpActionResult savePermitPeriods(string number_registered, [FromBody] List<contract_permit_periods> permit_periods)
        {
            if (!string.IsNullOrEmpty(number_registered))
            {
                var queryPermit = (from datos in fmp.contract_permit_periods
                                   where datos.number_registered == number_registered
                                   select datos).ToList();

                //If Permit Periods is empty, delete all.
                if (permit_periods.Count == 0)
                {
                    //Delete All
                    foreach (contract_permit_periods p in queryPermit)
                    {
                        //Search Hours Worked Rows
                        var queryHoursWorked = from datos in fmp.contract_permit_periods_hours_worked
                                               where datos.contract_permit_periods_guid == p.guid
                                               select datos;

                        if (queryHoursWorked.Count() > 0)
                        {
                            //Remove Contract Permit Periods Hours Worked
                            fmp.contract_permit_periods_hours_worked.Remove(queryHoursWorked.FirstOrDefault());
                        }

                        //Remove Contract Permit Periods
                        fmp.contract_permit_periods.Remove(p);
                    }

                    fmp.SaveChanges();
                    return Ok(1);
                }

                //If query is greater than array then remove different row.
                if (queryPermit.Count > permit_periods.Count)
                {
                    foreach (contract_permit_periods pp1 in queryPermit)
                    {
                        var queryResult = from datos in permit_periods
                                          where datos.guid == pp1.guid
                                          select datos;

                        if (queryResult.Count() == 0)
                        {
                            //Search Hours Worked Rows
                            var queryHoursWorked = from datos in fmp.contract_permit_periods_hours_worked
                                                   where datos.contract_permit_periods_guid == pp1.guid
                                                   select datos;

                            if (queryHoursWorked.Count() > 0)
                            {
                                //Remove Contract Permit Periods Hours Worked
                                fmp.contract_permit_periods_hours_worked.Remove(queryHoursWorked.FirstOrDefault());
                            }

                            //Delete
                            fmp.contract_permit_periods.Remove(pp1);
                        }
                    }
                    fmp.SaveChanges();
                    return Ok(1);
                }

                //if array is greater than query then add the different row.
                if (permit_periods.Count > queryPermit.Count)
                {
                    foreach (contract_permit_periods pp1 in permit_periods)
                    {
                        var queryResult = from datos in fmp.contract_permit_periods
                                          where datos.guid == pp1.guid
                                          select datos;

                        if (queryResult.Count() == 0)
                        {
                            //Add
                            fmp.contract_permit_periods.Add(pp1);
                        }
                    }
                    fmp.SaveChanges();
                    return Ok(1);
                }

                //if query is equal than array, update all.
                if (queryPermit.Count == permit_periods.Count)
                {
                    foreach (contract_permit_periods pp1 in queryPermit)
                    {
                        foreach (contract_permit_periods pp2 in permit_periods)
                        {
                            if (pp1.guid == pp2.guid)
                            {
                                //row found, update pp1 with pp2 values
                                pp1.week_days = pp2.week_days;
                                pp1.hours = pp2.hours;
                                pp1.start_date = pp2.start_date;
                                pp1.end_date = pp2.end_date;
                                pp1.start_time = pp2.start_time;
                                pp1.end_time = pp2.end_time;
                            }
                        }
                    }
                    fmp.SaveChanges();
                    return Ok(1);
                }

                //if query is empty add all
                if (queryPermit.Count == 0)
                {
                    foreach (contract_permit_periods item in permit_periods)
                    {
                        fmp.contract_permit_periods.Add(item);
                    }
                    fmp.SaveChanges();
                    return Ok(1);
                }
            }

            return Ok();
        }


        [HttpPost]
        [Route("updatePermitPeriodsHoursWorked/{guid}")]
        public IHttpActionResult updatePermitPeriodsHoursWorked(string guid, [FromBody] contract_permit_periods_hours_worked contract_permit_periods_hours_worked)
        {
            var queryHoursWorked = from datos in fmp.contract_permit_periods_hours_worked
                                   where datos.contract_permit_periods_guid == guid
                                   select datos;

            if (contract_permit_periods_hours_worked != null)
            {
                if (queryHoursWorked.Count() > 0) //Si el registro existe, actualizar
                {
                    queryHoursWorked.FirstOrDefault().start_date = contract_permit_periods_hours_worked.start_date;
                    queryHoursWorked.FirstOrDefault().end_date = contract_permit_periods_hours_worked.end_date;
                    queryHoursWorked.FirstOrDefault().total_hours_worked = contract_permit_periods_hours_worked.total_hours_worked;
                    fmp.SaveChanges();
                    return Ok(1);
                }
                else //De lo contrario, agregar
                {
                    contract_permit_periods_hours_worked ent = new contract_permit_periods_hours_worked();
                    ent.contract_permit_periods_guid = guid;
                    ent.start_date = contract_permit_periods_hours_worked.start_date;
                    ent.end_date = contract_permit_periods_hours_worked.end_date;
                    ent.total_hours_worked = contract_permit_periods_hours_worked.total_hours_worked;
                    fmp.contract_permit_periods_hours_worked.Add(ent);
                    fmp.SaveChanges();
                    return Ok(1);
                }
            }

            return Ok();
        }

        [HttpPost]
        [Route("updatePermit/{number_registered}")]
        public IHttpActionResult updatePermit(string number_registered, [FromBody] contract_permits contract_permit)
        {
            if (!string.IsNullOrEmpty(number_registered))
            {
                var queryPermit = from datos in fmp.contract_permits
                                  where datos.number_registered.Equals(number_registered)
                                  select datos;

                if (queryPermit.Count() > 0)
                {
                    queryPermit.FirstOrDefault().organization_name = contract_permit.organization_name;
                    queryPermit.FirstOrDefault().telephone = contract_permit.telephone;
                    queryPermit.FirstOrDefault().mailing_address = contract_permit.mailing_address;
                    queryPermit.FirstOrDefault().authorized_organization_name = contract_permit.authorized_organization_name;
                    queryPermit.FirstOrDefault().permit_start_date = contract_permit.permit_start_date;
                    queryPermit.FirstOrDefault().permit_end_date = contract_permit.permit_end_date;

                    fmp.SaveChanges();
                    return Ok(1);
                }
            }
            return Ok();
        }


        [HttpPost]
        [Route("contractpermits/delete/{id}")]
        public IHttpActionResult deletePermit(string id)
        {
            try
            {
                var queryPermit = from datos in fmp.contract_permits
                                  where datos.number_registered.Equals(id)
                                  select datos;

                if (queryPermit.Count() > 0)
                {
                    foreach (contract_permits c in queryPermit)
                    {
                        fmp.contract_permits.Remove(c);
                    }
                    fmp.SaveChanges();
                }
                return Ok(1);

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        [HttpPost]
        [Route("permitperiods/delete/{id}")]
        public IHttpActionResult deletePermitPeriods(string id)
        {
            try
            {
                var queryPermitPeriods = (from datos in fmp.contract_permit_periods
                                          where datos.number_registered.Equals(id)
                                          select datos).ToList();

                if (queryPermitPeriods.Count() > 0)
                {
                    foreach (contract_permit_periods p in queryPermitPeriods)
                    {
                        fmp.contract_permit_periods.Remove(p);
                    }
                    fmp.SaveChanges();
                }
                return Ok(1);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

    }
}

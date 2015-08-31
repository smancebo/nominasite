using api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace api.Controllers
{
    [RoutePrefix("api/permit")]
    public class PermitController : ApiController
    {
        fmpEntities fmp = new fmpEntities();

        [HttpGet]
        [Route("get")]
        public IHttpActionResult getAllPermits()
        {
            var queryPermit = from datos in fmp.contract_permits
                              select datos;

            return Ok(queryPermit);
        }

        [HttpGet]
        [Route("get/{id}")]
        public IHttpActionResult getById(int id)
        {
            var queryPermit = from datos in fmp.contract_permits.AsEnumerable()
                              where datos.id==id
                              select datos;

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
                contract_permit.registration_date = DateTime.Now;
                fmp.contract_permits.Add(contract_permit);
                fmp.SaveChanges();

                return Ok(contract_permit.id);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("savePermitPeriods")]
        public IHttpActionResult savePermitPeriods([FromBody] List<contract_permit_periods> permit_periods )
        {
            try
            {
                if (permit_periods.Count > 0)
                {
                    foreach (contract_permit_periods item in permit_periods)
                    {
                        item.registration_date = DateTime.Now;
                        fmp.contract_permit_periods.Add(item);
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

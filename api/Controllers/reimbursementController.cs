using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using utilities;
using api.Models;

namespace api.Controllers
{

    [RoutePrefix("api/reimbursement")]
    public class reimbursementController : ApiController
    {
      
        fmpEntities fmp = new fmpEntities();

        [HttpGet]
        [Route("get")]
        public IHttpActionResult getAllReimbursement()
        {
            var ri = from r in fmp.reimbursement
                     select new
                     {
                         r.id,
                         r.description,
                         r.payrate,
                         r.abbreviation
                     };

            return Ok(ri);
        }

        [HttpGet]
        [Route("get/{Id}")]
        public IHttpActionResult getReimbursement(int Id)
        {
            var ri = (from r in fmp.reimbursement
                     where r.id == Id
                      select new
                      {
                          r.id,
                          r.description,
                          r.payrate,
                          r.abbreviation
                      }).FirstOrDefault();

            return Ok(ri);
        }

        [HttpPost]
        [Route("delete")]
        public IHttpActionResult get([FromBody]int Id)
        {
            var reimbursement = (from r in fmp.reimbursement
                         where r.id == Id
                         select r).FirstOrDefault();
            try
            {

                fmp.reimbursement.Remove(reimbursement);
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
        public IHttpActionResult saveReimbursement([FromBody]reimbursement reimbursement)
        {
            try
            {
                reimbursement record = (from s in fmp.reimbursement
                                  where s.id == reimbursement.id
                                  select s).FirstOrDefault<reimbursement>();

                if (record != null)
                {
                    objMapper.Map<reimbursement>(ref record, reimbursement);
                }
                else
                {
                    reimbursement new_record = new reimbursement();
                    objMapper.Map<reimbursement>(ref new_record, reimbursement);
                    fmp.reimbursement.Add(new_record);
                }
                fmp.SaveChanges();
                return Ok(1);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

        }
    }

    
}

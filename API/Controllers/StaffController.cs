using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace API.Controllers
{
    [RoutePrefix("api/employees")]
    public class StaffController : ApiController
    {

        [HttpGet]
        [Route("get/{id}")]
        public IHttpActionResult prueba(string id)
        {
            return Ok(new { nombre = "prueba" });
        }

    }
}

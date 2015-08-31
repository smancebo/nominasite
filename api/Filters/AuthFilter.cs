using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using api.Models;
using utilities;


namespace api.Filters
{
    public class AuthFilter : IAuthorizationFilter
    {
        public void OnAuthorization(System.Web.Mvc.AuthorizationContext filterContext)
        {
            fmpEntities fmp = new fmpEntities();

            try
            {
                string username = filterContext.RequestContext.HttpContext.Request.Headers.Get("logusr");
                string token = filterContext.RequestContext.HttpContext.Request.Headers.Get("token");

                string password = (from u in fmp.users
                                   where u.username == username
                                   select u.password).FirstOrDefault();

                if (!utilities.Security.isValidToken(username, password, token))
                {
                    filterContext.Result = new HttpUnauthorizedResult();
                }


            }
            catch (Exception e)
            {
                filterContext.Result = new HttpUnauthorizedResult();
            }

            
        }


        
    }
}
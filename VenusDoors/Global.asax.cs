using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Web.Security;

namespace VenusDoors
{
    public class MvcApplication : System.Web.HttpApplication
    {
        public override void Init()
        {
            this.PostAuthenticateRequest +=
                 new EventHandler(MvcApplication_PostAuthenticateRequest);
            base.Init();
        }
        void MvcApplication_PostAuthenticateRequest(object sender, EventArgs e)
        {
            try
            {
                
                HttpCookie authCookie = HttpContext.Current.Request.Cookies["VenusCabinetDoorsCookie"];
                if (authCookie != null)
                {
                    string encTicket = authCookie.Value;
                    if (!String.IsNullOrEmpty(encTicket))
                    {
                        var ticket = FormsAuthentication.Decrypt(encTicket);
                        UserIdentity id = new UserIdentity(ticket);
                        if (ticket.Expired)
                        {
                           // id.IsAuthenticated = false;
                           // Controllers.LoginsController Log = new Controllers.LoginsController();
                          //  Log.LogOut();
                        }
                        else
                        {
                            FormsAuthentication.RenewTicketIfOld(ticket);
                        }
                        //int CodCompania = int.Parse(HttpContext.Current.Session["CodCompania"].ToString());
                        var userRoles = Roles.GetRolesForUser(id.AuthenticationType);
                        var prin = new GenericPrincipal(id, userRoles);
                        HttpContext.Current.User = prin;
                    }
                }
            }
            catch (Exception ex)
            {
                 HttpContext.Current.Request.Cookies.Remove("VenusCabinetDoorsCookie");
                // throw;
            }
          

        }
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}

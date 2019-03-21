using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Web.Security;
using System.IO;

namespace VenusDoors
{
    public class MvcApplication : System.Web.HttpApplication
    {
        public override void Init()
        {
            this.PostAuthenticateRequest +=
                 new EventHandler(MvcApplication_PostAuthenticateRequest);
            this.PostAuthenticateRequest += new EventHandler(Application_Error);
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
        void Application_Error(object sender, EventArgs e)
        {
            Exception exc = Server.GetLastError();
            if (exc != null)
            {
                string oPath = Server.MapPath("~/Content/Log.txt");
                using (StreamWriter mylogs = File.AppendText(oPath))         //se crea el archivo
                {
                    DateTime dateTime = new DateTime();
                    dateTime = DateTime.Now;
                    string strDate = Convert.ToDateTime(dateTime).ToString("yyyy-MM-dd HH:ss");
                    mylogs.WriteLine("---------------------------------------------------------------------------------------------------");
                    mylogs.WriteLine("Error: " + exc.Message);
                    mylogs.WriteLine("Metodo: " + exc.TargetSite.Name);
                    mylogs.WriteLine("Controller: " + exc.TargetSite.DeclaringType.FullName);
                    mylogs.WriteLine("UserName: " + HttpContext.Current.Session["UserName"]);
                    mylogs.WriteLine("UserID: " + HttpContext.Current.Session["UserID"]);
                    mylogs.WriteLine("Date: " + strDate);
                    mylogs.WriteLine("Origen :" +exc.StackTrace);
                    mylogs.Close();
                }
            }
            
          

        }
    }
}

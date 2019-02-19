using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Model;

namespace VenusDoors.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            try
            {
                if (Session["UserID"] != null)
                {
                    if ((int)Session["UserType"] == 1)
                    {
                        return RedirectToAction("Dashboard", "Home");

                    }
                }
                ViewBag.Dashboard = "active";
                BusinessLogic.lnDoors _LN = new BusinessLogic.lnDoors();
                List<Doors> Door = _LN.GetAllDoors();
                ViewBag.ListDoors = Door;
                var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
                ViewBag.ListDoor = serializar.Serialize(Door);

                return View();

            }
            catch (Exception ex)
            {
                return View("Error");
            }
           
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Dashboard()
        {
            try
            {

                BusinessLogic.lnOrder Order = new BusinessLogic.lnOrder();                
                ViewBag.Totales = Order.GetAllTotales();
                return View();
            }
            catch (Exception)
            {
                return View("Error");
            }

        }
    }
}
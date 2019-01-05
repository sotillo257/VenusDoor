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
            ViewBag.Dashboard = "active";
            BusinessLogic.lnDoors _LN = new BusinessLogic.lnDoors();
            List<Doors> Door = _LN.GetAllDoors();
            ViewBag.ListDoors = Door;
            var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
            ViewBag.ListDoor = serializar.Serialize(Door);
            return View();
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
    }
}
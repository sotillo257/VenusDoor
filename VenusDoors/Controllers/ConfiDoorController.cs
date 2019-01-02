using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VenusDoors.Controllers
{
    public class ConfiDoorController : Controller
    {
        // GET: ConfiDoor
        public ActionResult Index()
        {
            ViewBag.ConfiDoor = "active";
            return View();
        }
    }
}
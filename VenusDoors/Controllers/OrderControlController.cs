using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VenusDoors.Controllers
{
    public class OrderControlController : Controller
    {
        // GET: OrderControl
        public ActionResult Index()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.OrderControl = "active";                
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        [HttpPost]
        public ActionResult ModifiyOrder()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.OrderControl = "active";
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VenusDoors.Controllers
{
    public class EstimateController : Controller
    {
        // GET: Estimate
        public ActionResult Index()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.Sales = "active show-sub";
                ViewBag.Estimate = "active";

                return View();
            }
            else
            {

                return RedirectToAction("Index", "Home");
            }
        }
    }
}
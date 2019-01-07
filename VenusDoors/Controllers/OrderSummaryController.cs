using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Model;

namespace VenusDoors.Controllers
{
    public class OrderSummaryController : Controller
    {
        // GET: OrderSummary
        public ActionResult Index()
        {
            ViewBag.OrderSummary = "active";
            return View();
        }

    }
}
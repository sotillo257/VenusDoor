﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

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
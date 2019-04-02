using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VenusDoors.Controllers
{
    public class InvoiceController : Controller
    {
        // GET: Invoice
        [Authorize(Roles = "1, 2")]
        public ActionResult Index()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.Sales = "active show-sub";
                ViewBag.Invoice = "active";
                
                return View();
            }
            else
            {

                return RedirectToAction("Index", "Home");
            }
        }
    }
}
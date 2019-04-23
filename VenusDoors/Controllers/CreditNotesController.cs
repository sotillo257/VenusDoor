using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VenusDoors.Controllers
{
    public class CreditNotesController : Controller
    {
        // GET: CreditNotes
        [Authorize(Roles = "1")]
        public ActionResult Index()
        {
            try
            {
                ViewBag.Sales = "active show-sub";
                ViewBag.CreditNotes = "active";
                return View();
            }
            catch (Exception)
            {
                return View("Error");
            }
        }
    }
}
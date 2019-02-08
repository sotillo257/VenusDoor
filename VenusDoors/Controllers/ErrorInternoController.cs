using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VenusDoors.Controllers
{
    public class ErrorInternoController : Controller
    {
        // GET: ErrorInterno
        public ActionResult Internal_Error()
        {
            return View();
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Model;

namespace VenusDoors.Controllers
{
    public class EstimateController : Controller
    {
        // GET: Estimate
        [Authorize(Roles = "1")]
        public ActionResult Index()
        {
            try
            {
                ViewBag.Sales = "active show-sub";
                ViewBag.Estimate = "active";
                BusinessLogic.lnEstimate _LNEstimate = new BusinessLogic.lnEstimate();
                List<Estimate> est = _LNEstimate.GetEstimate(0, (int)Session["IdCompany"],0,0,0,DateTime.Parse("1999/01/01"), DateTime.Now.AddDays(1)).OrderByDescending(x => x.IdFolio).ToList();
                var serializar1 = new System.Web.Script.Serialization.JavaScriptSerializer();
                ViewBag.Estimate = serializar1.Serialize(est);
                return View();
            }
            catch (Exception)
            {

                throw;
            }
               
           
        }
    }
}
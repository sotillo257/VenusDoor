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
                return View("Error");
            }        
        }

        [Authorize]
        [HttpPost]
        public ActionResult GetHistoryEstimate(int idEstimate)
        {
            try
            {
                BusinessLogic.lnHistoryEstimate _LNHIST = new BusinessLogic.lnHistoryEstimate();
                List<HistoryEstimate> list = _LNHIST.GetHistoryEstimateByIdEstimation(idEstimate);         
                return Json(new { listHistory = list, Success = true, Mensaje = ""}, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(new { Success = false, Mensaje = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        [Authorize]
        [HttpPost]
        public ActionResult InsertComment(string Comment, int IdEstimate)
        {
            try
            {
                BusinessLogic.lnHistoryEstimate _LNHIST = new BusinessLogic.lnHistoryEstimate();
                HistoryEstimate HE = new HistoryEstimate() {
                    Estimation = new Estimate() { Id = IdEstimate },
                    History = Comment ,
                    Type = new Model.Type() { Id = 12 },
                    UserCreador = new Model.User() { Id = (int)Session["UserID"] },
                    CreationDate = DateTime.Now };

                int i = _LNHIST.InsertHistoryEstimate(HE);
                if (i > 0 )
                {
                    List<HistoryEstimate> list = _LNHIST.GetHistoryEstimateByIdEstimation(IdEstimate);
                    return Json(new { listHistory = list, Success = true, Mensaje = "" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { Success = false, Mensaje = "Error inserting the comment" }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { Success = false, Mensaje = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize]
        [HttpPost]
        public ActionResult GetDocAdjuntosEstimate(int idEstimate)
        {
            try
            {
                BusinessLogic.lnDocumentsAdj _LNDAdj = new BusinessLogic.lnDocumentsAdj();
                List<DocumentsAdj> list = _LNDAdj.GetAllDocumentsAdjxIdEstimate(idEstimate);
                return Json(new { listDocAdj = list, Success = true, Mensaje = "" }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(new { Success = false, Mensaje = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
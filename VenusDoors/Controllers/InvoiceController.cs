using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Model;

namespace VenusDoors.Controllers
{
    public class InvoiceController : Controller
    {
        // GET: Invoice
        [Authorize(Roles = "1")]
        public ActionResult Index()
        {          
            try
            {
                ViewBag.Sales = "active show-sub";
                ViewBag.Invoice = "active";
                BusinessLogic.lnInvoice _LNINV = new BusinessLogic.lnInvoice();
                List<Invoice> est = _LNINV.GetInvoice(0, 0, (int)Session["IdCompany"], 0, 0, 0, DateTime.Parse("1999/01/01"), DateTime.Now.AddDays(1)).OrderByDescending(x => x.IdFolio).ToList();
                var serializar1 = new System.Web.Script.Serialization.JavaScriptSerializer();
                ViewBag.Invoice = serializar1.Serialize(est);
                return View();
            }
            catch (Exception)
            {
                return View("Error");
            }
        }

        [Authorize]
        [HttpPost]
        public ActionResult GetHistoryInvoice(int idInvoice)
        {
            try
            {
                BusinessLogic.lnHistoryInvoice _LNHIST = new BusinessLogic.lnHistoryInvoice();
                List<HistoryInvoice> list = _LNHIST.GetHistoryInvoiceByIdInvoice(idInvoice);
                return Json(new { listHistory = list, Success = true, Mensaje = "" }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(new { Success = false, Mensaje = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize]
        [HttpPost]
        public ActionResult InsertComment(string Comment, int IdInvoice)
        {
            try
            {
                BusinessLogic.lnHistoryInvoice _LNHIST = new BusinessLogic.lnHistoryInvoice();
                HistoryInvoice HI = new HistoryInvoice()
                {
                    Invoice = new Invoice() { Id = IdInvoice },
                    History = Comment,
                    Type = new Model.Type() { Id = 12 },
                    UserCreador = new Model.User() { Id = (int)Session["UserID"] },
                    CreationDate = DateTime.Now
                };

                int i = _LNHIST.InsertHistoryInvoice(HI);
                if (i > 0)
                {
                    List<HistoryInvoice> list = _LNHIST.GetHistoryInvoiceByIdInvoice(IdInvoice);
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
        public ActionResult GetDocAdjuntosInvoice(int idInvoice)
        {
            try
            {
                BusinessLogic.lnDocumentsAdjxInvoice _LNDAdj = new BusinessLogic.lnDocumentsAdjxInvoice();
                List<DocumentsAdjxInvoice> list = _LNDAdj.GetDocumentsAdjxInvoice(idInvoice);
                return Json(new { listDocAdj = list, Success = true, Mensaje = "" }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(new { Success = false, Mensaje = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
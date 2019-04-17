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

        [Authorize(Roles = "1, 2")]
        [HttpPost]
        public ActionResult GetDoorsByOrderInvo(int idOrder)
        {
            BusinessLogic.lnDoorsxUser _LN = new BusinessLogic.lnDoorsxUser();
            BusinessLogic.lnDoorxOrder Ord = new BusinessLogic.lnDoorxOrder();
            BusinessLogic.lnOrder _LNO = new BusinessLogic.lnOrder();
            BusinessLogic.lnUser _LNU = new BusinessLogic.lnUser();
            BusinessLogic.lnPerson _LNP = new BusinessLogic.lnPerson();

            DoorsxUser xDoors = _LN.GetAllDoorsxUser().Where(x => x.Order.Id == idOrder).ToList().FirstOrDefault();

            xDoors.DoorsxOrder = Ord.GetAllDoorxOrderByDoorxUser(xDoors.Id);
            if (xDoors.DoorsxOrder.Sum(x => x.Descuento) > 0)
            {
                xDoors.DescuentoActivos = true;
            }
            xDoors.Order = _LNO.GetOrderById(idOrder);
            xDoors.User = _LNU.GetUserById(xDoors.User.Id);
            xDoors.User.Person = _LNP.GetPersonById(xDoors.User.Person.Id);
            return Json(xDoors);
        }
    }
}
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
                ViewBag.Invo = "active";
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

        [Authorize(Roles = "1, 2")]
        [HttpPost]
        public ActionResult GetInvoiceTemp(int idOrder)
        {
            BusinessLogic.lnDoorsxUser _LN = new BusinessLogic.lnDoorsxUser();
            BusinessLogic.lnDoorxOrder Ord = new BusinessLogic.lnDoorxOrder();
            BusinessLogic.lnOrder _LNO = new BusinessLogic.lnOrder();
            BusinessLogic.lnUser _LNU = new BusinessLogic.lnUser();
            BusinessLogic.lnPerson _LNP = new BusinessLogic.lnPerson();

            DoorsxUser xDoors = _LN.GetAllTEMPdxu().Where(x => x.Order.Id == idOrder).ToList().FirstOrDefault();

            xDoors.DoorsxOrder = Ord.GetAllTEMPdxoXdxu(xDoors.Id);
            if (xDoors.DoorsxOrder.Sum(x => x.Descuento) > 0)
            {
                xDoors.DescuentoActivos = true;
            }
            xDoors.Order = _LNO.GetTEMPorderById(idOrder);
            xDoors.User = _LNU.GetUserById(xDoors.User.Id);
            xDoors.User.Person = _LNP.GetPersonById(xDoors.User.Person.Id);
            return Json(xDoors);
        }

        [Authorize(Roles = "1, 2")]
        [HttpPost]
        public ActionResult GetDXOTEMP(int Iddxu)
        {
            
            BusinessLogic.lnDoorxOrder Ord = new BusinessLogic.lnDoorxOrder();                  
            List<DoorxOrder> dxo = Ord.GetAllTEMPdxoXdxu(Iddxu);                        
            return Json(dxo);
        }

        [Authorize(Roles = "1, 2")]
        [HttpPost]
        public ActionResult InsertDoorsxUser(Order Ord)
        {
            try
            {
                if (Session["UserID"] == null)
                {

                    return Json(false, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    BusinessLogic.lnDoorsxUser ln = new BusinessLogic.lnDoorsxUser();
                    BusinessLogic.lnDoorxOrder _LN = new BusinessLogic.lnDoorxOrder();                   

                    DoorsxUser Dxu = ln.GetTEMPdxuById(Ord.DoorxUser.Id);
                    Ord.DoorxUser.TEMP = true;
                    Ord.TEMP = true;                    
                    Order ord = ln.CrearOrder(Ord, (int)Session["UserID"], Ord.DoorxUser.User.Id);                    
                    if (Ord.Id != 0)
                    {
                        ord.DoorxUser.isDrill = Dxu.isDrill;
                        _LN.UpdateDoorsxOrder(ord);
                    }
                    return Json(new { Dxu = ord.DoorxUser.Id, ordd = ord.Id, Success = true, Mensaje = "" }, JsonRequestBehavior.AllowGet);
                }

            }
            catch (Exception ex)
            {
                return View("Error");
            }
        }

        [HttpPost]
        public ActionResult InsertDoorsxOrder(DoorxOrder pDoorsxOrder)
        {
            try
            {
                if (Session["UserID"] == null)
                {

                    return Json(false, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    BusinessLogic.lnDoorxOrder ln = new BusinessLogic.lnDoorxOrder();
                    pDoorsxOrder.TEMP = true;
                    ln.InsertDoorsxOrder(pDoorsxOrder);


                    return Json(true, JsonRequestBehavior.AllowGet);
                }

            }
            catch (Exception ex)
            {
                return Json(new { Error = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult UpdateDoorxOrder(DoorxOrder pDoorsxOrder, int idOrder)
        {
            try
            {
                if (Session["UserID"] == null)
                {

                    return Json(false, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    BusinessLogic.lnDoorxOrder ln = new BusinessLogic.lnDoorxOrder();
                    int uss = pDoorsxOrder.User.Id;
                    pDoorsxOrder.TEMP = true;
                    ln.UpdateDoorxOrder(idOrder, pDoorsxOrder, uss);
                    return Json(true, JsonRequestBehavior.AllowGet);
                }

            }
            catch (Exception ex)
            {
                return Json(new { Error = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize]
        [HttpPost]
        public ActionResult InsertInvoice(DoorsxUser pDoorxUser, Invoice pInvoice)
        {
            try
            {
               
                return Json(new { Success = true, Mensaje = "" }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(new { Success = false, Mensaje = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
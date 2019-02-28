using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Model;

namespace VenusDoors.Controllers
{
    public class OrderControlController : Controller
    {
        BusinessLogic.lnOrder _LNOR = new BusinessLogic.lnOrder();

        // GET: OrderControl
        public ActionResult Index()
        {            
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.OrderControl = "active";

                List<Order> ListOrders = _LNOR.GetAllOrder();
                List<Order> ListaOrdenada = ListOrders.Where(x=> x.Status.Id != 8).OrderByDescending(x => x.Status.Id == 5).ToList();
                ViewBag.Ordenes = ListaOrdenada;
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        [HttpPost]
        public ActionResult ModifiyOrder()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.OrderControl = "active";
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        [HttpPost]
        public ActionResult UpdateOrderStatus(Order modOrder)
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                int userID = (int)Session["UserID"];
                try
                {

                    modOrder.ModificationDate = DateTime.Now;
                    modOrder.ModificationUser = userID;
                    BusinessLogic.lnOrder _LNOR = new BusinessLogic.lnOrder();
                    var modOrderStatus = _LNOR.UpdateOrderStatus(modOrder);
                    return Json(true, JsonRequestBehavior.AllowGet);

                }
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        [HttpPost]
        public ActionResult GetAllOrderControl(Order gOrderControl)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {

                try
                {
                    BusinessLogic.lnOrder _LNOR = new BusinessLogic.lnOrder();
                    List<Order> ListOrders = _LNOR.GetAllOrder();
                    List<Order> ListaOrdenada = ListOrders.Where(x => x.Status.Id != 8).OrderByDescending(x => x.Status.Id == 5).ToList();
                    ViewBag.Ordenes = ListaOrdenada;
                    return Json(ListaOrdenada, JsonRequestBehavior.AllowGet);

                }
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
        }

        [HttpPost]
        public ActionResult GetDoorsByOrder(int idOrder)
        {
            //BusinessLogic.lnOrder _LNO = new BusinessLogic.lnOrder();
            //var getOrderData = _LNO.GetOrderById(idOrder);
            //ViewBag.OrderDetails = getOrderData;
            BusinessLogic.lnDoorsxUser _LN = new BusinessLogic.lnDoorsxUser();
            List<DoorsxUser> xDoors = _LN.GetAllDoorsxUser();
            List<DoorsxUser> doorsByOrder = xDoors.Where(x => x.Order.Id == idOrder).ToList();
            // ViewBag.DoorsOrder = doorsByOrder;
            return Json(doorsByOrder);

        }
    }
}
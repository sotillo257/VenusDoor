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
                List<Order> ListaOrdenada = ListOrders.OrderByDescending(x => x.ModificationDate).ToList();
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
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Model;

namespace VenusDoors.Controllers
{
    public class OrderStatusController : Controller
    {
        // GET: OrderStatus
        public ActionResult Index()
        {
            if (Session["UserID"] == null)
            {
                return RedirectToAction("Index", "Home");
            }
            else
            {
                ViewBag.OrderStatus = "active";
                int userID = (int)Session["UserID"];

                //Get Active Order
                BusinessLogic.lnOrder _LNO = new BusinessLogic.lnOrder();
                var getOr = _LNO.GetAllOrder();
                var OrderActive = getOr.Where(x => x.Status.Id == 7 && x.User.Id == userID).FirstOrDefault();
                ViewBag.ActiveOrder = OrderActive;

                if (OrderActive != null)
                {
                    //Get Doors in the active Order
                    BusinessLogic.lnDoorsxUser _LN = new BusinessLogic.lnDoorsxUser();
                    var xDoorsU = _LN.GetAllDoorsxUser();
                    DoorsxUser doorByOrder = xDoorsU.Where(x => x.Order.Id == OrderActive.Id).OrderByDescending(x => x.CreationDate).FirstOrDefault();
                    ViewBag.xUserDoors = doorByOrder;
                }

                //Get List Order
                List<Order> ListOrders = _LNO.GetAllOrder();
                List<Order> OrdersByU = ListOrders.Where(x => x.User.Id == userID).OrderByDescending(x => x.Status.Id == 7).ToList();
                if (OrdersByU.Count == 0)
                {
                    ViewBag.ListO = null;
                }
                else
                {
                    ViewBag.ListO = OrdersByU;
                }



                //List<Order> OrdenesModal = _LNO.GetAllOrder();
                //List<Order> OrdenesModalList = OrdenesModal.Where(x => x.User.Id == userID).OrderByDescending(x => x.Status.Id == 7).ToList();
                //var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
                //ViewBag.ListaModal = serializar.Serialize(OrdenesModalList);

                return View();                         
            }
        }
    }
} 
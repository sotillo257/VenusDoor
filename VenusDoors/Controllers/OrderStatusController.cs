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
            try
            {
                if (Session["UserID"] == null)
                {
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    ViewBag.OrderStatus = "active";
                    int userID = (int)Session["UserID"];

                    //Get last Order 
                    BusinessLogic.lnOrder _LNO = new BusinessLogic.lnOrder();
                    var getOr = _LNO.GetAllOrder();
                    var LastOrder = getOr.Where(x => x.Status.Id != 9 && x.User.Id == userID).OrderByDescending(x => x.ModificationDate).FirstOrDefault();
                    ViewBag.LastOrder = LastOrder;

                    if (LastOrder != null)
                    {
                        //Get Doors in the last Order
                        BusinessLogic.lnDoorsxUser _LN = new BusinessLogic.lnDoorsxUser();
                        var xDoorsU = _LN.GetAllDoorsxUser();
                        DoorsxUser doorByOrder = xDoorsU.Where(x => x.Order.Id == LastOrder.Id).OrderByDescending(x => x.CreationDate).FirstOrDefault();
                        ViewBag.xUserDoors = doorByOrder;
                    }

                    //Get List Order
                    List<Order> ListOrders = _LNO.GetAllOrder();
                    List<Order> OrdersByU = ListOrders.Where(x => x.User.Id == userID).OrderByDescending(x => x.ModificationDate).ToList();
                    if (OrdersByU.Count == 0)
                    {
                        ViewBag.ListO = null;
                    }
                    else
                    {
                        ViewBag.ListO = OrdersByU;
                    }

                    return View();
                }
            }
            catch (Exception)
            {

                throw;
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
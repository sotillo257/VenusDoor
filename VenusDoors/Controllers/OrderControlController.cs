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
        [Authorize(Roles = "1, 2")]
        public ActionResult Index()
        {            
            if (Session["UserID"] != null)
            {
                ViewBag.OrderControl = "active";

                List<Order> ListOrders = _LNOR.GetAllOrderByCompany((int)Session["IdCompany"], (int)Session["IdTypeCompany"]);
                List<Order> ListaOrdenada = ListOrders.Where(x=> x.Status.Id != 8 && x.Status.Id != 4).OrderBy(x => x.Status.Id).ToList();
                ViewBag.Ordenes = ListaOrdenada;
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        [Authorize(Roles = "1, 2")]
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

        [Authorize(Roles = "1, 2")]
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

        [Authorize(Roles = "1, 2")]
        [HttpPost]
        public ActionResult GetAllOrderControl()
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
                    List<Order> ListOrders = _LNOR.GetAllOrderByCompany((int)Session["IdCompany"], (int)Session["IdTypeCompany"]);
                    List<Order> ListaOrdenada = ListOrders.Where(x => x.Status.Id != 8 && x.Status.Id != 4).OrderBy(x => x.Status.Id).ToList();
                    return Json(ListaOrdenada, JsonRequestBehavior.AllowGet);

                }
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
        }

        [Authorize(Roles = "1, 2")]
        [HttpPost]
        public ActionResult GetDoorsByOrder(int idOrder)
        {                       
            BusinessLogic.lnDoorsxUser _LN = new BusinessLogic.lnDoorsxUser();
            BusinessLogic.lnDoorxOrder Ord = new BusinessLogic.lnDoorxOrder();
            BusinessLogic.lnOrder _LNO = new BusinessLogic.lnOrder();
            BusinessLogic.lnUser _LNU = new BusinessLogic.lnUser();
            BusinessLogic.lnPerson _LNP = new BusinessLogic.lnPerson();

            DoorsxUser xDoors = _LN.GetAllDoorsxUser().Where(x => x.Order.Id == idOrder).ToList().FirstOrDefault();
                       
            xDoors.DoorsxOrder = Ord.GetAllDoorxOrderByDoorxUser(xDoors.Id);           
            xDoors.Order = _LNO.GetOrderById(idOrder);
            xDoors.User = _LNU.GetUserById(xDoors.User.Id);
            xDoors.User.Person = _LNP.GetPersonById(xDoors.User.Person.Id);       
            return Json(xDoors);            
        }
    }
}
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
        BusinessLogic.lnSendMail _SEND = new BusinessLogic.lnSendMail();

        // GET: OrderControl
        [Authorize(Roles = "1, 2")]
        public ActionResult Index()
        {            
            if (Session["UserID"] != null)
            {
                ViewBag.OrderControl = "active";

                List<Order> ListOrders = _LNOR.GetAllOrderByCompany((int)Session["IdCompany"], (int)Session["IdTypeCompany"]);
                List<Order> ListaOrdenada = ListOrders.Where(x=> x.Status.Id == 5).OrderBy(x => x.Status.Id).ToList();
                System.Web.HttpContext.Current.Session["StatusOrder"] = 5;
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
                    BusinessLogic.lnOrder _LNOR = new BusinessLogic.lnOrder();
                    BusinessLogic.lnUser _LNU = new BusinessLogic.lnUser();
                    BusinessLogic.lnPerson _LNP = new BusinessLogic.lnPerson();

                    modOrder.ModificationDate = DateTime.Now;
                    modOrder.ModificationUser = userID;                    
                    var modOrderStatus = _LNOR.UpdateOrderStatus(modOrder);

                    Order GetOrder = _LNOR.GetOrderById(modOrder.Id);
                    User pUser = _LNU.GetUserById(GetOrder.User.Id);
                    int idPerson = pUser.Person.Id;
                    pUser.Person = _LNP.GetPersonById(idPerson);        
                    string message = "";
                    string subject = "The status of your order #"+ GetOrder.Id +" has changed";
                    string FromTittle = "Venus Cabinet Doors";
                    string typeMessage = "OrderControl";
                    if (modOrder.Status.Id == 6)
                    {
                        message += "<p style='width: 80%;'>Hi, " + pUser.Person.Name + " " + pUser.Person.Lastname + ".<br><br>Your order #" + GetOrder.Id + " has been approved. Shortly we will contact you to process your payment and continue with the process of your order.</p>";
                    }
                    else if(modOrder.Status.Id == 7)
                    {
                        message += "<p style='width: 80%;'>Hi, " + pUser.Person.Name + " " + pUser.Person.Lastname + ".<br><br>The status of your order #" + GetOrder.Id + " has changed. We are in the process of building your doors, we will send you another email when your order is complete.</p>";
                    }
                    else if (modOrder.Status.Id == 8)
                    {
                        if (GetOrder.ShippingAddress.Id == 1)
                        {
                            message += "<p style='width: 80%;'>Hi, " + pUser.Person.Name + " " + pUser.Person.Lastname + ".<br><br>Your order #" + GetOrder.Id + " has been completed and ready to pick up.</p>";
                        }
                        else
                        {
                            message += "<p style='width: 80%;'>Hi, " + pUser.Person.Name + " " + pUser.Person.Lastname + ".<br><br>Your order #" + GetOrder.Id + " has been completed. Your doors will be sent to the shipping address you provided when confirming your order.</p>";
                        }
                    }
                    else if (modOrder.Status.Id == 11)
                    {
                        message += "<p style='width: 80%;'>Hi, " + pUser.Person.Name + " " + pUser.Person.Lastname + ".<br><br>Your order #" + GetOrder.Id + " has been rejected.</p>";
                    }                    
                    _SEND.SendMail(pUser, subject, FromTittle, message, typeMessage);
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
                    List<Order> ListaOrdenada = null;
                    if ((int)Session["StatusOrder"] > 0)
                    {
                         ListaOrdenada = ListOrders.Where(x => x.Status.Id == (int)Session["StatusOrder"]).OrderBy(x => x.Status.Id).ToList();
                    }
                    else
                    {
                         ListaOrdenada = ListOrders.OrderBy(x => x.Status.Id).ToList();
                    }
                   
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
            if (xDoors.DoorsxOrder.Sum(x => x.Descuento) > 0)
            {
                xDoors.DescuentoActivos = true;
            }           
            xDoors.Order = _LNO.GetOrderById(idOrder);
            xDoors.User = _LNU.GetUserById(xDoors.User.Id);
            xDoors.User.Person = _LNP.GetPersonById(xDoors.User.Person.Id);       
            return Json(xDoors);            
        }

        [Authorize(Roles = "1, 2")]
        [HttpPost]
        public ActionResult GetOrderxStatus(int IdStatus)
        {
            try
            {
                BusinessLogic.lnOrder _LNOR = new BusinessLogic.lnOrder();
                List<Order> ListOrders = _LNOR.GetAllOrderByCompany((int)Session["IdCompany"], (int)Session["IdTypeCompany"]);
                List<Order> ListaOrdenada = null;
                System.Web.HttpContext.Current.Session["StatusOrder"] = IdStatus;
                if (IdStatus > 0)
                {
                    ListaOrdenada = ListOrders.Where(x => x.Status.Id == IdStatus).OrderBy(x => x.Status.Id).ToList();
                }
                else
                {
                    ListaOrdenada = ListOrders.OrderBy(x => x.Status.Id).ToList();
                }
                

                return Json(new { Error = false, Data = ListaOrdenada , Mensaje = "" } , JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Error = true, Mensaje = ex.Message }, JsonRequestBehavior.AllowGet);
            }
           
        }
    }
}
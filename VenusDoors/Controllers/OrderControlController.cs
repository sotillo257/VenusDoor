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
                    int uss = (int)Session["UserID"];
                    ln.UpdateDoorxOrder(idOrder, pDoorsxOrder, uss);

                    return Json(true, JsonRequestBehavior.AllowGet);
                }

            }
            catch (Exception ex)
            {
                return Json(new { Error = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
               
        [HttpPost]
        public ActionResult UpdateDoorxUser(Order Orden)
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
                    BusinessLogic.lnUser _LNU = new BusinessLogic.lnUser();
                    BusinessLogic.lnPerson _LNP = new BusinessLogic.lnPerson();

                    Order ord = ln.CrearOrder(Orden, (int)Session["UserID"]);
                    _LN.UpdateDoorsxOrder(ord);

                    User pUser = _LNU.GetUserById(ord.User.Id);
                    int idPerson = pUser.Person.Id;
                    pUser.Person = _LNP.GetPersonById(idPerson);
                    string message = "<p>We have made some modifications to the configuration of your order.<br>The following shows how the general configuration was after being modified:</p>" +
                    "<div style='width:100%'>"+
                    "<h4 style = 'margin:0; text-align:center' >General Configuration</h4>" +
                    "<div class='datagrid' style='font: normal 12px/150% Arial, Helvetica, sans-serif; background: #fff; overflow: hidden; border: 1px solid #014D41; -webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px; width:100%'>" +
                    "<table style='border-collapse: collapse; text-align: left; width: 100%;'><tbody>" +
                    "<tr>" +
                    "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Wood Species: <span style = 'color: #868ba1'>" + Orden.DoorxUser.Material.Description + "</span></td>" +
                    "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Door Style: <span style = 'color: #868ba1'>" + Orden.DoorxUser.DoorStyle.Description + "</span></td>";
                    if (Orden.DoorxUser.isOverlay == false)
                    {
                        message += "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Door Place: <span style = 'color: #868ba1'>Inset Door Type</span></td>";
                    }
                    else
                    {
                        message += "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Door Place: <span style = 'color: #868ba1'>Overlay Door Type</span></td>";
                    }
                    message += "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Inside Edge Profile: <span style = 'color: #868ba1'> " + Orden.DoorxUser.InsideEdgeProfile.Description + "</span></td>" +
                    "</tr>" +
                    "<tr>" +
                        "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Outside Edge Profile: <span style = 'color: #868ba1'>" + Orden.DoorxUser.OutsideEdgeProfile.Description + "</span></td>" +
                        "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Stile Width: <span style = 'color: #868ba1'>" + Orden.DoorxUser.BottomRail.Description + "</span></td>" +
                        "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Rail Width: <span style = 'color: #868ba1'>" + Orden.DoorxUser.TopRail.Description + "</span></td>" +
                        "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Door Assembly: <span style = 'color: #868ba1'> " + Orden.DoorxUser.Join.Description + "</span></td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Panel Material: <span style = 'color: #868ba1'>" + Orden.DoorxUser.PanelMaterial.Description + "</span></td>";
                    if (Orden.DoorxUser.IsOpeningMeasurement == false)
                    {
                        message += "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Opening Measurement: <span style = 'color: #868ba1'>No</span></td>";
                    }
                    else
                    {
                        message += "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Opening Measurement: <span style = 'color: #868ba1'>Yes</span></td>";
                    }
                    message += "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Vertical Divisions: <span style = 'color: #868ba1'> " + Orden.DoorxUser.VerticalDivisions.Quantity + "</span></td>" +
                    "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Horizontal Divisions: <span style = 'color: #868ba1'> " + Orden.DoorxUser.HorizontalDivisions.Quantity + "</span></td>" +
                    "</tr>" +
                    "<tr>";
                    if (Orden.DoorxUser.isDrill == false)
                    {
                        message += "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Hinge Drilling: <span style = 'color: #868ba1'>No drill</span></td>";
                    }
                    else
                    {
                        message += "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Hinge Drilling: <span style = 'color: #868ba1'>Drill(" + Orden.DoorxUser.HingeDirection.Direction + ")</span></td>";
                    }
                    if (Orden.DoorxUser.isFingerPull == false)
                    {
                        message += "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Finger Pull: <span style = 'color: #868ba1'>No</span></td>";
                    }
                    else
                    {
                        message += "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Finger Pull: <span style = 'color: #868ba1'>Yes</span></td>";
                    }
                    message += "</tr></tbody></table></div></div>";
                    string subject = "Your order #" + Orden.Id + " has been modified";
                    string FromTittle = "Venus Cabinet Doors";
                    string typeMessage = "OrderControl";
                    _SEND.SendMail(pUser, subject, FromTittle, message, typeMessage);
                    return Json(true, JsonRequestBehavior.AllowGet);
                }

            }
            catch (Exception ex)
            {
                return View("Error");
            }
        }
    }
}
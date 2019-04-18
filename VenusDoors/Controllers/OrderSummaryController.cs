using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Model;
using System.Net.Mail;

namespace VenusDoors.Controllers
{
    public class OrderSummaryController : Controller
    {

        String path;
        MailMessage mail = new MailMessage();

        public IEnumerable<string> ConverExcel { get; private set; }

        // GET: OrderSummary
    
        [Authorize]
        public ActionResult Index(int? Id)
        {
            try
            {
                ViewBag.OrderSummary = "active";

                if (Session["UserID"] != null)
                {
                    int val = 0;
                    var serializar1 = new System.Web.Script.Serialization.JavaScriptSerializer();
                    if (int.TryParse(Id.ToString(), out val))
                    {
                        BusinessLogic.lnDoors Door = new BusinessLogic.lnDoors();
                        Doors D = Door.GetDoorsById(int.Parse(Id.ToString()));
                        ViewBag.DoorDashboard = serializar1.Serialize(D);
                    }
                    BusinessLogic.lnDoorsxUser DU = new BusinessLogic.lnDoorsxUser();
                    BusinessLogic.lnOrder _LNOrder = new BusinessLogic.lnOrder();
                    BusinessLogic.lnDoorxOrder _LnDoorOrder = new BusinessLogic.lnDoorxOrder();
                    Order item = _LNOrder.GetOrderByUser((int)Session["UserID"]).Where(x => x.Status.Id == 4).FirstOrDefault();
                    if (item != null)
                    {
                        item.DoorxUser = DU.GetAllDoorsxUser().Where(x => x.Order.Id == item.Id).FirstOrDefault();
                        if (item.DoorxUser != null)
                        {
                            item.DoorxUser.DoorsxOrder = _LnDoorOrder.GetAllDoorxOrderByDoorxUser(item.DoorxUser.Id).OrderByDescending(x => x.Id).ToList();
                            ViewBag.Order = item;
                            ViewBag.IDDoorStyle = item.DoorxUser.DoorStyle.Id;
                           // GetLastDoor();
                        }
                       
                    }
                    else {
                        ViewBag.Order = null;
                    }

                }

                return View();
            }
            catch (Exception ex)
            {
                return View("Error");
            }

        }

        [Authorize] [HttpPost]
        public ActionResult GetOrderSumary()
        {
            try
                {

                BusinessLogic.lnDoorsxUser DU = new BusinessLogic.lnDoorsxUser();
                BusinessLogic.lnOrder _LNOrder = new BusinessLogic.lnOrder();
                BusinessLogic.lnDoorxOrder _LnDoorOrder = new BusinessLogic.lnDoorxOrder();
                Order item = _LNOrder.GetOrderByUser((int)Session["UserID"]).Where(x => x.Status.Id == 4).FirstOrDefault();
                if (item != null)
                {
                    item.DoorxUser = DU.GetAllDoorsxUser().Where(x => x.Order.Id == item.Id).FirstOrDefault();
                    item.DoorxUser.DoorsxOrder = _LnDoorOrder.GetAllDoorxOrderByDoorxUser(item.DoorxUser.Id).OrderByDescending(x => x.Id).ToList();
                }
                return Json(new { Order = item }, JsonRequestBehavior.AllowGet);
                             
                }
                catch
                {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetLastDoor()
        {
            try
            {
                BusinessLogic.lnDoorsxUser _LNDOR = new BusinessLogic.lnDoorsxUser();
                BusinessLogic.lnOrder _LNOrder = new BusinessLogic.lnOrder();
                var orderList = _LNOrder.GetOrderByUser((int)Session["UserID"]).Where(x => x.Status.Id == 4).LastOrDefault();

                if (orderList == null)
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }
                else if (orderList.Status.Id == 4)
                {
                    var xDoorsU = _LNDOR.GetAllDoorsxUser();
                    DoorsxUser LastDoorr = xDoorsU.Where(x => x.Order.Id == orderList.Id).OrderByDescending(x => x.ModificationDate).FirstOrDefault();
                    var serializar1 = new System.Web.Script.Serialization.JavaScriptSerializer();
                    ViewBag.JsDoor = serializar1.Serialize(LastDoorr);
                    return Json(new { LastDoor = LastDoorr }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }

            }
            catch
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult DeleteItem(int itemID, int orderid)
        {
           
            try
            {
                if (Session["UserID"] == null)
            {
                    return Json(false, JsonRequestBehavior.AllowGet);
            }
            else
            {
                    BusinessLogic.lnDoorxOrder _LND = new BusinessLogic.lnDoorxOrder();
                    int userID = (int)Session["UserID"];
                        BusinessLogic.lnOrder _LNO = new BusinessLogic.lnOrder();
                        Order upptOrd = _LNO.GetOrderById(orderid);
                        var xDoor = _LND.GetDoorsxOrderById(itemID);
                        var delete = _LND.DeleteDoorsxOrder(itemID);
                        UpdateOrderExist(xDoor, upptOrd);
                        return Json(true, JsonRequestBehavior.AllowGet);
                    }
               
            }
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }         

        [Authorize] [HttpPost]
        public ActionResult UpdateOrderExist(DoorxOrder xDoor, Order upptOrd)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                BusinessLogic.lnDoorxOrder _LNDoorx = new BusinessLogic.lnDoorxOrder();
                BusinessLogic.lnDoorsxUser _LNDU = new BusinessLogic.lnDoorsxUser();
                BusinessLogic.lnOrder _LNUPor = new BusinessLogic.lnOrder();
                upptOrd.Quantity = upptOrd.Quantity - xDoor.Quantity;                
                upptOrd.SubTotal = upptOrd.SubTotal - xDoor.SubTotal;
                decimal taxDoor = xDoor.SubTotal * Convert.ToDecimal(0.0825);
                decimal TaxRound = Math.Round(taxDoor * 100)/ 100;
                upptOrd.Tax = upptOrd.Tax - TaxRound;
                decimal TotaltaxDoor = TaxRound + xDoor.SubTotal;
                upptOrd.Total = upptOrd.Total - TotaltaxDoor;
                upptOrd.ModificationDate = DateTime.Now;
                //var searchDoorsxUser = _LNDU.GetDoorsxUserById(upptOrd.DoorxUser.Id);
                //var DoorsxOrderList = _LNDoorx.GetAllDoorxOrderByDoorxUser(upptOrd.DoorxUser.Id);
                //ViewBag.DoorsxOrder = DoorsxOrderList;

                return Json(_LNUPor.UpdateOrder(upptOrd));

                //if (ViewBag.DoorsxOrder == null || ViewBag.DoorsxOrder.Count == 0) 
                //{
                //    var Delete = _LNDU.DeleteDoorsxUser(upptOrd.DoorxUser.Id);
                //    return Json(_LNUPor.DeleteOrder(upptOrd.Id));
                //}
                //else
                //{
                //    return Json(_LNUPor.UpdateOrder(upptOrd));
                //}
            }
        }

        [Authorize] [HttpPost]
        public ActionResult CloseOrder(Order CompleteOrder)
        {
            if(Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                if(CompleteOrder.Status == null)
                {
                    return View();
                }
                else if (CompleteOrder.Status.Id == 4)
                {
                    int userID = (int)Session["UserID"];
                    BusinessLogic.lnOrder _LNUPor = new BusinessLogic.lnOrder();
                    CompleteOrder.ModificationDate = DateTime.Now;
                    CompleteOrder.ModificationUser = userID;
                    CompleteOrder.Status.Id = 5;
                    return Json(_LNUPor.UpdateOrder(CompleteOrder));
                }
                else
                {
                    return View();
                }
                
            }            
        }

        [Authorize]
        public void SentOrderSummaryEstimate(Order CompleteOrder)
        {
            BusinessLogic.lnSendMail _SEND = new BusinessLogic.lnSendMail();
            BusinessLogic.lnUser _LNU = new BusinessLogic.lnUser();
            BusinessLogic.lnPerson _LNP = new BusinessLogic.lnPerson();
            BusinessLogic.lnDoorsxUser _LNDU = new BusinessLogic.lnDoorsxUser();
            BusinessLogic.lnDoorxOrder _LNDO = new BusinessLogic.lnDoorxOrder();

            var getDoorxu = CompleteOrder.DoorxUser;
            List<DoorxOrder> ListaDoorsxO = _LNDO.GetAllDoorxOrderByDoorxUser(getDoorxu.Id);

            User pUser = _LNU.GetUserById(CompleteOrder.User.Id);
            int idPerson = pUser.Person.Id;
            pUser.Person = _LNP.GetPersonById(idPerson);
            string subject = "Order summary #"+ CompleteOrder.Id;
            string FromTittle = "Venus Cabinet Doors";
            string message = "";
            string typeMessage = "OrderSumm";

            message += "<div style='width:100%'><h4 style='margin:0; text-align:center'>Order ref: #" + CompleteOrder.Id + "</h4><div class='datagrid' style='font: normal 12px/150% Arial, Helvetica, sans-serif; background: #fff; overflow: hidden; border: 1px solid #014D41; -webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px; width:100%'>" +
           "<table style='border-collapse: collapse; text-align: left; width: 100%;'><tbody>" +
           "<tr>" +
               "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Name: " + pUser.Person.Name + " " + pUser.Person.Lastname + "</td>" +
               "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Phone: " + pUser.Person.Telephone + "</td>" +
               "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Email: " + pUser.Email + "</td>" +
               "</tr>" +
           "<tr>" +
               "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Address: " + pUser.Person.Direction + "</td>" +
               "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Estimate date: " + DateTime.Now + "</td>" +
               "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Quantity of products: " + CompleteOrder.Quantity + "</td>" +
           "</tr>" +
           "<tr>" +
               "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Sub-Total: $" + CompleteOrder.SubTotal + "</td>" +
               "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Tax: $" + CompleteOrder.Tax + "</td>" +
               "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Total: $" + CompleteOrder.Total + "</td>" +
           "</tr></tbody></table></div>" +
           "<h4 style = 'margin:0; text-align:center' >General Configuration</h4>" +
           "<div class='datagrid' style='font: normal 12px/150% Arial, Helvetica, sans-serif; background: #fff; overflow: hidden; border: 1px solid #014D41; -webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px; width:100%'>" +
           "<table style='border-collapse: collapse; text-align: left; width: 100%;'><tbody>" +
           "<tr>" +
               "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Wood Species: <span style = 'color: #868ba1'>" + getDoorxu.Material.Description + "</span></td>" +
               "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Door Style: <span style = 'color: #868ba1'>" + getDoorxu.DoorStyle.Description + "</span></td>";
            if (getDoorxu.isOverlay == false)
            {
                message += "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Door Place: <span style = 'color: #868ba1'>Inset Door Type</span></td>";
            }
            else
            {
                message += "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Door Place: <span style = 'color: #868ba1'>Overlay Door Type</span></td>";
            }
            message += "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Inside Edge Profile: <span style = 'color: #868ba1'> " + getDoorxu.InsideEdgeProfile.Description + "</span></td>" +
            "</tr>" +
            "<tr>" +
                "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Outside Edge Profile: <span style = 'color: #868ba1'>" + getDoorxu.OutsideEdgeProfile.Description + "</span></td>" +
                "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Stile Width: <span style = 'color: #868ba1'>" + getDoorxu.BottomRail.Description + "</span></td>" +
                "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Rail Width: <span style = 'color: #868ba1'>" + getDoorxu.TopRail.Description + "</span></td>" +
                "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Door Assembly: <span style = 'color: #868ba1'> " + getDoorxu.Join.Description + "</span></td>" +
            "</tr>" +
            "<tr>" +
            "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Panel Material: <span style = 'color: #868ba1'>" + getDoorxu.PanelMaterial.Description + "</span></td>";
            if (getDoorxu.IsOpeningMeasurement == false)
            {
                message += "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Opening Measurement: <span style = 'color: #868ba1'>No</span></td>";
            }
            else
            {
                message += "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Opening Measurement: <span style = 'color: #868ba1'>Yes</span></td>";
            }
            message += "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Vertical Divisions: <span style = 'color: #868ba1'> " + getDoorxu.VerticalDivisions.Quantity + "</span></td>" +
            "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Horizontal Divisions: <span style = 'color: #868ba1'> " + getDoorxu.HorizontalDivisions.Quantity + "</span></td>" +
            "</tr>" +
            "<tr>";
            if(getDoorxu.isDrill == false)
            {
                message += "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Hinge Drilling: <span style = 'color: #868ba1'>No</span></td>";
            }
            else
            {
                message += "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Hinge Drilling: <span style = 'color: #868ba1'>Yes (" + getDoorxu.HingeDirection.Direction +")</span></td>";
            }
            if (getDoorxu.isFingerPull == false)
            {
                message += "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Finger Pull: <span style = 'color: #868ba1'>No</span></td>";
            }
            else
            {
                message += "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>Finger Pull: <span style = 'color: #868ba1'>Yes</span></td>";
            }
            message += "</tr>" +
            "</tbody></table></div>" +
            "<h4 style = 'margin:0; text-align:center' >Door list</h4>" +
            "<div class='datagrid' style='font: normal 12px/150% Arial, Helvetica, sans-serif; background: #fff; overflow: hidden; border: 1px solid #014D41; -webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px;width:100%'><table style='border-collapse: collapse; text-align: left; width: 100%;'><thead>" +
            "<tr>" +
                "<th style='padding: 3px 10px; background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #014D41), color-stop(1, #027D69) );background:-moz-linear-gradient( center top, #014D41 5%, #027D69 100% );filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#014D41', endColorstr='#027D69');background-color:#014D41; color:#FFFFFF; font-size: 11px; font-weight: bold; border-left: 1px solid #0070A8;'>Width</th>" +
                "<th style='padding: 3px 10px; background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #014D41), color-stop(1, #027D69) );background:-moz-linear-gradient( center top, #014D41 5%, #027D69 100% );filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#014D41', endColorstr='#027D69');background-color:#014D41; color:#FFFFFF; font-size: 11px; font-weight: bold; border-left: 1px solid #0070A8;'>Height</th>" +
                "<th style='padding: 3px 10px; background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #014D41), color-stop(1, #027D69) );background:-moz-linear-gradient( center top, #014D41 5%, #027D69 100% );filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#014D41', endColorstr='#027D69');background-color:#014D41; color:#FFFFFF; font-size: 11px; font-weight: bold; border-left: 1px solid #0070A8;'>Panel Style</th>" +
                "<th style='padding: 3px 10px; background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #014D41), color-stop(1, #027D69) );background:-moz-linear-gradient( center top, #014D41 5%, #027D69 100% );filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#014D41', endColorstr='#027D69');background-color:#014D41; color:#FFFFFF; font-size: 11px; font-weight: bold; border-left: 1px solid #0070A8;'>Door Type</th>" +
                "<th style='padding: 3px 10px; background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #014D41), color-stop(1, #027D69) );background:-moz-linear-gradient( center top, #014D41 5%, #027D69 100% );filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#014D41', endColorstr='#027D69');background-color:#014D41; color:#FFFFFF; font-size: 11px; font-weight: bold; border-left: 1px solid #0070A8;'>Door Option</th>" +
                "<th style='padding: 3px 10px; background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #014D41), color-stop(1, #027D69) );background:-moz-linear-gradient( center top, #014D41 5%, #027D69 100% );filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#014D41', endColorstr='#027D69');background-color:#014D41; color:#FFFFFF; font-size: 11px; font-weight: bold; border-left: 1px solid #0070A8;'>U.Price</th>" +
                "<th style='padding: 3px 10px; background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #014D41), color-stop(1, #027D69) );background:-moz-linear-gradient( center top, #014D41 5%, #027D69 100% );filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#014D41', endColorstr='#027D69');background-color:#014D41; color:#FFFFFF; font-size: 11px; font-weight: bold; border-left: 1px solid #0070A8;'>Quantity</th>" +
                "<th style='padding: 3px 10px; background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #014D41), color-stop(1, #027D69) );background:-moz-linear-gradient( center top, #014D41 5%, #027D69 100% );filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#014D41', endColorstr='#027D69');background-color:#014D41; color:#FFFFFF; font-size: 11px; font-weight: bold; border-left: 1px solid #0070A8;'>Total</th>" +
            "</tr></thead>" +
            "<tbody>";
            foreach (DoorxOrder item in ListaDoorsxO)
            {
                var decimalH = "";
                var decimalW = "";
                if(item.DecimalsHeight.Description == "0")
                {
                    decimalH = "";
                }
                else
                {
                    decimalH = item.DecimalsHeight.Description;
                }

                if (item.DecimalsWidth.Description == "0")
                {
                    decimalW = "";
                }
                else
                {
                    decimalW = item.DecimalsWidth.Description;
                }
                message += "<tr>" +
                    "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>" + item.Width.ToString("N0") + " "+ decimalW + "</td>" +
                    "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>" + item.Height.ToString("N0") + " " + decimalH + "</td>" +
                    "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>" + item.Panel.Description + "</td>" +                    
                    "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>" + item.DoorType.Description + "</td>" +
                    "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>" + item.DoorOption.Description + "</td>" +
                    "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>" + item.ItemCost + "</td>" +
                    "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>" + item.Quantity + "</td>" +
                    "<td style='padding: 3px 10px; color: #014D41; border-left: 1px solid #E1EEF4;font-size: 11px;border-bottom: 1px solid #DDEAF0;font-weight: normal;'>" + item.SubTotal + "</td>" +
               "</tr>";
            }
            message += "</tbody></table></div></div>";            
            _SEND.SendMail(pUser, subject, FromTittle, message, typeMessage);
        }       

        [Authorize] [HttpPost]
        public ActionResult ConfirmOrder (Order ord)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                try
                {
                    BusinessLogic.lnOrder _LNO = new BusinessLogic.lnOrder();
                    Order CompleteOrder = _LNO.GetOrderByUser((int)Session["UserID"]).Where(x => x.Status.Id == 4).FirstOrDefault();
                    CompleteOrder.Observations = ord.Observations;
                    if(ord.ShippingAddress.Id != 0)
                    {
                        CompleteOrder.ShippingAddress = ord.ShippingAddress;
                    }
                    BusinessLogic.lnDoorsxUser DU = new BusinessLogic.lnDoorsxUser();
                    CompleteOrder.DoorxUser = DU.GetAllDoorsxUser().Where(x => x.Order.Id == CompleteOrder.Id).FirstOrDefault();
                    SentOrderSummaryEstimate(CompleteOrder);
                    CloseOrder(CompleteOrder);
                    return Json(true, JsonRequestBehavior.AllowGet);                    
                }
                catch (Exception ex)
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
        }

        [Authorize] [HttpPost]
        public ActionResult ValidateSession()
        {

            if (Session["UserID"] != null)
            {
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetAllShippingAddressByUser()
        {
            if (Session["UserID"] != null)
            {
                BusinessLogic.lnShippingAddress _LNSA = new BusinessLogic.lnShippingAddress();
                int userID = (int)Session["UserID"];
                return Json(_LNSA.GetShippingAddressByIdUser(userID));                
            }
            else
            {
                return View();
            }              
        }

        [Authorize] [HttpPost]
        public ActionResult InsertShippingAddress(ShippingAddress ShippingData)
        {
            try
            {
                int userID = (int)Session["UserID"];
                BusinessLogic.lnShippingAddress _LNSA = new BusinessLogic.lnShippingAddress();
                BusinessLogic.lnUser _LNUS = new BusinessLogic.lnUser();
                var getUser = _LNUS.GetUserById(userID);
                ShippingData.User = getUser;
                ShippingData.CreatorUser = userID;
                ShippingData.ModificationUser = userID;
                ShippingData.CreationDate = DateTime.Now;
                ShippingData.ModificationDate = DateTime.Now;
                ShippingData.LotBlock = "00000000";
                var InsertNewSA = _LNSA.InsertShippingAddress(ShippingData);                
                return Json(InsertNewSA, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }


        #region BottomRail 
        [Authorize] [HttpPost]
        public ActionResult InsertBottomRail(BottomRail pBottomRail)

        {
            try
            {
                BusinessLogic.lnBottomRail _LN = new BusinessLogic.lnBottomRail();
                return Json(_LN.InsertBottomRail(pBottomRail));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult UpdateBottomRail(BottomRail pBottomRail)

        {
            try
            {
                BusinessLogic.lnBottomRail _LN = new BusinessLogic.lnBottomRail();
                return Json(_LN.UpdateBottomRail(pBottomRail));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetAllBottomRail()
        {
            try
            {
                BusinessLogic.lnBottomRail _LN = new BusinessLogic.lnBottomRail();
                return Json(_LN.GetAllBottomRail());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetBottomRailById(int pId)
        {
            try
            {
                BusinessLogic.lnBottomRail _LN = new BusinessLogic.lnBottomRail();
                return Json(_LN.GetBottomRailById(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult DeleteBottomRail(int pId)
        {
            try
            {
                BusinessLogic.lnBottomRail _LN = new BusinessLogic.lnBottomRail();
                return Json(_LN.DeleteBottomRail(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region Doors
        [Authorize] [HttpPost]
        public ActionResult InsertDoors(Doors pDoors)

        {
            try
            {
                BusinessLogic.lnDoors _LN = new BusinessLogic.lnDoors();
                return Json(_LN.InsertDoors(pDoors));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult UpdateDoors(Doors pDoors)

        {
            try
            {
                BusinessLogic.lnDoors _LN = new BusinessLogic.lnDoors();
                return Json(_LN.UpdateDoors(pDoors));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetAllDoors()
        {
            try
            {
                BusinessLogic.lnDoors _LN = new BusinessLogic.lnDoors();
                return Json(_LN.GetAllDoors());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetDoorsById(int pId)
        {
            try
            {
                BusinessLogic.lnDoors _LN = new BusinessLogic.lnDoors();
                return Json(_LN.GetDoorsById(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult DeleteDoors(int pId)
        {
            try
            {
                BusinessLogic.lnDoors _LN = new BusinessLogic.lnDoors();
                return Json(_LN.DeleteDoors(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region DoorsPrices
        [Authorize] [HttpPost]
        public ActionResult InsertDoorsPrices(DoorsPrices pDoorsPrices)

        {
            try
            {
                BusinessLogic.lnDoorsPrices _LN = new BusinessLogic.lnDoorsPrices();
                return Json(_LN.InsertDoorsPrices(pDoorsPrices));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult UpdateDoorsPrices(DoorsPrices pDoorsPrices)

        {
            try
            {
                BusinessLogic.lnDoorsPrices _LN = new BusinessLogic.lnDoorsPrices();
                return Json(_LN.UpdateDoorsPrices(pDoorsPrices));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetAllDoorsPrices()
        {
            try
            {
                BusinessLogic.lnDoorsPrices _LN = new BusinessLogic.lnDoorsPrices();
                return Json(_LN.GetAllDoorsPrices());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetDoorsPricesById(int pId)
        {
            try
            {
                BusinessLogic.lnDoorsPrices _LN = new BusinessLogic.lnDoorsPrices();
                return Json(_LN.GetDoorsPricesById(pId,0,0,0));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult DeleteDoorsPrices(int pId)
        {
            try
            {
                BusinessLogic.lnDoorsPrices _LN = new BusinessLogic.lnDoorsPrices();
                return Json(_LN.DeleteDoorsPrices(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region DoorStyle 
        [Authorize] [HttpPost]
        public ActionResult InsertDoorStyle(DoorStyle pDoorStyle)

        {
            try
            {
                BusinessLogic.lnDoorStyle _LN = new BusinessLogic.lnDoorStyle();
                return Json(_LN.InsertDoorStyle(pDoorStyle));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult UpdateDoorStyle(DoorStyle pDoorStyle)

        {
            try
            {
                BusinessLogic.lnDoorStyle _LN = new BusinessLogic.lnDoorStyle();
                return Json(_LN.UpdateDoorStyle(pDoorStyle));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetAllDoorStyle()
        {
            try
            {
                BusinessLogic.lnDoorStyle _LN = new BusinessLogic.lnDoorStyle();
                return Json(_LN.GetAllDoorStyle());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetDoorStyleById(int pId)
        {
            try
            {
                BusinessLogic.lnDoorStyle _LN = new BusinessLogic.lnDoorStyle();
                return Json(_LN.GetDoorStyleById(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult DeleteDoorStyle(int pId)
        {
            try
            {
                BusinessLogic.lnDoorStyle _LN = new BusinessLogic.lnDoorStyle();
                return Json(_LN.DeleteDoorStyle(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region DoorStylexInsideEdgeProfile
        

        [Authorize] [HttpPost]
        public ActionResult UpdateDoorStylexInsideEdgeProfile(DoorStylexInsideEdgeProfile pDoorStylexInsideEdgeProfile)

        {
            try
            {
                BusinessLogic.lnDoorStylexInsideEdgeProfile _LN = new BusinessLogic.lnDoorStylexInsideEdgeProfile();
                return Json(_LN.UpdateDoorStylexInsideEdgeProfile(pDoorStylexInsideEdgeProfile));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetAllDoorStylexInsideEdgeProfile()
        {
            try
            {
                BusinessLogic.lnDoorStylexInsideEdgeProfile _LN = new BusinessLogic.lnDoorStylexInsideEdgeProfile();
                return Json(_LN.GetAllDoorStylexInsideEdgeProfile());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetDoorStylexInsideEdgeProfileById(int pId)
        {
            try
            {
                BusinessLogic.lnDoorStylexInsideEdgeProfile _LN = new BusinessLogic.lnDoorStylexInsideEdgeProfile();
                return Json(_LN.GetDoorStylexInsideEdgeProfileById(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult DeleteDoorStylexInsideEdgeProfile(int pId)
        {
            try
            {
                BusinessLogic.lnDoorStylexInsideEdgeProfile _LN = new BusinessLogic.lnDoorStylexInsideEdgeProfile();
                return Json(_LN.DeleteDoorStylexInsideEdgeProfile(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region DoorStylexOutsideEdgeProfile
        [Authorize] [HttpPost]
        public ActionResult InsertDoorStylexOutsideEdgeProfile(DoorStylexOutsideEdgeProfile pDoorStylexOutsideEdgeProfile)

        {
            try
            {
                BusinessLogic.lnDoorStylexOutsideEdgeProfile _LN = new BusinessLogic.lnDoorStylexOutsideEdgeProfile();
                return Json(_LN.InsertDoorStylexOutsideEdgeProfile(pDoorStylexOutsideEdgeProfile));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult UpdateDoorStylexOutsideEdgeProfile(DoorStylexOutsideEdgeProfile pDoorStylexOutsideEdgeProfile)

        {
            try
            {
                BusinessLogic.lnDoorStylexOutsideEdgeProfile _LN = new BusinessLogic.lnDoorStylexOutsideEdgeProfile();
                return Json(_LN.UpdateDoorStylexOutsideEdgeProfile(pDoorStylexOutsideEdgeProfile));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetAllDoorStylexOutsideEdgeProfile()
        {
            try
            {
                BusinessLogic.lnDoorStylexOutsideEdgeProfile _LN = new BusinessLogic.lnDoorStylexOutsideEdgeProfile();
                return Json(_LN.GetAllDoorStylexOutsideEdgeProfile());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetDoorStylexOutsideEdgeProfileById(int pId)
        {
            try
            {
                BusinessLogic.lnDoorStylexOutsideEdgeProfile _LN = new BusinessLogic.lnDoorStylexOutsideEdgeProfile();
                return Json(_LN.GetDoorStylexOutsideEdgeProfileById(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult DeleteDoorStylexOutsideEdgeProfile(int pId)
        {
            try
            {
                BusinessLogic.lnDoorStylexOutsideEdgeProfile _LN = new BusinessLogic.lnDoorStylexOutsideEdgeProfile();
                return Json(_LN.DeleteDoorStylexOutsideEdgeProfile(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region DoorsxUser
        [Authorize] [HttpPost]
        public ActionResult InsertDoorsxUser(DoorsxUser pDoorsxUser)

        {
            try
            {
                BusinessLogic.lnDoorsxUser _LN = new BusinessLogic.lnDoorsxUser();
                return Json(_LN.InsertDoorsxUser(pDoorsxUser));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult UpdateDoorsxUser(DoorsxUser pDoorsxUser)

        {
            try
            {
                BusinessLogic.lnDoorsxUser _LN = new BusinessLogic.lnDoorsxUser();
                return Json(_LN.UpdateDoorsxUser(pDoorsxUser));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetAllDoorsxUser()
        {
            try
            {
                BusinessLogic.lnDoorsxUser _LN = new BusinessLogic.lnDoorsxUser();
                return Json(_LN.GetAllDoorsxUser());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetDoorsxUserById(int pId)
        {
            try
            {
                BusinessLogic.lnDoorsxUser _LN = new BusinessLogic.lnDoorsxUser();
                return Json(_LN.GetDoorsxUserById(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult DeleteDoorsxUser(int pId)
        {
            try
            {
                BusinessLogic.lnDoorsxUser _LN = new BusinessLogic.lnDoorsxUser();
                return Json(_LN.DeleteDoorsxUser(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region Group
        [Authorize] [HttpPost]
        public ActionResult InsertGroup(Group pGroup)

        {
            try
            {
                BusinessLogic.lnGroup _LN = new BusinessLogic.lnGroup();
                return Json(_LN.InsertGroup(pGroup));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult UpdateGroup(Group pGroup)

        {
            try
            {
                BusinessLogic.lnGroup _LN = new BusinessLogic.lnGroup();
                return Json(_LN.UpdateGroup(pGroup));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetAllGroup()
        {
            try
            {
                BusinessLogic.lnGroup _LN = new BusinessLogic.lnGroup();
                return Json(_LN.GetAllGroup());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetGroupById(int pId)
        {
            try
            {
                BusinessLogic.lnGroup _LN = new BusinessLogic.lnGroup();
                return Json(_LN.GetGroupById(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult DeleteGroup(int pId)
        {
            try
            {
                BusinessLogic.lnGroup _LN = new BusinessLogic.lnGroup();
                return Json(_LN.DeleteGroup(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region HingeDirection
        [Authorize] [HttpPost]
        public ActionResult InsertHingeDirection(HingeDirection pHingeDirection)

        {
            try
            {
                BusinessLogic.lnHingeDirection _LN = new BusinessLogic.lnHingeDirection();
                return Json(_LN.InsertHingeDirection(pHingeDirection));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult UpdateHingeDirection(HingeDirection pHingeDirection)

        {
            try
            {
                BusinessLogic.lnHingeDirection _LN = new BusinessLogic.lnHingeDirection();
                return Json(_LN.UpdateHingeDirection(pHingeDirection));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetAllHingeDirection()
        {
            try
            {
                BusinessLogic.lnHingeDirection _LN = new BusinessLogic.lnHingeDirection();
                return Json(_LN.GetAllHingeDirection());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetHingeDirectionById(int pId)
        {
            try
            {
                BusinessLogic.lnHingeDirection _LN = new BusinessLogic.lnHingeDirection();
                return Json(_LN.GetHingeDirectionById(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult DeleteHingeDirection(int pId)
        {
            try
            {
                BusinessLogic.lnHingeDirection _LN = new BusinessLogic.lnHingeDirection();
                return Json(_LN.DeleteHingeDirection(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region HingePositions
        [Authorize] [HttpPost]
        public ActionResult InsertHingePositions(HingePositions pHingePositions)

        {
            try
            {
                BusinessLogic.lnHingePositions _LN = new BusinessLogic.lnHingePositions();
                return Json(_LN.InsertHingePositions(pHingePositions));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult UpdateHingePositions(HingePositions pHingePositions)

        {
            try
            {
                BusinessLogic.lnHingePositions _LN = new BusinessLogic.lnHingePositions();
                return Json(_LN.UpdateHingePositions(pHingePositions));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetAllHingePositions()
        {
            try
            {
                BusinessLogic.lnHingePositions _LN = new BusinessLogic.lnHingePositions();
                return Json(_LN.GetAllHingePositions());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetHingePositionsById(int pId)
        {
            try
            {
                BusinessLogic.lnHingePositions _LN = new BusinessLogic.lnHingePositions();
                return Json(_LN.GetHingePositionsById(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult DeleteHingePositions(int pId)
        {
            try
            {
                BusinessLogic.lnHingePositions _LN = new BusinessLogic.lnHingePositions();
                return Json(_LN.DeleteHingePositions(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region HorizontalDivisions
        [Authorize] [HttpPost]
        public ActionResult InsertHorizontalDivisions(HorizontalDivisions pHorizontalDivisions)

        {
            try
            {
                BusinessLogic.lnHorizontalDivisions _LN = new BusinessLogic.lnHorizontalDivisions();
                return Json(_LN.InsertHorizontalDivisions(pHorizontalDivisions));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult UpdateHorizontalDivisions(HorizontalDivisions pHorizontalDivisions)

        {
            try
            {
                BusinessLogic.lnHorizontalDivisions _LN = new BusinessLogic.lnHorizontalDivisions();
                return Json(_LN.UpdateHorizontalDivisions(pHorizontalDivisions));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetAllHorizontalDivisions()
        {
            try
            {
                BusinessLogic.lnHorizontalDivisions _LN = new BusinessLogic.lnHorizontalDivisions();
                return Json(_LN.GetAllHorizontalDivisions());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetHorizontalDivisionsById(int pId)
        {
            try
            {
                BusinessLogic.lnHorizontalDivisions _LN = new BusinessLogic.lnHorizontalDivisions();
                return Json(_LN.GetHorizontalDivisionsById(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult DeleteHorizontalDivisions(int pId)
        {
            try
            {
                BusinessLogic.lnHorizontalDivisions _LN = new BusinessLogic.lnHorizontalDivisions();
                return Json(_LN.DeleteHorizontalDivisions(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region InsideEdgeProfile
        [Authorize] [HttpPost]
        public ActionResult InsertInsideEdgeProfile(InsideEdgeProfile pInsideEdgeProfile)

        {
            try
            {
                BusinessLogic.lnInsideEdgeProfile _LN = new BusinessLogic.lnInsideEdgeProfile();
                return Json(_LN.InsertInsideEdgeProfile(pInsideEdgeProfile));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult UpdateInsideEdgeProfile(InsideEdgeProfile pInsideEdgeProfile)

        {
            try
            {
                BusinessLogic.lnInsideEdgeProfile _LN = new BusinessLogic.lnInsideEdgeProfile();
                return Json(_LN.UpdateInsideEdgeProfile(pInsideEdgeProfile));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetAllInsideEdgeProfile()
        {
            try
            {
                BusinessLogic.lnInsideEdgeProfile _LN = new BusinessLogic.lnInsideEdgeProfile();
                return Json(_LN.GetAllInsideEdgeProfile());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetInsideEdgeProfileById(int pId)
        {
            try
            {
                BusinessLogic.lnInsideEdgeProfile _LN = new BusinessLogic.lnInsideEdgeProfile();
                return Json(_LN.GetInsideEdgeProfileById(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult DeleteInsideEdgeProfile(int pId)
        {
            try
            {
                BusinessLogic.lnInsideEdgeProfile _LN = new BusinessLogic.lnInsideEdgeProfile();
                return Json(_LN.DeleteInsideEdgeProfile(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region Join
        [Authorize] [HttpPost]
        public ActionResult InsertJoin(Join pJoin)

        {
            try
            {
                BusinessLogic.lnJoin _LN = new BusinessLogic.lnJoin();
                return Json(_LN.InsertJoin(pJoin));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult UpdateJoin(Join pJoin)

        {
            try
            {
                BusinessLogic.lnJoin _LN = new BusinessLogic.lnJoin();
                return Json(_LN.UpdateJoin(pJoin));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetAllJoin()
        {
            try
            {
                BusinessLogic.lnJoin _LN = new BusinessLogic.lnJoin();
                return Json(_LN.GetAllJoin());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetJoinById(int pId)
        {
            try
            {
                BusinessLogic.lnJoin _LN = new BusinessLogic.lnJoin();
                return Json(_LN.GetJoinById(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult DeleteJoin(int pId)
        {
            try
            {
                BusinessLogic.lnJoin _LN = new BusinessLogic.lnJoin();
                return Json(_LN.DeleteJoin(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region Material
        [Authorize] [HttpPost]
        public ActionResult InsertMaterial(Material pMaterial)

        {
            try
            {
                BusinessLogic.lnMaterial _LN = new BusinessLogic.lnMaterial();
                return Json(_LN.InsertMaterial(pMaterial));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult UpdateMaterial(Material pMaterial)

        {
            try
            {
                BusinessLogic.lnMaterial _LN = new BusinessLogic.lnMaterial();
                return Json(_LN.UpdateMaterial(pMaterial));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetAllMaterial()
        {
            try
            {
                BusinessLogic.lnMaterial _LN = new BusinessLogic.lnMaterial();
                return Json(_LN.GetAllMaterial());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetMaterialById(int pId)
        {
            try
            {
                BusinessLogic.lnMaterial _LN = new BusinessLogic.lnMaterial();
                return Json(_LN.GetMaterialById(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult DeleteMaterial(int pId)
        {
            try
            {
                BusinessLogic.lnMaterial _LN = new BusinessLogic.lnMaterial();
                return Json(_LN.DeleteMaterial(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region MaterialxBottomRail
        [Authorize] [HttpPost]
        public ActionResult InsertMaterialxBottomRail(MaterialxBottomRail pMaterialxBottomRail)

        {
            try
            {
                BusinessLogic.lnMaterialxBottomRail _LN = new BusinessLogic.lnMaterialxBottomRail();
                return Json(_LN.InsertMaterialxBottomRail(pMaterialxBottomRail));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult UpdateMaterialxBottomRail(MaterialxBottomRail pMaterialxBottomRail)

        {
            try
            {
                BusinessLogic.lnMaterialxBottomRail _LN = new BusinessLogic.lnMaterialxBottomRail();
                return Json(_LN.UpdateMaterialxBottomRail(pMaterialxBottomRail));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetAllMaterialxBottomRail()
        {
            try
            {
                BusinessLogic.lnMaterialxBottomRail _LN = new BusinessLogic.lnMaterialxBottomRail();
                return Json(_LN.GetAllMaterialxBottomRail());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetMaterialxBottomRailById(int pId)
        {
            try
            {
                BusinessLogic.lnMaterialxBottomRail _LN = new BusinessLogic.lnMaterialxBottomRail();
                return Json(_LN.GetMaterialxBottomRailById(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult DeleteMaterialxBottomRail(int pId)
        {
            try
            {
                BusinessLogic.lnMaterialxBottomRail _LN = new BusinessLogic.lnMaterialxBottomRail();
                return Json(_LN.DeleteMaterialxBottomRail(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region Order
        [Authorize] [HttpPost]
        public ActionResult InsertOrder(Order pOrder)

        {
            try
            {
                BusinessLogic.lnOrder _LN = new BusinessLogic.lnOrder();
                return Json(_LN.InsertOrder(pOrder));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult UpdateOrder(Order pOrder)

        {
            try
            {
                BusinessLogic.lnOrder _LN = new BusinessLogic.lnOrder();
                return Json(_LN.UpdateOrder(pOrder));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetAllOrder()
        {
            try
            {
                BusinessLogic.lnOrder _LN = new BusinessLogic.lnOrder();
                return Json(_LN.GetAllOrder());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetOrderById(int pId)
        {
            try
            {
                BusinessLogic.lnOrder _LN = new BusinessLogic.lnOrder();
                return Json(_LN.GetOrderById(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult DeleteOrder(int pId)
        {
            try
            {
                BusinessLogic.lnOrder _LN = new BusinessLogic.lnOrder();
                return Json(_LN.DeleteOrder(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region OutsideEdgeProfile
        [Authorize] [HttpPost]
        public ActionResult InsertOutsideEdgeProfile(OutsideEdgeProfile pOutsideEdgeProfile)

        {
            try
            {
                BusinessLogic.lnOutsideEdgeProfile _LN = new BusinessLogic.lnOutsideEdgeProfile();
                return Json(_LN.InsertOutsideEdgeProfile(pOutsideEdgeProfile));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult UpdateOutsideEdgeProfile(OutsideEdgeProfile pOutsideEdgeProfile)

        {
            try
            {
                BusinessLogic.lnOutsideEdgeProfile _LN = new BusinessLogic.lnOutsideEdgeProfile();
                return Json(_LN.UpdateOutsideEdgeProfile(pOutsideEdgeProfile));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetAllOutsideEdgeProfile()
        {
            try
            {
                BusinessLogic.lnOutsideEdgeProfile _LN = new BusinessLogic.lnOutsideEdgeProfile();
                return Json(_LN.GetAllOutsideEdgeProfile());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetOutsideEdgeProfileById(int pId)
        {
            try
            {
                BusinessLogic.lnOutsideEdgeProfile _LN = new BusinessLogic.lnOutsideEdgeProfile();
                return Json(_LN.GetOutsideEdgeProfileById(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult DeleteOutsideEdgeProfile(int pId)
        {
            try
            {
                BusinessLogic.lnOutsideEdgeProfile _LN = new BusinessLogic.lnOutsideEdgeProfile();
                return Json(_LN.DeleteOutsideEdgeProfile(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region Panel
        [Authorize] [HttpPost]
        public ActionResult InsertPanel(Panel pPanel)

        {
            try
            {
                BusinessLogic.lnPanel _LN = new BusinessLogic.lnPanel();
                return Json(_LN.InsertPanel(pPanel));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult UpdtePanel(Panel pPanel)

        {
            try
            {
                BusinessLogic.lnPanel _LN = new BusinessLogic.lnPanel();
                return Json(_LN.UpdatePanel(pPanel));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetAllPanel()
        {
            try
            {
                BusinessLogic.lnPanel _LN = new BusinessLogic.lnPanel();
                return Json(_LN.GetAllPanel());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetPanelById(int pId)
        {
            try
            {
                BusinessLogic.lnPanel _LN = new BusinessLogic.lnPanel();
                return Json(_LN.GetPanelById(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult DeletePanel(int pId)
        {
            try
            {
                BusinessLogic.lnPanel _LN = new BusinessLogic.lnPanel();
                return Json(_LN.DeletePanel(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region PanelMaterial
        [Authorize] [HttpPost]
        public ActionResult InsertPanelMaterial(PanelMaterial pPanelMaterial)

        {
            try
            {
                BusinessLogic.lnPanelMaterial _LN = new BusinessLogic.lnPanelMaterial();
                return Json(_LN.InsertPanelMaterial(pPanelMaterial));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult UpdatePanelMaterial(PanelMaterial pPanelMaterial)

        {
            try
            {
                BusinessLogic.lnPanelMaterial _LN = new BusinessLogic.lnPanelMaterial();
                return Json(_LN.UpdatePanelMaterial(pPanelMaterial));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetAllPanelMaterial()
        {
            try
            {
                BusinessLogic.lnPanelMaterial _LN = new BusinessLogic.lnPanelMaterial();
                return Json(_LN.GetAllPanelMaterial());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetPanelMaterialById(int pId)
        {
            try
            {
                BusinessLogic.lnPanelMaterial _LN = new BusinessLogic.lnPanelMaterial();
                return Json(_LN.GetPanelMaterialById(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult DeletePanelMaterial(int pId)
        {
            try
            {
                BusinessLogic.lnPanelMaterial _LN = new BusinessLogic.lnPanelMaterial();
                return Json(_LN.DeletePanelMaterial(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region Person
        [Authorize] [HttpPost]
        public ActionResult InsertPerson(Person pPerson)

        {
            try
            {
                BusinessLogic.lnPerson _LN = new BusinessLogic.lnPerson();
                return Json(_LN.InsertPerson(pPerson));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult UpdatePerson(Person pPerson)

        {
            try
            {
                BusinessLogic.lnPerson _LN = new BusinessLogic.lnPerson();
                return Json(_LN.UpdatePerson(pPerson));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetAllPerson()
        {
            try
            {
                BusinessLogic.lnPerson _LN = new BusinessLogic.lnPerson();
                return Json(_LN.GetAllPerson());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetPersonById(int pId)
        {
            try
            {
                BusinessLogic.lnPerson _LN = new BusinessLogic.lnPerson();
                return Json(_LN.GetPersonById(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult DeletePerson(int pId)
        {
            try
            {
                BusinessLogic.lnPerson _LN = new BusinessLogic.lnPerson();
                return Json(_LN.DeletePerson(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region Preparation
        [Authorize] [HttpPost]
        public ActionResult InsertPreparation(Preparation pPreparation)

        {
            try
            {
                BusinessLogic.lnPreparation _LN = new BusinessLogic.lnPreparation();
                return Json(_LN.InsertPreparation(pPreparation));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult UpdatePreparation(Preparation pPreparation)

        {
            try
            {
                BusinessLogic.lnPreparation _LN = new BusinessLogic.lnPreparation();
                return Json(_LN.UpdatePreparation(pPreparation));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetAllPreparation()
        {
            try
            {
                BusinessLogic.lnPreparation _LN = new BusinessLogic.lnPreparation();
                return Json(_LN.GetAllPreparation());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetPreparationByID(int pId)
        {
            try
            {
                BusinessLogic.lnPreparation _LN = new BusinessLogic.lnPreparation();
                return Json(_LN.GetPreparationById(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult DeletePreparation(int pId)
        {
            try
            {
                BusinessLogic.lnPreparation _LN = new BusinessLogic.lnPreparation();
                return Json(_LN.DeletePreparation(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region Status
        [Authorize] [HttpPost]
        public ActionResult InsertStatus(Status pStatus)

        {
            try
            {
                BusinessLogic.lnStatus _LN = new BusinessLogic.lnStatus();
                return Json(_LN.InsertStatus(pStatus));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult UpdateStatus(Status pStatus)

        {
            try
            {
                BusinessLogic.lnStatus _LN = new BusinessLogic.lnStatus();
                return Json(_LN.UpdateStatus(pStatus));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetAllStatus()
        {
            try
            {
                BusinessLogic.lnStatus _LN = new BusinessLogic.lnStatus();
                return Json(_LN.GetAllStatus());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetStatusById(int pId)
        {
            try
            {
                BusinessLogic.lnStatus _LN = new BusinessLogic.lnStatus();
                return Json(_LN.GetStatusById(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult DeleteStatus(int pId)
        {
            try
            {
                BusinessLogic.lnStatus _LN = new BusinessLogic.lnStatus();
                return Json(_LN.DeleteStatus(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region TopRail
        [Authorize] [HttpPost]
        public ActionResult InsertTopRail(TopRail pTopRail)

        {
            try
            {
                BusinessLogic.lnTopRail _LN = new BusinessLogic.lnTopRail();
                return Json(_LN.InsertTopRail(pTopRail));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult UpdateTopRail(TopRail pTopRail)

        {
            try
            {
                BusinessLogic.lnTopRail _LN = new BusinessLogic.lnTopRail();
                return Json(_LN.UpdateTopRail(pTopRail));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetAllTopRail()
        {
            try
            {
                BusinessLogic.lnTopRail _LN = new BusinessLogic.lnTopRail();
                return Json(_LN.GetAllTopRail());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetTopRailById(int pId)
        {
            try
            {
                BusinessLogic.lnTopRail _LN = new BusinessLogic.lnTopRail();
                return Json(_LN.GetTopRailById(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult DeleteTopRail(int pId)
        {
            try
            {
                BusinessLogic.lnTopRail _LN = new BusinessLogic.lnTopRail();
                return Json(_LN.DeleteTopRail(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region TopRailxHorizontalDivisions
        [Authorize] [HttpPost]
        public ActionResult InsertTopRailxHorizontalDivisions(TopRailxHorizontalDivisions pTopRailxHorizontalDivisions)

        {
            try
            {
                BusinessLogic.lnTopRailxHorizontalDivisions _LN = new BusinessLogic.lnTopRailxHorizontalDivisions();
                return Json(_LN.InsertTopRailxHorizontalDivisions(pTopRailxHorizontalDivisions));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult UpdateTopRailxHorizontalDivisions(TopRailxHorizontalDivisions pTopRailxHorizontalDivisions)

        {
            try
            {
                BusinessLogic.lnTopRailxHorizontalDivisions _LN = new BusinessLogic.lnTopRailxHorizontalDivisions();
                return Json(_LN.UpdateTopRailxHorizontalDivisions(pTopRailxHorizontalDivisions));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetAllTopRailxHorizontalDivisions()
        {
            try
            {
                BusinessLogic.lnTopRailxHorizontalDivisions _LN = new BusinessLogic.lnTopRailxHorizontalDivisions();
                return Json(_LN.GetAllTopRailxHorizontalDivisions());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetTopRailxHorizontalDivisionsById(int pId)
        {
            try
            {
                BusinessLogic.lnTopRailxHorizontalDivisions _LN = new BusinessLogic.lnTopRailxHorizontalDivisions();
                return Json(_LN.GetTopRailxHorizontalDivisionsById(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult DeleteTopRailxHorizontalDivisions(int pId)
        {
            try
            {
                BusinessLogic.lnTopRailxHorizontalDivisions _LN = new BusinessLogic.lnTopRailxHorizontalDivisions();
                return Json(_LN.DeleteTopRailxHorizontalDivisions(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region TopRailxJoin
        [Authorize] [HttpPost]
        public ActionResult InsertTopRailxJoin(TopRailxJoin pTopRailxJoin)

        {
            try
            {
                BusinessLogic.lnTopRailxJoin _LN = new BusinessLogic.lnTopRailxJoin();
                return Json(_LN.InsertTopRailxJoin(pTopRailxJoin));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult UpdateTopRailxJoin(TopRailxJoin pTopRailxJoin)

        {
            try
            {
                BusinessLogic.lnTopRailxJoin _LN = new BusinessLogic.lnTopRailxJoin();
                return Json(_LN.UpdateTopRailxJoin(pTopRailxJoin));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetAllTopRailxJoin()
        {
            try
            {
                BusinessLogic.lnTopRailxJoin _LN = new BusinessLogic.lnTopRailxJoin();
                return Json(_LN.GetAllTopRailxJoin());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetTopRailxJoinById(int pId)
        {
            try
            {
                BusinessLogic.lnTopRailxJoin _LN = new BusinessLogic.lnTopRailxJoin();
                return Json(_LN.GetTopRailxJoinById(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult DeleteTopRailxJoin(int pId)
        {
            try
            {
                BusinessLogic.lnTopRailxJoin _LN = new BusinessLogic.lnTopRailxJoin();
                return Json(_LN.DeleteTopRailxJoin(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region TopRailxVerticalDivisions
        [Authorize] [HttpPost]
        public ActionResult InsertTopRailxVerticalDivisions(TopRailxVerticalDivisions pTopRailxVerticalDivisions)

        {
            try
            {
                BusinessLogic.lnTopRailxVerticalDivisions _LN = new BusinessLogic.lnTopRailxVerticalDivisions();
                return Json(_LN.InsertTopRailxVerticalDivisions(pTopRailxVerticalDivisions));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult UpdateTopRailxVerticalDivisions(TopRailxVerticalDivisions pTopRailxVerticalDivisions)

        {
            try
            {
                BusinessLogic.lnTopRailxVerticalDivisions _LN = new BusinessLogic.lnTopRailxVerticalDivisions();
                return Json(_LN.UpdateTopRailxVerticalDivisions(pTopRailxVerticalDivisions));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetAllTopRailxVerticalDivisions()
        {
            try
            {
                BusinessLogic.lnTopRailxVerticalDivisions _LN = new BusinessLogic.lnTopRailxVerticalDivisions();
                return Json(_LN.GetAllTopRailxVerticalDivisions());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult GetTopRailxVerticalDivisionsById(int pId)
        {
            try
            {
                BusinessLogic.lnTopRailxVerticalDivisions _LN = new BusinessLogic.lnTopRailxVerticalDivisions();
                return Json(_LN.GetTopRailxVerticalDivisionsById(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize] [HttpPost]
        public ActionResult DeleteTopRailxVerticalDivisions(int pId)
        {
            try
            {
                BusinessLogic.lnTopRailxVerticalDivisions _LN = new BusinessLogic.lnTopRailxVerticalDivisions();
                return Json(_LN.DeleteTopRailxVerticalDivisions(pId));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region Type
        #endregion

        #region VerticalDivisions
        #endregion

    }

}

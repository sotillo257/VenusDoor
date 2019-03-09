﻿using System;
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
        #region metodoComentado
//             try
//            {
//                ViewBag.OrderSummary = "active";
//                BusinessLogic.lnDoors _LNd = new BusinessLogic.lnDoors();
//                if (Session["UserID"] == null)
//                {
//                    if (Id > 0)
//                    {
//                        var Door = _LNd.GetDoorsById(Id.Value);
//        var serializar1 = new System.Web.Script.Serialization.JavaScriptSerializer();
//        ViewBag.Door = serializar1.Serialize(Door);
//                    }
//                    return View();
//}
//                else
//                {
//                    if (Id > 0)
//                    {
//                        var Door = _LNd.GetDoorsById(Id.Value);
//var serializar1 = new System.Web.Script.Serialization.JavaScriptSerializer();
//ViewBag.Door = serializar1.Serialize(Door);
//                    }
//                BusinessLogic.lnOrder _LNOrder = new BusinessLogic.lnOrder();
//int userID = (int)Session["UserID"];
//int idU = userID;
//var orderList = _LNOrder.GetOrderByUser(idU);
//ViewBag.Listo = orderList.Where(x => x.Status.Id == 4).LastOrDefault();
//Order item = ViewBag.Listo;
//                if (item == null)
//                {
//                    return View();
//                }
//                else if (item.Status.Id == 4)
//                {
//                    BusinessLogic.lnDoorsxUser _LN = new BusinessLogic.lnDoorsxUser();
//List<DoorsxUser> xDoorsU = _LN.GetAllDoorsxUser();
//List<DoorsxUser> doorByOrder = xDoorsU.Where(x => x.Order.Id == item.Id).ToList();
//ViewBag.xUserDoors = doorByOrder;
//                    var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
//ViewBag.ListDoorsxUser = serializar.Serialize(doorByOrder);
//                        DoorsxUser LastDoor = doorByOrder.OrderByDescending(x => x.ModificationDate).FirstOrDefault();
//ViewBag.LstD = LastDoor;
                        
//                   return View();
//                }
//                else
//                {
//                    return View();
//                }
//                }
//            }
//            catch (Exception ex)
//            {
//                return View("Error");
//            }    
        #endregion

        [Authorize]
        public ActionResult Index(int? Id)
        {
            try
            {
                ViewBag.OrderSummary = "active";
                if (Session["UserID"] != null)
                {
                    BusinessLogic.lnDoorsxUser DU = new BusinessLogic.lnDoorsxUser();
                    BusinessLogic.lnOrder _LNOrder = new BusinessLogic.lnOrder();
                    BusinessLogic.lnDoorxOrder _LnDoorOrder = new BusinessLogic.lnDoorxOrder();
                    Order item = _LNOrder.GetOrderByUser((int)Session["UserID"]).Where(x => x.Status.Id == 4).FirstOrDefault();
                    if (item != null)
                    {
                        item.DoorxUser = DU.GetAllDoorsxUser().Where(x => x.Order.Id == item.Id).FirstOrDefault();
                        item.DoorxUser.DoorsxOrder = _LnDoorOrder.GetAllDoorxOrderByDoorxUser(item.DoorxUser.Id);
                        ViewBag.Order = item;
                        var serializar1 = new System.Web.Script.Serialization.JavaScriptSerializer();
                        ViewBag.JsDoor = serializar1.Serialize(item);
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

        [HttpPost]
        public ActionResult GetOrderSumary()
        {
            try
                {

                BusinessLogic.lnDoorsxUser DU = new BusinessLogic.lnDoorsxUser();
                BusinessLogic.lnOrder _LNOrder = new BusinessLogic.lnOrder();
                BusinessLogic.lnDoorxOrder _LnDoorOrder = new BusinessLogic.lnDoorxOrder();
                Order item = _LNOrder.GetOrderByUser((int)Session["UserID"]).Where(x => x.Status.Id == 4).FirstOrDefault();
                item.DoorxUser = DU.GetAllDoorsxUser().Where(x => x.Order.Id == item.Id).FirstOrDefault();
                item.DoorxUser.DoorsxOrder = _LnDoorOrder.GetAllDoorxOrderByDoorxUser(item.DoorxUser.Id);
               
                return Json(new { Order = item }, JsonRequestBehavior.AllowGet);
                             
                }
                catch
                {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
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
                else if(orderList.Status.Id == 4)
                {
                    var xDoorsU = _LNDOR.GetAllDoorsxUser();
                    DoorsxUser LastDoorr = xDoorsU.Where(x => x.Order.Id == orderList.Id).OrderByDescending(x => x.ModificationDate).FirstOrDefault();
                    return Json(new { LastDoor = LastDoorr}, JsonRequestBehavior.AllowGet);
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

        [HttpPost]
        public ActionResult DeleteItem(int itemID, int orderid)
        {
            if(Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                try
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
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }         
        }

        [HttpPost]
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

        public void SendOrderToUser(Order CompleteOrder)
        {
            try
            {           
            int userID = (int)Session["UserID"];
            int idU = userID;
            var date = DateTime.Now;
            BusinessLogic.lnUser _LN = new BusinessLogic.lnUser();
            User use = _LN.GetUserById(idU);
            BusinessLogic.lnPerson _LNPR = new BusinessLogic.lnPerson();
            Person per = _LNPR.GetPersonById(use.Person.Id);

            string NameUser = per.Name;
            string To = use.Email;
            MailMessage mail = new MailMessage();
            SmtpClient SmtpServer = new SmtpClient("smtp.ionos.com");
            mail.From = new MailAddress("orders@venuscabinetdoors.com", "Venus Cabinet Doors");
            mail.Bcc.Add(new MailAddress(To));

            mail.Subject = "Order summary";
   
            BusinessLogic.lnDoorsxUser _LNDU = new BusinessLogic.lnDoorsxUser();
            List<DoorsxUser> allD = _LNDU.GetAllDoorsxUser();
            List<DoorsxUser> puertas = allD.Where(x => x.Order.Id == CompleteOrder.Id).ToList();
            ViewBag.TusPuertas = puertas;

            string cuerpo = "<p>Dear " + NameUser + ",</p>"+
            "<p>Please review the estimate below.Feel free to contact us if you have any questions.<br>"+
            "We look forward to working with you.</p>"+
            "<p>Thanks for your business!"+
            "<br><b>Venus Doors<b></p>"+
            "<table width='400px' style='border: solid 1px;border-radius: 16px;padding: 15px;background: #e6e0c0; '>" +
                "<thead>"+
                "<tr style='text-align:center'>" +
                    "<p>------ Order ref: #" + CompleteOrder.Id + " ------</p>" +
                "</tr>" +
                "<tr style='text-align:left'>" +
                    "<p>Estimate date: "+ date + "</p>"+
                "</tr>"+
                "<tr style='text-align:left'>" +                    
                    "<p>Quantity of products: " + CompleteOrder.Quantity + "</p>" +                    
                "</tr>" +
                "<tr style='text-align:left'>" +
                    "<p>SubTotal: $" + CompleteOrder.SubTotal + "</p>" +
                "</tr>" +
                "<tr style='text-align:left'>" +
                    "<p>Tax: $" + CompleteOrder.Tax + "</p>" +
                "</tr>" +
                "<tr style='text-align:left'>" +
                    "<p>Total: $" + CompleteOrder.Total + "</p>" +
                "</tr>" +
                "<tr style='text-align:center'>" +
                    "<p>---------------------------</p>" +
                "</tr>" +
                "</thead>" +
            "</table>";
            cuerpo += "<table>"+
                    "<thead>"+
                        "<tr>"+
                            "<th>Door Style</th>"+
                            "<th>Material</th>"+
                            "<th>Rails</th>"+
                            "<th>Stiles Width</th>"+
                            "<th>Grade</th>"+
                            "<th>Join</th>"+
                            "<th>Outside Profile</th>"+
                            "<th>Inside Profile</th>"+
                            "<th>Width</th>"+
                            "<th>Height</th>"+
                            "<th>Quantity</th>"+
                            "<th>Item Cost</th>"+
                            "<th>SubTotal</th>"+
                        "</tr>"+
                    "</thead>"+
            "<tbody>";
            foreach (DoorsxUser item in ViewBag.TusPuertas)
            {
                cuerpo += "<tr>"+
                        "<td>" + item.DoorStyle.Description + "</td>"+
                        "<td>" + item.Material.Description + "</td>"+
                        "<td>" + item.TopRail.Description + "</td>"+
                        "<td>" + item.BottomRail.Description + "</td>"+
                        "<td>" + item.Preparation.Description + "</td>"+
                        "<td>" + item.Join.Description + "</td>"+
                        "<td>" + item.OutsideEdgeProfile.Description + "</td>"+
                        "<td>" + item.InsideEdgeProfile.Description + "</td>"+
                        "<td>" + item.Width + "</td>" +
                        "<td>" + item.Height + "</td>"+
                        "<td>" + item.Quantity + "</td>"+
                        "<td>$" + item.ItemCost + "</td>"+
                        "<td>$" + item.SubTotal + "</td>"+
                "</tr>";
            }
            cuerpo += "</tbody></table>";            
            mail.Body = cuerpo;
            //mail.Attachments.Add(new Attachment("C:/Users/jesus/Source/Repos/ordersummary.pdf"));
            mail.IsBodyHtml = true;
            SmtpServer.Port = 587;
            SmtpServer.Credentials = new System.Net.NetworkCredential("orders@venuscabinetdoors.com", "venusCD2019*");
            SmtpServer.EnableSsl = true;
            SmtpServer.Send(mail);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public void SendOrderToManage(Order CompleteOrder)
        {
            int userID = (int)Session["UserID"];
            int idU = userID;
            var date = DateTime.Now;
            BusinessLogic.lnUser _LN = new BusinessLogic.lnUser();
            User use = _LN.GetUserById(idU);
            BusinessLogic.lnPerson _LNPR = new BusinessLogic.lnPerson();
            Person per = _LNPR.GetPersonById(use.Person.Id);

            string NameUser = per.Name;
            string Lastuser = per.Lastname;
            string To = use.Email;
            MailMessage mail = new MailMessage();
            SmtpClient SmtpServer = new SmtpClient("smtp.ionos.com");
            mail.From = new MailAddress("orders@venuscabinetdoors.com", "A new order has been received");
            mail.To.Add(new MailAddress("orders@venuscabinetdoors.com"));
            mail.Subject = "New order by "+ NameUser + " " + Lastuser;

            BusinessLogic.lnDoorsxUser _LNDU = new BusinessLogic.lnDoorsxUser();
            List<DoorsxUser> allD = _LNDU.GetAllDoorsxUser();
            List<DoorsxUser> puertas = allD.Where(x => x.Order.Id == CompleteOrder.Id).ToList();
            ViewBag.TusPuertas = puertas;

            string cuerpo = "<p>Please review the estimate below.Feel free to contact us if you have any questions."+
                "<br>We look forward to working with you.</p>"+
                "<p>Thanks for your business!<br><b>Venus Doors<b></p>"+
                "<table width='400px' style='border: solid 1px;border-radius: 16px;padding: 15px;background: #e6e0c0; '>" +
                "<thead>" +
                "<tr style='text-align:center'>" +
                    "<p>------ Order ref: #" + CompleteOrder.Id + " ------</p>" +
                "</tr>" +
                "<tr style='text-align:left'>" +
                    "<p>Name : " + per.Name + " "+ per.Lastname +"</p>" +
                "</tr>" +
                "<tr style='text-align:left'>" +
                    "<p>Phone number: " + per.Telephone + "</p>" +
                "</tr>" +
                "<tr style='text-align:left'>" +
                    "<p>Email: " + use.Email + "</p>" +
                "</tr>" +
                "<tr style='text-align:left'>" +
                    "<p>Address: " + per.Direction + "</p>" +
                "</tr>" +
                "<tr style='text-align:left'>" +
                    "<p>Estimate date: " + date + "</p>" +
                "</tr>" +
                "<tr style='text-align:left'>" +
                    "<p>Quantity of products: " + CompleteOrder.Quantity + "</p>" +
                "</tr>" +
                "<tr style='text-align:left'>" +
                    "<p>SubTotal: $" + CompleteOrder.SubTotal + "</p>" +
                "</tr>" +
                "<tr style='text-align:left'>" +
                    "<p>Tax: $" + CompleteOrder.Tax + "</p>" +
                "</tr>" +
                "<tr style='text-align:left'>" +
                    "<p>Total: $" + CompleteOrder.Total + "</p>" +
                "</tr>" +
                "<tr style='text-align:center'>" +
                    "<p>---------------------------</p>" +
                "</tr>" +
                "</thead>" +
            "</table>";
            cuerpo += "<table>"+
                    "<thead>"+
                        "<tr>"+
                            "<th>Door Style</th>"+
                            "<th>Material</th>"+
                            "<th>Rails</th>"+
                            "<th>Stiles Width</th>"+
                            "<th>Grade</th>"+
                            "<th>Join</th>"+
                            "<th>Outside Profile</th>"+
                            "<th>Inside Profile</th>"+
                            "<th>Vertical Divisions</th>"+
                            "<th>Horizontal Divisions</th>"+
                            "<th>Hinge Direction</th>"+
                            "<th>Drill</th>"+
                            "<th>Width</th>"+
                            "<th>Height</th>"+
                            "<th>Opening Measurement</th>"+
                            "<th>Quantity</th>"+
                            "<th>Item Cost</th>"+
                            "<th>SubTotal</th>"+
                        "</tr>"+
                    "</thead>"+
            "<tbody>";
            foreach (DoorsxUser item in ViewBag.TusPuertas)
            {
                cuerpo += "<tr>"+
                    "<td>" + item.DoorStyle.Description + "</td>"+
                    "<td>" + item.Material.Description + "</td>"+
                    "<td>" + item.TopRail.Description + "</td>"+
                    "<td>" + item.BottomRail.Description + "</td>"+
                    "<td>" + item.Preparation.Description + "</td>"+
                    "<td>" + item.Join.Description + "</td>"+
                    "<td>" + item.OutsideEdgeProfile.Description + "</td>"+
                    "<td>" + item.InsideEdgeProfile.Description + "</td>"+
                    "<td>" + item.VerticalDivisions.Quantity + "</td>"+
                    "<td>" + item.HorizontalDivisions.Quantity + "</td>"+
                    "<td>" + item.HingeDirection.Direction + "</td>"+                    
                    "<td>" + item.isDrill + "</td>"+
                    "<td>" + item.Width + "</td>"+
                    "<td>" + item.Height + "</td>"+
                    "<td>" + item.IsOpeningMeasurement + "</td>"+
                    "<td>" + item.Quantity + "</td>"+
                    "<td>$" + item.ItemCost + "</td>"+
                    "<td>$" + item.SubTotal + "</td>"+
               "</tr>";
            }
            cuerpo += "</tbody></table>";
            mail.Body = cuerpo;   
            mail.IsBodyHtml = true;
            SmtpServer.Port = 587;
            SmtpServer.Credentials = new System.Net.NetworkCredential("orders@venuscabinetdoors.com", "venusCD2019*");
            SmtpServer.EnableSsl = true;
            SmtpServer.Send(mail);
            
        }

        [HttpPost]
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
                    Order CompleteOrder = _LNO.GetOrderById(ord.Id);
                    CompleteOrder.Observations = ord.Observations;
                    if(ord.ShippingAddress.Id != 0)
                    {
                        CompleteOrder.ShippingAddress = ord.ShippingAddress;
                    }                   
                    //SendOrderToUser(CompleteOrder);
                    //SendOrderToManage(CompleteOrder);                    
                    CloseOrder(CompleteOrder);
                    return Json(true, JsonRequestBehavior.AllowGet);
                    
                }
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
        }

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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
        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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
        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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
        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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
        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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
        [HttpPost]
        public ActionResult InsertDoorStylexInsideEdgeProfile(DoorStylexInsideEdgeProfile pDoorStylexInsideEdgeProfile)

        {
            try
            {
                BusinessLogic.lnDoorStylexInsideEdgeProfile _LN = new BusinessLogic.lnDoorStylexInsideEdgeProfile();
                return Json(_LN.InsertDoorStylexInsideEdgeProfile(pDoorStylexInsideEdgeProfile));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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
        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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
        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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
        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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
        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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
        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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
        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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
        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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
        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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
        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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
        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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
        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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
        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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
        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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
        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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
        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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
        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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
        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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
        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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
        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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
        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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
        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

        [HttpPost]
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

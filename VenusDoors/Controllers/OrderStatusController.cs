using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Model;
using System.IO;
using iTextSharp.text;
using iTextSharp.text.pdf;

namespace VenusDoors.Controllers
{
    public class OrderStatusController : Controller
    {
        // GET: OrderStatus
        [Authorize]
        public ActionResult Index()
        {
            try
            {
                if (Session["UserID"] == null)
                {
                   // var x = System.Configuration.ConfigurationManager.ConnectionStrings["ssss"].ConnectionString;
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                   // DescargarPDF(1032);
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
                        BusinessLogic.lnDoorxOrder _LNOrder = new BusinessLogic.lnDoorxOrder();
                        doorByOrder.DoorsxOrder = _LNOrder.GetAllDoorxOrderByDoorxUser(doorByOrder.Id);
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


        [Authorize]
        [HttpPost]
        public ActionResult GetDoorsByOrder(int idOrder)
        {
            try
            {
                BusinessLogic.lnDoorsxUser _LN = new BusinessLogic.lnDoorsxUser();
                DoorsxUser xDoors = _LN.GetAllDoorsxUser().Where(x => x.Order.Id == idOrder).ToList().FirstOrDefault();
                BusinessLogic.lnDoorxOrder Ord = new BusinessLogic.lnDoorxOrder();
                xDoors.DoorsxOrder = Ord.GetAllDoorxOrderByDoorxUser(xDoors.Id);
                if (xDoors.DoorsxOrder.Sum(x => x.Descuento) > 0)
                {
                    xDoors.DescuentoActivos = true;
                }
                // ViewBag.DoorsOrder = doorsByOrder;
                return Json(xDoors);
            }
            catch (Exception ex )
            {
                return Json(null);
            }
            

        }

        [Authorize]
        [HttpPost]
        public ActionResult DescargarOrderPDF(int idOrder)
        {
            try
            {
               // BusinessLogic.lnOrder LNOrder = new BusinessLogic.lnOrder();
                return Json(DescargarPDF(idOrder), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }

        }

        public string DescargarPDF(int IdOrder)
        {
            var doc1 = new Document();
            try
            {
                string path = Server.MapPath("~/Content/PDF");
                foreach (var item in Directory.GetFiles(path, "*.*"))
                {
                   System.IO.File.SetAttributes(item, FileAttributes.Normal);
                    System.IO.File.Delete(item);
                }

                BusinessLogic.lnOrder LNOrder = new BusinessLogic.lnOrder();
                BusinessLogic.lnUser LNUser = new BusinessLogic.lnUser();
                BusinessLogic.lnCompany LNCOmpany = new BusinessLogic.lnCompany();
                BusinessLogic.lnDoorsxUser LNDoorUser = new BusinessLogic.lnDoorsxUser();
                BusinessLogic.lnDoorxOrder LNDoorOrder = new BusinessLogic.lnDoorxOrder();
                BusinessLogic.lnPerson LNPerson = new BusinessLogic.lnPerson();
                Order order = LNOrder.GetOrderById(IdOrder);
                User user = LNUser.GetUserById(order.User.Id);
                Person person = LNPerson.GetPersonById(user.Person.Id);
                Company company = LNCOmpany.GetCompanyById(user.Company.Id);
                DoorsxUser doorsxUser = LNDoorUser.GetAllDoorsxUser().Where(x => x.Order.Id == IdOrder).FirstOrDefault();
                List<DoorxOrder> DO = LNDoorOrder.GetAllDoorxOrderByDoorxUser(doorsxUser.Id);


                //use a variable to let my code fit across the page...

                Image image = null;
                string ruta = "/Content/PDF" + "/" + IdOrder + ".pdf";
                PdfWriter.GetInstance(doc1, new FileStream(path + "/" + IdOrder + ".pdf", FileMode.Create));
                try
                {                   
                    string rutaImagen = Server.MapPath("~" + company.Logo);
                    image = Image.GetInstance(rutaImagen);
                }
                catch (Exception)
                {                  
                    string rutaImagen = Server.MapPath("~/Content/img/Venus_Doors11.png");
                    image = Image.GetInstance(rutaImagen);
                }
               

                doc1.Open();


                Chunk c = new Chunk("Order #" +IdOrder+" \n",
                                   FontFactory.GetFont("Arial", 18));

                PdfPTable table = new PdfPTable(4);

                //PdfPCell cell = new PdfPCell(new Phrase("Header spanning 3 columns"));             
                //cell.HorizontalAlignment = 0; //0=Left, 1=Centre, 2=Right
                //cell.Border = 0;
                //table.AddCell(cell);

                table.TotalWidth = 526f;

                //fix the absolute width of the table

                table.LockedWidth = true;

                //relative col widths in proportions - 1/3 and 2/3

                float[] widths = new float[] { 1f, 1f, 1f, 1f };

                table.SetWidths(widths);

                table.HorizontalAlignment = 0;

                //leave a gap before and after the table

                //table.SpacingBefore = 20f;

                //table.SpacingAfter = 30f;

                PdfPCell cell = new PdfPCell(new Phrase("General Doors Specifications", FontFactory.GetFont("Arial", 12)));
                cell.Colspan = 4;
                cell.HorizontalAlignment = 1;
                cell.Border = 0;
                cell.PaddingBottom = 10f;
                table.AddCell(cell);


                cell = new PdfPCell(new Phrase("Wood Species: " + doorsxUser.Material.Description, FontFactory.GetFont("Arial", 9)));
                cell.HorizontalAlignment = 0; //0=Left, 1=Centre, 2=Right
                cell.Border = 0;
                cell.PaddingBottom = 5f;
                table.AddCell(cell);

                cell = new PdfPCell(new Phrase("Door Style: " + doorsxUser.DoorStyle.Description, FontFactory.GetFont("Arial", 9)));
                cell.HorizontalAlignment = 0; //0=Left, 1=Centre, 2=Right
                cell.Border = 0;
                cell.PaddingBottom = 5f;
                table.AddCell(cell);

                string overlay = (doorsxUser.isOverlay == true) ? "Overlay Door Type" : "Inset Door Type";
                cell = new PdfPCell(new Phrase("Door Place: " + overlay, FontFactory.GetFont("Arial", 9)));
                cell.HorizontalAlignment = 0; //0=Left, 1=Centre, 2=Right
                cell.Border = 0;
                cell.PaddingBottom = 5f;
                table.AddCell(cell);

                cell = new PdfPCell(new Phrase("Stile Width: " + doorsxUser.TopRail.Description, FontFactory.GetFont("Arial", 9)));
                cell.HorizontalAlignment = 0; //0=Left, 1=Centre, 2=Right
                cell.Border = 0;
                cell.PaddingBottom = 5f;
                table.AddCell(cell);

                cell = new PdfPCell(new Phrase("Rail Width: " + doorsxUser.BottomRail.Description, FontFactory.GetFont("Arial", 9)));
                cell.HorizontalAlignment = 0; //0=Left, 1=Centre, 2=Right
                cell.Border = 0;
                cell.PaddingBottom = 5f;
                table.AddCell(cell);

                cell = new PdfPCell(new Phrase("Inside Profile: " + doorsxUser.InsideEdgeProfile.Description, FontFactory.GetFont("Arial", 9)));
                cell.HorizontalAlignment = 0; //0=Left, 1=Centre, 2=Right
                cell.Border = 0;
                cell.PaddingBottom = 5f;
                table.AddCell(cell);

                cell = new PdfPCell(new Phrase("Outside Profile: " + doorsxUser.OutsideEdgeProfile.Description, FontFactory.GetFont("Arial", 9)));
                cell.HorizontalAlignment = 0; //0=Left, 1=Centre, 2=Right
                cell.Border = 0;
                cell.PaddingBottom = 5f;
                table.AddCell(cell);

                cell = new PdfPCell(new Phrase("Door Assembly: " + doorsxUser.Join.Description, FontFactory.GetFont("Arial", 9)));
                cell.HorizontalAlignment = 0; //0=Left, 1=Centre, 2=Right
                cell.Border = 0;
                cell.PaddingBottom = 5f;
                table.AddCell(cell);

                cell = new PdfPCell(new Phrase("Panel Material: " + doorsxUser.PanelMaterial.Description, FontFactory.GetFont("Arial", 9)));
                cell.HorizontalAlignment = 0; //0=Left, 1=Centre, 2=Right
                cell.Border = 0;
                cell.PaddingBottom = 5f;
                table.AddCell(cell);

                string OpeningMeasurement = (doorsxUser.IsOpeningMeasurement == true) ? "Yes" : "No";
                cell = new PdfPCell(new Phrase("Opening Measurement: " + OpeningMeasurement, FontFactory.GetFont("Arial", 9)));
                cell.HorizontalAlignment = 0; //0=Left, 1=Centre, 2=Right
                cell.Border = 0;
                cell.PaddingBottom = 5f;
                table.AddCell(cell);

                cell = new PdfPCell(new Phrase("Vertical Divisions: " + doorsxUser.VerticalDivisions.Quantity.ToString(), FontFactory.GetFont("Arial", 9)));
                cell.HorizontalAlignment = 0; //0=Left, 1=Centre, 2=Right
                cell.Border = 0;
                cell.PaddingBottom = 5f;
                table.AddCell(cell);


                cell = new PdfPCell(new Phrase("Horizontal Divisions: " + doorsxUser.HorizontalDivisions.Quantity.ToString(), FontFactory.GetFont("Arial", 9)));
                cell.HorizontalAlignment = 0; //0=Left, 1=Centre, 2=Right
                cell.Border = 0;
                cell.PaddingBottom = 5f;
                table.AddCell(cell);

                string Drill = (doorsxUser.isDrill == true) ? "Yes (" + doorsxUser.HingeDirection.Direction + ")" : "No";
                cell = new PdfPCell(new Phrase("Drill: " + Drill, FontFactory.GetFont("Arial", 9)));
                cell.HorizontalAlignment = 0; //0=Left, 1=Centre, 2=Right
                cell.Border = 0;
                cell.PaddingBottom = 5f;
                table.AddCell(cell);

                string FingerPull = (doorsxUser.isFingerPull == true) ? "Yes" : "No";
                cell = new PdfPCell(new Phrase("Finger Pull: " + FingerPull, FontFactory.GetFont("Arial", 9)));
                cell.HorizontalAlignment = 0; //0=Left, 1=Centre, 2=Right
                cell.Border = 0;
                cell.PaddingBottom = 5f;
                table.AddCell(cell);

                cell = new PdfPCell(new Phrase(" ", FontFactory.GetFont("Arial", 9)));
                cell.HorizontalAlignment = 0; //0=Left, 1=Centre, 2=Right
                cell.Border = 0;
                cell.PaddingBottom = 5f;
                table.AddCell(cell);

                cell = new PdfPCell(new Phrase(" ", FontFactory.GetFont("Arial", 9)));
                cell.HorizontalAlignment = 0; //0=Left, 1=Centre, 2=Right
                cell.Border = 0;
                cell.PaddingBottom = 5f;
                table.AddCell(cell);

                image.ScaleAbsoluteWidth(150);
                image.ScaleAbsoluteHeight(68);

                Paragraph p = new Paragraph();
                int descu = 9;
                if (DO.Sum(x => x.Descuento) > 0)
                {
                    doorsxUser.DescuentoActivos = true;
                    descu = 10;
                }
                PdfPTable TableDoor = new PdfPTable(descu);
                TableDoor.TotalWidth = 526f;
                TableDoor.LockedWidth = true;
                TableDoor.HorizontalAlignment = 0;
                TableDoor.SpacingBefore = 20f;
                TableDoor.SpacingAfter = 30f;
                cell = new PdfPCell(new Phrase("Door List", FontFactory.GetFont("Arial", 12)));
                cell.Colspan = descu;
                cell.HorizontalAlignment = 1;
                cell.Border = 0;
                cell.PaddingBottom = 10f;
                TableDoor.AddCell(cell);
                cell = new PdfPCell(new Phrase("Door", FontFactory.GetFont("Arial", 10)));
                TableDoor.AddCell(cell);
                cell = new PdfPCell(new Phrase("Quantity", FontFactory.GetFont("Arial", 10)));
                TableDoor.AddCell(cell);
                cell = new PdfPCell(new Phrase("Width", FontFactory.GetFont("Arial", 10)));
                TableDoor.AddCell(cell);
                cell = new PdfPCell(new Phrase("Height", FontFactory.GetFont("Arial", 10)));
                TableDoor.AddCell(cell);
                cell = new PdfPCell(new Phrase("Panel", FontFactory.GetFont("Arial", 10)));
                TableDoor.AddCell(cell);
                cell = new PdfPCell(new Phrase("Door Type", FontFactory.GetFont("Arial", 10)));
                TableDoor.AddCell(cell);
                cell = new PdfPCell(new Phrase("Door Option", FontFactory.GetFont("Arial", 10)));
                TableDoor.AddCell(cell);
                cell = new PdfPCell(new Phrase("Item Cost", FontFactory.GetFont("Arial", 10)));
                TableDoor.AddCell(cell);
                if (doorsxUser.DescuentoActivos)
                {
                    cell = new PdfPCell(new Phrase("Discount", FontFactory.GetFont("Arial", 10)));
                    TableDoor.AddCell(cell);
                }
                cell = new PdfPCell(new Phrase("Sub Total", FontFactory.GetFont("Arial", 10)));
                TableDoor.AddCell(cell);

                foreach (DoorxOrder item in DO)
                {
                    string rutaImagenDoor = Server.MapPath("~" + item.Picture);
                    Image imagen = Image.GetInstance(rutaImagenDoor);
                    TableDoor.AddCell(imagen);
                    cell = new PdfPCell(new Phrase(item.Quantity.ToString().Replace(',', '.'), FontFactory.GetFont("Arial", 10)));
                    TableDoor.AddCell(cell);
                    string dw = (item.DecimalsWidth.Id == 2) ? "" : item.DecimalsWidth.Description;
                    string wit = item.Width.ToString().Split(',')[0] + " " + dw;
                    cell = new PdfPCell(new Phrase(wit, FontFactory.GetFont("Arial", 10)));
                    TableDoor.AddCell(cell);

                    string dh = (item.DecimalsHeight.Id == 2) ? "" : item.DecimalsHeight.Description;
                    string hei = item.Height.ToString().Split(',')[0] + " " + dh;
                    cell = new PdfPCell(new Phrase(hei, FontFactory.GetFont("Arial", 10)));
                    TableDoor.AddCell(cell);
                    cell = new PdfPCell(new Phrase(item.Panel.Description, FontFactory.GetFont("Arial", 10)));
                    TableDoor.AddCell(cell);
                    cell = new PdfPCell(new Phrase(item.DoorType.Description, FontFactory.GetFont("Arial", 10)));
                    TableDoor.AddCell(cell);
                    cell = new PdfPCell(new Phrase(item.DoorOption.Description, FontFactory.GetFont("Arial", 10)));
                    TableDoor.AddCell(cell);
                    cell = new PdfPCell(new Phrase("$" + item.ItemCost.ToString().Replace(',', '.'), FontFactory.GetFont("Arial", 10)));
                    TableDoor.AddCell(cell);
                    if (doorsxUser.DescuentoActivos)
                    {
                        cell = new PdfPCell(new Phrase(item.Descuento.ToString() + "%", FontFactory.GetFont("Arial", 10)));
                        TableDoor.AddCell(cell);
                    }
                    cell = new PdfPCell(new Phrase("$" + item.SubTotal.ToString().Replace(',', '.'), FontFactory.GetFont("Arial", 10)));
                    TableDoor.AddCell(cell);
                }
                Chunk sub = new Chunk("Sub-Total: $" + order.SubTotal.ToString().Replace(',', '.') + " \n",
                                 FontFactory.GetFont("Arial", 14));
                Chunk tax = new Chunk("Tax: $" + order.Tax.ToString().Replace(',', '.') + " \n",
                                FontFactory.GetFont("Arial", 14));
                Chunk total = new Chunk("Total Price: $" + order.Total.ToString().Replace(',', '.') + " \n",
                                FontFactory.GetFont("Arial", 16));
                Paragraph footer = new Paragraph();
                footer.Add(sub);
                footer.Add(tax);
                footer.Add(total);
                footer.Alignment = 2;

                PdfPTable TableUser = new PdfPTable(1);
                TableUser.TotalWidth = 526f;
                TableUser.LockedWidth = true;
                TableUser.HorizontalAlignment = 0;
                TableUser.SpacingBefore = 20f;
                TableUser.SpacingAfter = 30f;
                cell = new PdfPCell(new Phrase("Name: " + person.Name + " " + person.Lastname + " \n",
                                 FontFactory.GetFont("Arial", 10)));
                cell.Border = 0;
                TableUser.AddCell(cell);
                cell = new PdfPCell(new Phrase("Email: " + user.Email + " \n",
                                FontFactory.GetFont("Arial", 10)));
                cell.Border = 0;
                TableUser.AddCell(cell);
                cell = new PdfPCell(new Phrase("Telephone: " + person.Telephone + " \n",
                                FontFactory.GetFont("Arial", 10)));
                cell.Border = 0;
                TableUser.AddCell(cell);


                PdfPTable TableHeader = new PdfPTable(2);
                TableHeader.TotalWidth = 526f;
                TableHeader.LockedWidth = true;
                TableHeader.HorizontalAlignment = 0;
                TableHeader.SpacingBefore = 20f;
                TableHeader.SpacingAfter = 30f;

                cell = new PdfPCell(image);
                cell.HorizontalAlignment = 0; //0=Left, 1=Centre, 2=Right
                cell.Border = 0;
                TableHeader.AddCell(cell);
                p.Add(c);
                p.Add(order.CreationDate.ToString("MM/dd/yyyy") + " \n");


                p.Alignment = 2;
                cell = new PdfPCell(new Phrase(p));
                cell.HorizontalAlignment = 2; //0=Left, 1=Centre, 2=Right
                cell.Border = 0;
                TableHeader.AddCell(cell);



                //  doc1.Add(p);
                // doc1.Add(image);
                doc1.Add(TableHeader);
                doc1.Add(TableUser);
                doc1.Add(table);
                doc1.Add(TableDoor);
                doc1.Add(footer);
                doc1.Close();
                //-------------------------------
                return ruta;
                //  return Json(true);
            }
            catch (Exception ex)
            {
                doc1.Close();
                return null;
                // return Json(false);
            }

        }
        // 
    }
} 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Model;
using System.Net.Mail;
using System.IO;
using ExcelDataReader;
using System.Data;

namespace VenusDoors.Controllers
{
    public class ConfiDoorController : Controller
    {

        //String path;
        //MailMessage mail = new MailMessage();

        // GET: ConfiDoor
        public ActionResult Index(int? Id)
        {
            ViewBag.ConfiDoor = "active";
            BusinessLogic.lnDoors _LN = new BusinessLogic.lnDoors();
            if (Id > 0)
            {
                var Door = _LN.GetDoorsById(Id.Value);
                var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
                ViewBag.Door = serializar.Serialize(Door);
            }
            return View();
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
        public ActionResult GetAllVerticalDivisions()
        {
            try
            {
                BusinessLogic.lnVerticalDivisions _LN = new BusinessLogic.lnVerticalDivisions();
                return Json(_LN.GetAllVerticalDivisions());
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
        public ActionResult GetPrices(RailThickness RailThick, Material pMaterial, DoorStyle pDoorstyle)
        {
            try
            {
                BusinessLogic.lnDoorsPrices _DP = new BusinessLogic.lnDoorsPrices();
                List<DoorsPrices> xDoorsP = _DP.GetAllDoorsPrices();
                List<DoorsPrices> xDP = xDoorsP.Where(x => x.RailThickness.Id == RailThick.Id && x.Material.Id == pMaterial.Id && x.DoorStyle.Id == pDoorstyle.Id).ToList();
                ViewBag.d = xDP;
                //foreach (DoorsPrices i in ViewBag.d)
                //{
                //    System.Web.HttpContext.Current.Session["BasePrice"] = i.BasePrice;
                //    System.Web.HttpContext.Current.Session["AddPrice"] = i.AdditionalSFPrice;
                //}
                return Json(xDP);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
            
        }

        [HttpPost]
        public ActionResult UpdateOrderExist(Order item, DoorsxUser pDoorsxUser, Order Ord)
        {
            BusinessLogic.lnOrder _LNUPor = new BusinessLogic.lnOrder();
            item.Quantity = item.Quantity + pDoorsxUser.Quantity;
            item.SubTotal = item.SubTotal + pDoorsxUser.SubTotal;
            item.Tax = item.Tax + Ord.Tax;
            item.Total = item.Total + Ord.Total;
            return Json(_LNUPor.UpdateOrder(item));
        }

        [HttpPost]
        public ActionResult UploadExcel()
        {

            try
            {
                if (Session["UserID"] == null)
                {
                    return Json(0);
                }
                else
                {
                    if (Request.Files.Count > 0)
                    {
                        var file = Request.Files[0];
                        var fileName = Path.GetFileName(file.FileName);
                        // ExcelDataReader works with the binary Excel file, so it needs a FileStream
                        // to get started. This is how we avoid dependencies on ACE or Interop:
                        Stream stream = file.InputStream;

                        // We return the interface, so that
                        IExcelDataReader reader = null;


                        if (file.FileName.EndsWith(".xls"))
                        {
                            reader = ExcelReaderFactory.CreateBinaryReader(stream);
                        }
                        else if (file.FileName.EndsWith(".xlsx"))
                        {
                            reader = ExcelReaderFactory.CreateOpenXmlReader(stream);
                        }
                        else
                        {

                        }
                        List<DoorsxUser> door = new List<DoorsxUser>();
                        reader.Read();
                        while (reader.Read())
                        {
                            if (reader[0].ToString() != "Select")
                            {
                                door.Add(new DoorsxUser()
                                {
                                    DoorStyle = new DoorStyle() { Id = 0, Description = reader[0].ToString() },
                                    Material = new Material() { Id = 0, Description = reader[1].ToString() },
                                    TopRail = new TopRail() { Id = 0, Description = reader[2].ToString() },
                                    BottomRail = new BottomRail() { Id = 0, Description = reader[3].ToString() },
                                    Panel = new Panel() { Id = 0, Description = reader[4].ToString() },
                                    PanelMaterial = new PanelMaterial() { Id = 0, Description = reader[5].ToString() },
                                    Preparation = new Preparation() { Id = 0, Description = reader[6].ToString() },
                                    Join = new Join() { Id = 0, Description = reader[7].ToString() },
                                    OutsideEdgeProfile = new OutsideEdgeProfile() { Id = 0, Description = reader[8].ToString() },
                                    InsideEdgeProfile = new InsideEdgeProfile() { Id = 0, Description = reader[9].ToString() },
                                    VerticalDivisions = new VerticalDivisions() { Id = 0, Quantity = int.Parse(reader[10].ToString()), },
                                    HorizontalDivisions = new HorizontalDivisions() { Id = 0, Quantity = int.Parse(reader[11].ToString()), },
                                    Width = decimal.Parse(reader[12].ToString()),
                                    Height = decimal.Parse(reader[13].ToString()),
                                    isDrill = (reader[14].ToString() == "Drill")? true :false,
                                    HingeDirection = new HingeDirection() { Id = 0, Direction = reader[15].ToString(), },
                                    HingePositions = new HingePositions() { Id = 0, Position1 = reader[16].ToString(), Position2 = reader[17].ToString(), },
                                    IsOpeningMeasurement = (reader[18].ToString() == "Opening") ? true : false,
                                    Status = new Status() { Id = 1 },
                                    CreationDate = DateTime.Now,
                                    ModificationDate = DateTime.Now,
                                    CreatorUser = (int)Session["UserID"],
                                    ModificationUser = (int)Session["UserID"],
                                    Picture = "",
                                    ProfilePicture = "",

                                });
                            }

                        }
                        reader.Close();
                        
                        //reader.IsFirstRowAsColumnNames = true;


                        //DataSet result = reader..AsDataSet();


                    }
                }
            }
            catch (Exception)
            {
                return Json(0);
            }

            return Json(1);

        }

        public ActionResult InsertDoorsxUser(DoorsxUser pDoorsxUser, HingePositions HingeP, Order Ord)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                BusinessLogic.lnOrder _LNOrder = new BusinessLogic.lnOrder();
                BusinessLogic.lnHingePositions _LNHP = new BusinessLogic.lnHingePositions();
                int userID = (int)Session["UserID"];
                int idU = userID;
               
                var orderList = _LNOrder.GetOrderByUser(idU);
                ViewBag.Listo = orderList;
                Order item = ViewBag.Listo;
                if (item.Status == null)
                {
                    try
                    {
                        
                        Order neworder = new Order()
                        {                            
                            User = new Model.User() { Id = userID },
                            Status = new Model.Status() { Id = 4 },
                            Type = new Model.Type() { Id = 1 },
                            Quantity = pDoorsxUser.Quantity,
                            SubTotal = Ord.SubTotal,
                            Tax = Ord.Tax,
                            Total = Ord.Total,
                            CreationDate = DateTime.Now,
                            CreatorUser = userID,
                            ModificationDate = DateTime.Now,
                            ModificationUser = userID
                        };

                        int IdOrder = _LNOrder.InsertOrder(neworder);
                        neworder.Id = IdOrder;

                        HingePositions newhp = new HingePositions()
                        {
                            Status = new Model.Status() { Id = 1 },
                            Position1 = HingeP.Position1,
                            Position2 = HingeP.Position2,
                            Position3 = HingeP.Position3,
                            Position4 = HingeP.Position4,
                            Position5 = HingeP.Position5,
                            CreationDate = DateTime.Now,
                            CreatorUser = userID,
                            ModificationDate = DateTime.Now,
                            ModificationUser = userID
                        };

                        int IdHingeP = _LNHP.InsertHingePositions(newhp);
                        newhp.Id = IdHingeP;

                        pDoorsxUser.CreatorUser = userID;
                        pDoorsxUser.ModificationUser = userID;
                        pDoorsxUser.CreationDate = DateTime.Now;
                        pDoorsxUser.ModificationDate = DateTime.Now;
                        pDoorsxUser.Order = neworder;
                        pDoorsxUser.HingePositions = newhp;
                        pDoorsxUser.User.Id = idU;
                        BusinessLogic.lnDoorsxUser _LN = new BusinessLogic.lnDoorsxUser();
                        var OrDoor = _LN.InsertDoorsxUser(pDoorsxUser);
                        return Json(true, JsonRequestBehavior.AllowGet);
                    }
                    catch
                    {
                        return Json(false, JsonRequestBehavior.AllowGet);
                    }
                }
                else if (item.Status.Id == 4)
                {
                    try
                    {
                        HingePositions newhp = new HingePositions()
                        {
                            Status = new Model.Status() { Id = 1 },
                            Position1 = HingeP.Position1,
                            Position2 = HingeP.Position2,
                            Position3 = HingeP.Position3,
                            Position4 = HingeP.Position4,
                            Position5 = HingeP.Position5,
                            CreationDate = DateTime.Now,
                            CreatorUser = userID,
                            ModificationDate = DateTime.Now,
                            ModificationUser = userID
                        };

                        int IdHingeP = _LNHP.InsertHingePositions(newhp);
                        newhp.Id = IdHingeP;

                        UpdateOrderExist(item, pDoorsxUser, Ord);
                        pDoorsxUser.CreatorUser = userID;
                        pDoorsxUser.ModificationUser = userID;
                        pDoorsxUser.CreationDate = DateTime.Now;
                        pDoorsxUser.ModificationDate = DateTime.Now;
                        pDoorsxUser.HingePositions = newhp;
                        pDoorsxUser.Order = item;
                        pDoorsxUser.User.Id = idU;

                        BusinessLogic.lnDoorsxUser _LN = new BusinessLogic.lnDoorsxUser();
                        var updaOrDoor = (_LN.InsertDoorsxUser(pDoorsxUser));
                        return Json(true, JsonRequestBehavior.AllowGet);
                    }
                    catch
                    {
                        return Json(false, JsonRequestBehavior.AllowGet);
                    }
                }
                else
                {
                    try
                    {
                        Order neworder = new Order()
                        {
                            User = new Model.User() { Id = userID },
                            Status = new Model.Status() { Id = 4 },
                            Type = new Model.Type() { Id = 1 },
                            Quantity = pDoorsxUser.Quantity,
                            SubTotal = Ord.SubTotal,
                            Tax = Ord.Tax,
                            Total = Ord.Total,
                            CreationDate = DateTime.Now,
                            CreatorUser = userID,
                            ModificationDate = DateTime.Now,
                            ModificationUser = userID
                        };

                        int IdOrder = _LNOrder.InsertOrder(neworder);

                        HingePositions newhp = new HingePositions()
                        {
                            Status = new Model.Status() { Id = 1 },
                            Position1 = HingeP.Position1,
                            Position2 = HingeP.Position2,
                            Position3 = HingeP.Position3,
                            Position4 = HingeP.Position4,
                            Position5 = HingeP.Position5,
                            CreationDate = DateTime.Now,
                            CreatorUser = userID,
                            ModificationDate = DateTime.Now,
                            ModificationUser = userID
                        };

                        int IdHingeP = _LNHP.InsertHingePositions(newhp);
                        newhp.Id = IdHingeP;
                        neworder.Id = IdOrder;
                        pDoorsxUser.CreatorUser = userID;
                        pDoorsxUser.ModificationUser = userID;
                        pDoorsxUser.CreationDate = DateTime.Now;
                        pDoorsxUser.ModificationDate = DateTime.Now;
                        pDoorsxUser.Order = neworder;
                        pDoorsxUser.HingePositions = newhp;
                        pDoorsxUser.User.Id = idU;
                        BusinessLogic.lnDoorsxUser _LN = new BusinessLogic.lnDoorsxUser();
                        var OrDoor = _LN.InsertDoorsxUser(pDoorsxUser);
                        return Json(true, JsonRequestBehavior.AllowGet);
                    }
                    catch
                    {
                        return Json(false, JsonRequestBehavior.AllowGet);
                    }
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

    }
}


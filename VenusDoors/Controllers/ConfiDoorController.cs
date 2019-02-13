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
        public ActionResult GetPricesDoor(RailThickness RailThick, Material pMaterial, Panel pPanel)
        {
            try
            {
                BusinessLogic.lnDoorsPrices _DP = new BusinessLogic.lnDoorsPrices();
                List<DoorsPrices> xDoorsP = _DP.GetAllDoorsPrices();
                List<DoorsPrices> xDP = xDoorsP.Where(x => x.RailThickness.Id == RailThick.Id && x.Material.Id == pMaterial.Id && x.DoorStyle.Id == pPanel.Id).ToList();
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
                                    IsOpeningMeasurement = (reader[16].ToString() == "Opening") ? true : false,
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
                        
                        foreach (var item in door)
                        {
                            BusinessLogic.lnDoorStyle _LN = new BusinessLogic.lnDoorStyle();
                            var _listDoorStyle = _LN.GetAllDoorStyle().Where(x => x.Description.Trim() == item.DoorStyle.Description.Trim()).FirstOrDefault();
                            if (_listDoorStyle != null)
                            {
                                item.DoorStyle.Id = _listDoorStyle.Id;
                            }

                            BusinessLogic.lnMaterial _LNMaterial = new BusinessLogic.lnMaterial();
                            var _listMateriale = _LNMaterial.GetAllMaterial().Where(x => x.Description.Trim() == item.Material.Description.Trim()).FirstOrDefault();
                            if (_listMateriale != null)
                            {
                                item.Material.Id = _listMateriale.Id;
                            }
                            BusinessLogic.lnTopRail _LNTopRail = new BusinessLogic.lnTopRail();
                            var _listTopRail = _LNTopRail.GetAllTopRail().Where(x => x.Description.Trim() == item.TopRail.Description.Trim()).FirstOrDefault();
                            if (_listTopRail != null)
                            {
                                item.TopRail.Id = _listTopRail.Id;
                            }
                            BusinessLogic.lnBottomRail _LNBottomRail = new BusinessLogic.lnBottomRail();
                            var _listBottomRail = _LNBottomRail.GetAllBottomRail().Where(x => x.Description.Trim() == item.BottomRail.Description.Trim()).FirstOrDefault();
                            if (_listBottomRail != null)
                            {
                                item.BottomRail.Id = _listBottomRail.Id;
                            }
                            BusinessLogic.lnPanel _LNPanel = new BusinessLogic.lnPanel();
                            var _listPanel = _LNPanel.GetAllPanel().Where(x => x.Description.Trim() == item.Panel.Description.Trim()).FirstOrDefault();
                            if (_listPanel != null)
                            {
                                item.Panel.Id = _listPanel.Id;
                            }
                            BusinessLogic.lnPanelMaterial _LNPanelMaterial = new BusinessLogic.lnPanelMaterial();
                            var _listPanelMaterial = _LNPanelMaterial.GetAllPanelMaterial().Where(x => x.Description.Trim() == item.Panel.Description.Trim()).FirstOrDefault();
                            if (_listPanelMaterial != null)
                            {
                                item.PanelMaterial.Id = _listPanelMaterial.Id;
                            }
                            BusinessLogic.lnPreparation _LNPreparation = new BusinessLogic.lnPreparation();
                            var _listPreparation = _LNPreparation.GetAllPreparation().Where(x => x.Description.Trim() == item.Preparation.Description.Trim()).FirstOrDefault();
                            if (_listPreparation != null)
                            {
                                item.Preparation.Id = _listPreparation.Id;
                            }
                            BusinessLogic.lnJoin _LNJoin = new BusinessLogic.lnJoin();
                            var _listJoin = _LNJoin.GetAllJoin().Where(x => x.Description.Trim() == item.Join.Description.Trim()).FirstOrDefault();
                            if (_listJoin != null)
                            {
                                item.Join.Id = _listJoin.Id;
                            }
                            BusinessLogic.lnOutsideEdgeProfile _LNOutsideEdgeProfile = new BusinessLogic.lnOutsideEdgeProfile();
                            var _listOutsideEdgeProfile = _LNOutsideEdgeProfile.GetAllOutsideEdgeProfile().Where(x => x.Description.Trim() == item.OutsideEdgeProfile.Description.Trim()).FirstOrDefault();
                            if (_listOutsideEdgeProfile != null)
                            {
                                item.OutsideEdgeProfile.Id = _listOutsideEdgeProfile.Id;
                            }
                            BusinessLogic.lnInsideEdgeProfile _LNInsideEdgeProfile = new BusinessLogic.lnInsideEdgeProfile();
                            var _listInsideEdgeProfile = _LNInsideEdgeProfile.GetAllInsideEdgeProfile().Where(x => x.Description.Trim() == item.InsideEdgeProfile.Description.Trim()).FirstOrDefault();
                            if (_listInsideEdgeProfile != null)
                            {
                                item.InsideEdgeProfile.Id = _listInsideEdgeProfile.Id;
                            }
                            BusinessLogic.lnVerticalDivisions _LNVerticalDivisions = new BusinessLogic.lnVerticalDivisions();
                            var _listVerticalDivisions = _LNVerticalDivisions.GetAllVerticalDivisions().Where(x => x.Quantity == item.VerticalDivisions.Quantity).FirstOrDefault();
                            if (_listVerticalDivisions != null)
                            {
                                item.VerticalDivisions.Id = _listVerticalDivisions.Id;
                            }
                            BusinessLogic.lnHorizontalDivisions _LNHorizontalDivisions = new BusinessLogic.lnHorizontalDivisions();
                            var _listHorizontalDivisions = _LNHorizontalDivisions.GetAllHorizontalDivisions().Where(x => x.Quantity == item.VerticalDivisions.Quantity).FirstOrDefault();
                            if (_listHorizontalDivisions != null)
                            {
                                item.HorizontalDivisions.Id = _listHorizontalDivisions.Id;
                            }
                            BusinessLogic.lnHingeDirection _LNHingeDirection = new BusinessLogic.lnHingeDirection();
                            var _listHingeDirection = _LNHingeDirection.GetAllHingeDirection().Where(x => x.Direction == item.HingeDirection.Direction).FirstOrDefault();
                            if (_listHingeDirection != null)
                            {
                                item.HingeDirection.Id = _listHingeDirection.Id;
                            }

                            item.HingePositions = CalcularPosicionHing(item);
                            item.ProfilePicture = BuscarProfilePicture(item.OutsideEdgeProfile.Id,item.InsideEdgeProfile.Id,item.Panel.Id);





                        }
                        reader.Close();
                        
                        //reader.IsFirstRowAsColumnNames = true;


                        //DataSet result = reader..AsDataSet();


                    }
                }
            }
            catch (Exception ex)
            {
                return Json(0);
            }

            return Json(1);

        }

        #region Pictures
        public string BuscarProfilePicture(int pOutsideEdgeProfile,int pInsideEdgeProfile,int pPanel) {
            string respuesta = "/Content/img/Profile/img11.png";
            if (pPanel == 5)
            {
                respuesta = FlatPanel(pOutsideEdgeProfile, pInsideEdgeProfile);
            }
            if (pPanel == 6)
            {
                respuesta = FlatPanelBeaded(pOutsideEdgeProfile, pInsideEdgeProfile);
            }
            if (pPanel == 2)
            {
                respuesta = RaisedPanel(pOutsideEdgeProfile, pInsideEdgeProfile);
            }
            return respuesta;
        }
        public string FlatPanel(int Outside, int Inside) {
            string ProfileUrl = "img11.png";
            string urlFolder = "/Content/img/Profile/";
            if (Outside == 13)
            {
                if (Inside == 4)
                {
                    ProfileUrl = "-Double_Roman_Ogee_ogee_flat_panel.png";
                }
                else if (Inside == 5)
                {
                    ProfileUrl = "-Double_Roman_Ogee_Reba_flat_panel.png";
                }
                else if (Inside == 3)
                {
                    ProfileUrl = "-Double_Roman_Ogee_Shaker_22_flat_panel.png";
                }
                else if (Inside == 7)
                {
                    ProfileUrl = "-Double_Roman_Ogee_shaker_goove_flatpanel.png";
                }
            }
            if (Outside == 2)
            {
                if (Inside == 4)
                {
                    ProfileUrl = "-Fingerpull_ogee_flat_panel.png";
                }
                else if (Inside == 5)
                {
                    ProfileUrl = "-Fingerpull_Reba_flat_panel.png";
                }
                else if (Inside == 3)
                {
                    ProfileUrl = "-Fingerpull_Shaker22_flat_panel.png";
                }
                else if (Inside == 7)
                {
                    ProfileUrl = "-Finger_pull_shaker_goove_flat_panel.png";
                }
            }
            if (Outside == 17)
            {
                if (Inside == 4)
                {
                    ProfileUrl = "-Half_Reba_ogee_flat_panel.png";
                }
                else if (Inside == 5)
                {
                    ProfileUrl = "-Half_Reba_Reba_flat_panel.png";
                }
                else if (Inside == 3)
                {
                    ProfileUrl = "-Half_Reba_Shaker_22_flat_panel.png";
                }
                else if (Inside == 7)
                {
                    ProfileUrl = "-Half_Reba_shaker_goove_flat_panel.png";
                }
            }
            if (Outside == 11)
            {

                if (Inside == 4)
                {
                    ProfileUrl = "-Little_bone_ogee_flat_panel.png";
                }
                else if (Inside == 5)
                {
                    ProfileUrl = "-Little_bone_Reba_flat_panel.png";
                }
                else if (Inside == 3)
                {
                    ProfileUrl = "-Little_bone_Shaker_22_flat_panel.png";
                }
                else if (Inside == 7)
                {
                    ProfileUrl = "-Little_bone_shaker_goove_flat_panel.png";
                }
            }
            if (Outside == 5)
            {
                if (Inside == 4)
                {
                    ProfileUrl = "-Reba_ogee_flat_panel.png";
                }
                else if (Inside == 5)
                {
                    ProfileUrl = "-Reba_Reba_flat_panel.png";
                }
                else if (Inside == 3)
                {
                    //  ProfileUrl = "-Reba_Shaker_22_flat_panel.png";
                }
                else if (Inside == 7)
                {
                    ProfileUrl = "-Reba_shaker_goove_flat_panel.png";
                }
            }
            if (Outside == 6)
            {
                if (Inside == 4)
                {
                    ProfileUrl = "-Shaker_ogee_flat_panel.png";
                }
                else if (Inside == 5)
                {
                    ProfileUrl = "-Shaker_Reba_flat_panel.png";
                }
                else if (Inside == 3)
                {
                    ProfileUrl = "-Shaker_Shaker_22_flat_panel.png";
                }
                else if (Inside == 7)
                {
                    ProfileUrl = "-Shaker_shaker_goove_flat_panel.png";
                }
            }
            return urlFolder + ProfileUrl;
        }
        public string FlatPanelBeaded(int Outside, int Inside) {
            string ProfileUrl = "img11.png";
            string urlFolder = "/Content/img/Profile/";
            if (Outside == 13)
            {
                if (Inside == 4)
                {
                    ProfileUrl = "-Double_Roman_Ogee_ogee_flat_panel_beaded.png";
                }
                else if (Inside == 5)
                {
                    ProfileUrl = "-Double_Roman_Ogee_Reba_flat_panel_beaded.png";
                }
                else if (Inside == 3)
                {
                    ProfileUrl = "-Double_Roman_Ogee_Shaker_22_flat_panel_beaded.png";
                }
                else if (Inside == 7)
                {
                    ProfileUrl = "-Double_Roman_Ogee_shaker_goove_flat_panel_beaded.png";
                }
            }
            if (Outside == 2)
            {
                if (Inside == 4)
                {
                    ProfileUrl = "-Fingerpull_ogee_flat_panel_beaded.png";
                }
                else if (Inside == 5)
                {
                    ProfileUrl = "-Fingerpull_Reba_flat_panel_beaded.png";
                }
                else if (Inside == 3)
                {
                    ProfileUrl = "-Fingerpull_Shaker22_flat_panel_beaded.png";
                }
                else if (Inside == 7)
                {
                    ProfileUrl = "-Finger_pull_shaker_goove_flat_panel_beaded.png";
                }
            }
            if (Outside == 17)
            {
                if (Inside == 4)
                {
                    ProfileUrl = "-Half_Reba_ogee_flat_panel_beaded.png";
                }
                else if (Inside == 5)
                {
                    ProfileUrl = "-Half_Reba_Reba_flat_panel_beaded.png";
                }
                else if (Inside == 3)
                {
                    ProfileUrl = "-Half_Reba_Shaker_22_flat_panel_beaded.png";
                }
                else if (Inside == 7)
                {
                    ProfileUrl = "-Half_Reba_shaker_goove_flat_panel_beaded.png";
                }
            }
            if (Outside == 4)
            {

                if (Inside == 4)
                {
                    ProfileUrl = "-Little_bone_ogee_flat_panel_beaded.png";
                }
                else if (Inside == 5)
                {
                    ProfileUrl = "-Little_bone_Reba_flat_panel_beaded.png";
                }
                else if (Inside == 3)
                {
                    ProfileUrl = "-Little_bone_Shaker_22_flat_panel_beaded.png";
                }
                else if (Inside == 7)
                {
                    ProfileUrl = "-Little_bone_shaker_goove_flat_panel_beaded.png";
                }
            }
            if (Outside == 5)
            {
                if (Inside == 4)
                {
                    ProfileUrl = "-Reba_ogee_flat_panel_beaded.png";
                }
                else if (Inside == 5)
                {
                    ProfileUrl = "-Reba_Reba_flat_panel_beaded.png";
                }
                else if (Inside == 3)
                {
                    ProfileUrl = "-Reba_Shaker_22_flat_panel_beaded.png";
                }
                else if (Inside == 7)
                {
                    ProfileUrl = "-Reba_shaker_goove_flat_panel_beaded.png";
                }
            }
            if (Outside == 6)
            {
                if (Inside == 4)
                {
                    ProfileUrl = "-Shaker_ogee_flat_panel_beaded.png";
                }
                else if (Inside == 5)
                {
                    ProfileUrl = "-Shaker_Reba_flat_panel_beaded.png";
                }
                else if (Inside == 3)
                {
                    ProfileUrl = "-Shaker_Shaker_22_flat_panel_beaded.png";
                }
                else if (Inside == 7)
                {
                    ProfileUrl = "-Shaker_shaker_goove_flat_panel_beaded.png";
                }
            }
            return urlFolder + ProfileUrl;
        }
        public string RaisedPanel(int Outside,int Inside)
        {
            string ProfileUrl = "img11.png";
            string urlFolder = "/Content/img/Profile/";
            if (Outside == 13)
            {
                if (Inside == 4)
                {
                    ProfileUrl = "-Double_Roman_Ogee_ogee_raised_panel.png";
                }
                else if (Inside == 5)
                {
                    ProfileUrl = "-Double_Roman_Ogee_Reba_raised_panel.png";
                }
                else if (Inside == 3)
                {
                    ProfileUrl = "-Double_Roman_Ogee_Shaker_22_raised_panel.png";
                }
                else if (Inside == 7)
                {
                    ProfileUrl = "-Double_Roman_Ogee_shaker_goove_raised_panel.png";
                }
            }
            if (Outside == 2)
            {
                if (Inside == 4)
                {
                    ProfileUrl = "-Fingerpull_ogee_raised_panel.png";
                }
                else if (Inside == 5)
                {
                    ProfileUrl = "-Fingerpull_Reba_raised_panel.png";
                }
                else if (Inside == 3)
                {
                    ProfileUrl = "-FingerPull-Shaker22-RaisedPanel.png";
                }
                else if (Inside == 7)
                {
                    ProfileUrl = "-Finger-pull-shaker-goove-raised-panel.png";
                }
            }
            if (Outside == 17)
            {
                if (Inside == 4)
                {
                    ProfileUrl = "-Half_Reba_ogee_raised_panel.png";
                }
                else if (Inside == 5)
                {
                    ProfileUrl = "-Half_Reba_Reba_raised_panel.png";
                }
                else if (Inside == 3)
                {
                    ProfileUrl = "-Half_Reba_Shaker_22_raised_panel.png";
                }
                else if (Inside == 7)
                {
                    ProfileUrl = "-Half_Reba_shaker_goove_raised_panel.png";
                }
            }
            if (Outside == 4)
            {

                if (Inside == 4)
                {
                    ProfileUrl = "-Little_bone_ogee_raised_panel.png";
                }
                else if (Inside == 5)
                {
                    ProfileUrl = "-Little_bone_Reba_raised_panel.png";
                }
                else if (Inside == 3)
                {
                    ProfileUrl = "-Little_bone_Shaker_22_raised_panel.png";
                }
                else if (Inside == 7)
                {
                    ProfileUrl = "-Little_bone_shaker_goove_raised_panel.png";
                }
            }
            if (Outside == 5)
            {
                if (Inside == 4)
                {
                    ProfileUrl = "-Reba_ogee_raised_panel.png";
                }
                else if (Inside == 5)
                {
                    ProfileUrl = "-Reba_Reba_raised_panel.png";
                }
                else if (Inside == 3)
                {
                    ProfileUrl = "-Reba_Shaker_22_raised_panel.png";
                }
                else if (Inside == 7)
                {
                    ProfileUrl = "-Reba_shaker_goove_raised_panel.png";
                }
            }
            if (Outside == 6)
            {
                if (Inside == 4)
                {
                    ProfileUrl = "-Shaker_ogee_raised_panel.png";
                }
                else if (Inside == 5)
                {
                    ProfileUrl = "-Shaker_Reba_raised_panel.png";
                }
                else if (Inside == 3)
                {
                    ProfileUrl = "-Shaker_Shaker_22_raised_panel.png";
                }
                else if (Inside == 7)
                {
                    ProfileUrl = "-Shaker_shaker_goove_raised_panel.png";
                }
            }
            return urlFolder + ProfileUrl;
        }

        public string BuscarDoorPicture(DoorsxUser pDoorxUser)
        {
            string respuesta = "/Content/img/Profile/img11.png";
            if (pDoorxUser.Panel.Id == 5)
            {
                respuesta = FlatPanelDoor(pDoorxUser);
            }
            if (pDoorxUser.Panel.Id == 6)
            {
                respuesta = "/Content/img/Doors/Cabinet Vector-17.png";
            }
            if (pDoorxUser.Panel.Id == 2)
            {
                respuesta = RaisedPanelDoor(pDoorxUser);
            }
            return respuesta;
        }

        public string FlatPanelDoor(DoorsxUser pDoorxUser)
        {
            var stile = pDoorxUser.TopRail.Id;
            var rail = pDoorxUser.BottomRail.Id;
            string DoorUrl = "img11.png";
            string urlFolder = "/Content/img/Doors/";
            if (pDoorxUser.Join.Id == 1) {
                if (pDoorxUser.DoorStyle.Id == 1008)
                {
                    if (stile == 3 && rail == 3)
                    {
                        DoorUrl = "Cabinet Vector-01.png";
                    }
                    
                }
                if (pDoorxUser.DoorStyle.Id == 1002)
                {
                    if (stile == 3 && rail == 3)
                    {
                        DoorUrl = "Cabinet Vector-02.png";
                    }
                    else if (stile == 1 && rail == 1)
                    {
                        DoorUrl = "Cabinet Vector-14.png";
                    }
                     
                }
                if (pDoorxUser.DoorStyle.Id == 1004)
                {
                    if (stile == 3 && rail == 3)
                    {
                        DoorUrl = "Cabinet Vector-05.png";
                    }
                    else if (stile == 1 && rail == 1)
                    {
                        DoorUrl = "Cabinet Vector-06.png";
                    }
                     
                }
                if (pDoorxUser.DoorStyle.Id == 1009)
                {
                    if (stile == 3 && rail == 3)
                    {
                        DoorUrl = "Cabinet Vector-13.png";
                    }
                    
                }

            } else if (pDoorxUser.Join.Id == 2) {
                DoorUrl = "Cabinet Vector-08.png";
                
            }
            return urlFolder + DoorUrl;
        }
        public string RaisedPanelDoor(DoorsxUser pDoorxUser)
        {
            var stile = pDoorxUser.TopRail.Id;
            var rail = pDoorxUser.BottomRail.Id;
            string DoorUrl = "img11.png";
            string urlFolder = "/Content/img/Doors/";
            if (pDoorxUser.Join.Id == 1) {
                if (stile == 3 && rail == 3)
                {
                    if (pDoorxUser.DoorStyle.Id == 1008)
                    {

                        var inside = pDoorxUser.InsideEdgeProfile.Id;
                        var outside = pDoorxUser.OutsideEdgeProfile.Id;
                        if (outside != 6 && inside != 3 && inside != 7)
                        {
                            DoorUrl = "Cabinet Vector-09.png";
                        }
                        else if (outside == 6 && (inside == 3 || inside == 7))
                        {
                            DoorUrl = "Cabinet Vector-10.png";
                        }
                    }
                    else if (pDoorxUser.DoorStyle.Id == 1009)
                    {

                    }
                    else {
                        DoorUrl = "Cabinet Vector-16.png";
                    }

                }
                else if (stile == 1 && rail == 1)
                {
                    if (pDoorxUser.Panel.Id == 1009)
                    {

                    }
                    else {
                        DoorUrl = "Cabinet Vector-10.png";
                    }
                }


            } else if (pDoorxUser.Join.Id == 2) {
                DoorUrl = "Cabinet Vector-07.png";
            }
            return urlFolder + DoorUrl;
        }

        #endregion Pictures
        public HingePositions CalcularPosicionHing(DoorsxUser pDoorsxUser) {

            pDoorsxUser.HingePositions = new HingePositions();
            pDoorsxUser.HingePositions.Position1 = "3.5";
            if (pDoorsxUser.Height < 5) {

                pDoorsxUser.Height = 5;
                decimal P2 = decimal.Parse(pDoorsxUser.Height.ToString()) - decimal.Parse("3,5");
                pDoorsxUser.HingePositions.Position2 = P2.ToString().Replace(',','.');
            }
            else if (pDoorsxUser.Height >= 5 && pDoorsxUser.Height < 37) {
                decimal P2 = decimal.Parse(pDoorsxUser.Height.ToString()) - decimal.Parse("3,5");
                pDoorsxUser.HingePositions.Position2 = P2.ToString().Replace(',','.');

            }
            else if (pDoorsxUser.Height >= 37 && pDoorsxUser.Height < 61) {
                decimal P2 = decimal.Parse(pDoorsxUser.Height.ToString()) / 2;
                pDoorsxUser.HingePositions.Position2 = P2.ToString().Replace(',','.');
                decimal P3 = decimal.Parse(pDoorsxUser.Height.ToString()) - decimal.Parse("3,5");
                pDoorsxUser.HingePositions.Position3 = P3.ToString().Replace(',','.');

            }
            else if (pDoorsxUser.Height >= 61 && pDoorsxUser.Height < 81) {
                decimal P2 = ((decimal.Parse(pDoorsxUser.Height.ToString()) - 7) / 3) + decimal.Parse("3,5");
                pDoorsxUser.HingePositions.Position2 = P2.ToString().Replace(',','.');
                decimal P3 = decimal.Parse(pDoorsxUser.Height.ToString()) / 2;
                pDoorsxUser.HingePositions.Position3 = P3.ToString().Replace(',', '.');
                decimal P4 = decimal.Parse(pDoorsxUser.Height.ToString()) - decimal.Parse("3,5");
                pDoorsxUser.HingePositions.Position4 = P4.ToString().Replace(',','.');
            }
            else if (pDoorsxUser.Height >= 81 && pDoorsxUser.Height < 97) {

                decimal P2 = (((decimal.Parse(pDoorsxUser.Height.ToString()) / 2) - decimal.Parse("3,5")) / 2) + decimal.Parse("3,5");
                pDoorsxUser.HingePositions.Position2 = P2.ToString().Replace(',', '.');
                decimal P3 = decimal.Parse(pDoorsxUser.Height.ToString()) / 2;
                pDoorsxUser.HingePositions.Position3 = P3.ToString().Replace(',','.');

                decimal P4 = ((((decimal.Parse(pDoorsxUser.Height.ToString()) / 2) - decimal.Parse("3,5")) / 2) + decimal.Parse("3,5")) - decimal.Parse(pDoorsxUser.Height.ToString());

                pDoorsxUser.HingePositions.Position4 = P4.ToString().Replace(',', '.');
                decimal P5 = decimal.Parse(pDoorsxUser.Height.ToString()) - decimal.Parse("3,5");
                pDoorsxUser.HingePositions.Position5 = P5.ToString().Replace(',', '.');

            }
            else { 
                pDoorsxUser.Height = 96;
                decimal P2 = (((decimal.Parse(pDoorsxUser.Height.ToString()) / 2) - decimal.Parse("3,5")) / 2) + decimal.Parse("3,5");
                pDoorsxUser.HingePositions.Position2 = P2.ToString().Replace(',', '.');
                decimal P3 = decimal.Parse(pDoorsxUser.Height.ToString()) / 2;
                pDoorsxUser.HingePositions.Position3 = P3.ToString().Replace(',', '.');

                decimal P4 = ((((decimal.Parse(pDoorsxUser.Height.ToString()) / 2) - decimal.Parse("3,5")) / 2) + decimal.Parse("3,5")) - decimal.Parse(pDoorsxUser.Height.ToString());

                pDoorsxUser.HingePositions.Position4 = P4.ToString().Replace(',', '.');
                decimal P5 = decimal.Parse(pDoorsxUser.Height.ToString()) - decimal.Parse("3,5");
                pDoorsxUser.HingePositions.Position5 = P5.ToString().Replace(',', '.');

            }
              
                   return pDoorsxUser.HingePositions;
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


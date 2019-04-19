using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Model;
using System.Web.UI;
using System.IO;

namespace VenusDoors.Controllers
{
    public class MastersController : Controller
    {
        // GET: Masters
        #region OBJETOS
        BusinessLogic.lnStatus _LNStatus = new BusinessLogic.lnStatus();
        BusinessLogic.lnCompany _LNCOMP = new BusinessLogic.lnCompany();
        BusinessLogic.lnDoorStyle _LNDoorStile = new BusinessLogic.lnDoorStyle();
        BusinessLogic.lnMaterial _LNMaterial = new BusinessLogic.lnMaterial();
        BusinessLogic.lnTopRail _LNTopRail = new BusinessLogic.lnTopRail();
        BusinessLogic.lnBottomRail _LNBottomRail = new BusinessLogic.lnBottomRail();
        BusinessLogic.lnPreparation _LNPreparation = new BusinessLogic.lnPreparation();
        BusinessLogic.lnJoin _LNJoin = new BusinessLogic.lnJoin();
        BusinessLogic.lnInsideEdgeProfile _LNInsideEdgeProfile = new BusinessLogic.lnInsideEdgeProfile();
        BusinessLogic.lnOutsideEdgeProfile _LNOutsideEdgeProfile = new BusinessLogic.lnOutsideEdgeProfile();
        BusinessLogic.lnVerticalDivisions _LNVerticalDivisions = new BusinessLogic.lnVerticalDivisions();
        BusinessLogic.lnHorizontalDivisions _LNHorizontalDivisions = new BusinessLogic.lnHorizontalDivisions();
        BusinessLogic.lnHingeDirection _LNHingeDirection = new BusinessLogic.lnHingeDirection();
        BusinessLogic.lnHingePositions _LNHingePositions = new BusinessLogic.lnHingePositions();
        BusinessLogic.lnPanel _LNPanel = new BusinessLogic.lnPanel();
        BusinessLogic.lnPanelMaterial _LNPanelMaterial = new BusinessLogic.lnPanelMaterial();
        BusinessLogic.lnMaterialxBottomRail _LNMaterialxBottomRail = new BusinessLogic.lnMaterialxBottomRail();
        BusinessLogic.lnUser _LNUser = new BusinessLogic.lnUser();
        BusinessLogic.lnType _LNType = new BusinessLogic.lnType();
        BusinessLogic.lnGroup _LNGroup = new BusinessLogic.lnGroup();
        BusinessLogic.lnPerson _LNPerson = new BusinessLogic.lnPerson();
        BusinessLogic.lnRailThickness _LNRT = new BusinessLogic.lnRailThickness();
        BusinessLogic.lnCompany _LNCOM = new BusinessLogic.lnCompany();
        BusinessLogic.lnShippingAddress _LNShip = new BusinessLogic.lnShippingAddress();
        #endregion OBJETOS

        #region BottomRail
        [Authorize(Roles = "1")]
        public ActionResult BottomRail()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.Masters = "active show-sub";
                ViewBag.BottomRail = "active";
                BusinessLogic.lnBottomRail _LN = new BusinessLogic.lnBottomRail();

                

                var mBottomRail = _LN.GetAllBottomRail();
                ViewBag.mBottomRail = mBottomRail;
                var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
                ViewBag.ListBottomRail = serializar.Serialize(mBottomRail);
                return View();
            }
            else
            {

                return RedirectToAction("Index", "Home");
            }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult InsertBottomRail(BottomRail pBottomRail)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
               {

                    pBottomRail.CreationDate = DateTime.Now;
                    pBottomRail.CreatorUser = userID;
                    pBottomRail.ModificationDate = DateTime.Now;
                    pBottomRail.ModificationUser = userID;
                BusinessLogic.lnBottomRail _LN = new BusinessLogic.lnBottomRail();
                var inBR = _LN.InsertBottomRail(pBottomRail);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }
        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult UpdateBottomRail(BottomRail uBottomRail)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {
                
                    uBottomRail.ModificationDate = DateTime.Now;
                    uBottomRail.ModificationUser = userID;
                BusinessLogic.lnBottomRail _LN = new BusinessLogic.lnBottomRail();
                var modBR = _LN.UpdateBottomRail(uBottomRail);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetAllBottomRail(BottomRail gBottomRail)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {

                try
                {

                    BusinessLogic.lnBottomRail _LN = new BusinessLogic.lnBottomRail();

                    return Json(_LN.GetAllBottomRail(), JsonRequestBehavior.AllowGet);

                }
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
        }

        public ActionResult DeleteBottomRail(int pId)
        {

            try
            {
                BusinessLogic.lnBottomRail _LN = new BusinessLogic.lnBottomRail();
                var delBR = _LN.DeleteBottomRail(pId);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public ActionResult UpdateStatusBR(BottomRail modBR)
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                int userID = (int)Session["UserID"];
                try
                {
                    BusinessLogic.lnBottomRail _LNBR = new BusinessLogic.lnBottomRail();

                    modBR.ModificationDate = DateTime.Now;
                    modBR.ModificationUser = userID;
                    BottomRail br = _LNBR.GetBottomRailById(modBR.Id);
                    br.Status.Id = modBR.Status.Id;
                    var upbr = _LNBR.UpdateBottomRail(br);


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

        #endregion

        #region Company
        [Authorize(Roles = "1")]
        public ActionResult Company()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.System = "active show-sub";
                ViewBag.Company = "active";
                BusinessLogic.lnCompany _USB = new BusinessLogic.lnCompany();

                var mCompany = _USB.GetAllCompany();
                ViewBag.mCompany = mCompany;
                var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
                ViewBag.ListCompany = serializar.Serialize(mCompany);

                ViewBag.mStatus = _LNStatus.GetAllStatus();
                ViewBag.cbType = _LNType.GetAllType();                
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult InsertCompany(string Name, string Email, string Direction, string Telephone, int Status, int Type)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
                {
                    if (Request.Files.Count > 0)
                    {
                        var file = Request.Files[0];
                        var fileName = Path.GetFileName(file.FileName);
                        // ExcelDataReader works with the binary Excel file, so it needs a FileStream
                        // to get started. This is how we avoid dependencies on ACE or Interop:
                        Stream stream = file.InputStream;

                        // We return the interface, so that



                        Company uCompany = new Company();
                        string oPath = Server.MapPath(string.Format("~/Content/img/{0}", fileName));

                        file.SaveAs(oPath);
                        uCompany.Logo = "/Content/img/"+ fileName;
                        uCompany.Name = Name;
                        uCompany.Direction = Direction;
                        uCompany.Email = Email;
                        uCompany.Telephone = Telephone;
                        uCompany.Status = new Status() { Id = Status };
                        uCompany.Type = new Model.Type() { Id = Type };
                        uCompany.CreationDate = DateTime.Now;
                        uCompany.CreatorUser = userID;
                        uCompany.ModificationUser = userID;
                        uCompany.ModificationDate = DateTime.Now;
                        BusinessLogic.lnCompany _USB = new BusinessLogic.lnCompany();
                        var InsertCompany = _USB.InsertCompany(uCompany);


                    }
                    else
                    {
                        Company uCompany = new Company();
                        uCompany.Logo = "/Content/img/img11.jpg";
                        uCompany.Name = Name;
                        uCompany.Direction = Direction;
                        uCompany.Email = Email;
                        uCompany.Telephone = Telephone;
                        uCompany.Status = new Status() { Id = Status };
                        uCompany.Type = new Model.Type() { Id = Type };
                        uCompany.CreationDate = DateTime.Now;
                        uCompany.CreatorUser = userID;
                        uCompany.ModificationUser = userID;
                        uCompany.ModificationDate = DateTime.Now;
                        BusinessLogic.lnCompany _USB = new BusinessLogic.lnCompany();
                        var InsertCompany = _USB.InsertCompany(uCompany);
                    }
                    return Json(true, JsonRequestBehavior.AllowGet);
                }
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
        }
        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult UpdateCompany(int Id, string Name, string Email, string Direction,string Telephone,int Status,int Type)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
                {
                    if (Request.Files.Count > 0)
                    {
                        var file = Request.Files[0];
                        var fileName = Path.GetFileName(file.FileName);
                        // ExcelDataReader works with the binary Excel file, so it needs a FileStream
                        // to get started. This is how we avoid dependencies on ACE or Interop:
                        Stream stream = file.InputStream;

                        // We return the interface, so that
                        Company uCompany = new Company();


                        string oPath = Server.MapPath(string.Format("~/Content/img/{0}", fileName));

                        file.SaveAs(oPath);
                        uCompany.Logo = "/Content/img/" + fileName;
                        uCompany.Name = Name;
                        uCompany.Id = Id;
                        uCompany.Direction = Direction;
                        uCompany.Email = Email;
                        uCompany.Telephone = Telephone;
                        uCompany.Status = new Status() { Id = Status };
                        uCompany.Type = new Model.Type() { Id = Type };
                        uCompany.ModificationUser = userID;
                        uCompany.ModificationDate = DateTime.Now;
                        BusinessLogic.lnCompany _USB = new BusinessLogic.lnCompany();
                        var modCompany = _USB.UpdateCompany(uCompany);
                    }
                    else
                    {
                        BusinessLogic.lnCompany compa = new BusinessLogic.lnCompany();                   
                        Company com = new Company();
                        com = compa.GetCompanyById(Id);
                        com.Name = Name;
                        com.Id = Id;
                        com.Direction = Direction;
                        com.Email = Email;
                        com.Telephone = Telephone;
                        com.Status = new Status() { Id = Status };
                        com.Type = new Model.Type() { Id = Type };
                        com.ModificationUser = userID;
                        com.ModificationDate = DateTime.Now;
                        var modCompany = compa.UpdateCompany(com);


                    }
                    return Json(true, JsonRequestBehavior.AllowGet);

                }
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
        }


        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetAllCompany(Company pCompany)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
               
                try
                {

                    BusinessLogic.lnCompany company = new BusinessLogic.lnCompany();

                    return Json(company.GetAllCompany(), JsonRequestBehavior.AllowGet);

                }
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public ActionResult UpdateStatusCompany(Company modCom)
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                int userID = (int)Session["UserID"];
                try
                {
                    BusinessLogic.lnCompany _LNCOM = new BusinessLogic.lnCompany();

                    modCom.ModificationDate = DateTime.Now;
                    modCom.ModificationUser = userID;
                    Company com = _LNCOM.GetCompanyById(modCom.Id);
                    com.Status.Id = modCom.Status.Id;
                    var upcom = _LNCOM.UpdateCompany(com);


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
        #endregion

        #region Doors
        [Authorize(Roles = "1")]
        public ActionResult Doors()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.Masters = "active show-sub";
                ViewBag.StanDoors = "active";
                BusinessLogic.lnDoors _LM = new BusinessLogic.lnDoors();

                var mDoors = _LM.GetAllDoors();
                ViewBag.mDoors = mDoors;
                var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
                ViewBag.ListDoors = serializar.Serialize(mDoors);

                ViewBag.mStatus = _LNStatus.GetAllStatus();
                ViewBag.cbDoorStyle = _LNDoorStile.GetAllDoorStyle();
                ViewBag.cbMatarial = _LNMaterial.GetAllMaterial();
                ViewBag.cbTopRail = _LNTopRail.GetAllTopRail();
                ViewBag.cbBottomRail = _LNBottomRail.GetAllBottomRail();
                ViewBag.cbPreparation = _LNPreparation.GetAllPreparation();
                ViewBag.cbJoin = _LNJoin.GetAllJoin();
                ViewBag.cbInsideEdgeProfile = _LNInsideEdgeProfile.GetAllInsideEdgeProfile();
                ViewBag.cbOutsideEdgeProfile = _LNOutsideEdgeProfile.GetAllOutsideEdgeProfile();
                ViewBag.cbVerticalDivisions = _LNVerticalDivisions.GetAllVerticalDivisions();
                ViewBag.cbHorizontalDivisions = _LNHorizontalDivisions.GetAllHorizontalDivisions();
                ViewBag.cbHingeDirection = _LNHingeDirection.GetAllHingeDirection();
                ViewBag.cbHingePositions = _LNHingePositions.GetAllHingePositions();
                ViewBag.cbPanel = _LNPanel.GetAllPanel();
                ViewBag.cbPanelMaterial = _LNPanelMaterial.GetAllPanelMaterial();
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult InsertDoors(Doors pDoors, HingePositions HingeP)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {    
                if (Request.Files.Count > 0)
                {
                    var file = Request.Files[0];
                    var fileName = Path.GetFileName(file.FileName);

                    //var path = Path.Combine(Server.MapPath("~/"), fileName);

                    BinaryReader binaryReader = new BinaryReader(file.InputStream);
                    byte[] binData = binaryReader.ReadBytes(Int32.Parse(file.InputStream.Length.ToString()));

                    //System.IO.File.WriteAllBytes("c:\\Prueba\\" + file.FileName, binData);
                    pDoors.CreationDate = DateTime.Now;
                    pDoors.CreatorUser = userID;
                    pDoors.ModificationDate = DateTime.Now;
                    pDoors.ModificationUser = userID;                    
                    BusinessLogic.lnDoors _LM = new BusinessLogic.lnDoors();
                    var inDoor = _LM.InsertDoors(pDoors);
                    return Json(true, JsonRequestBehavior.AllowGet);
                }
                else
                {

                    pDoors.CreationDate = DateTime.Now;
                    pDoors.CreatorUser = userID;
                    pDoors.ModificationDate = DateTime.Now;
                    pDoors.ModificationUser = userID;                   
                    BusinessLogic.lnDoors _LM = new BusinessLogic.lnDoors();                    
                    var inDoor = _LM.InsertDoors(pDoors);
                    return Json(true, JsonRequestBehavior.AllowGet);
                }
                

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult UpdateDoors(Doors uDoors)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {
                uDoors.ModificationDate = DateTime.Now;
                uDoors.ModificationUser = userID;
                uDoors.ProfilePicture = "empty";
                BusinessLogic.lnDoors _LM = new BusinessLogic.lnDoors();
                var modDoor = _LM.UpdateDoors(uDoors);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }   
             
        [Authorize(Roles = "1")]
        [HttpPost]
        public ActionResult UpdateStatusStandardDoor(Doors moddp)
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                int userID = (int)Session["UserID"];
                try
                {
                    BusinessLogic.lnDoors _LNd = new BusinessLogic.lnDoors();

                    moddp.ModificationDate = DateTime.Now;
                    moddp.ModificationUser = userID;
                    Doors doors = _LNd.GetDoorsById(moddp.Id);
                    doors.Status.Id = moddp.Status.Id;
                    var updp = _LNd.UpdateDoors(doors);


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

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetAllDoors(Doors gDoors)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {

                try
                {

                    BusinessLogic.lnDoors _LM = new BusinessLogic.lnDoors();

                    return Json(_LM.GetAllDoors(), JsonRequestBehavior.AllowGet);

                }
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
        }

        #endregion

        #region DoorsPrices
        [Authorize(Roles = "1")]
        public ActionResult DoorsPrices()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.Masters = "active show-sub";
                ViewBag.DoorPrice = "active";
                BusinessLogic.lnDoorsPrices _LP = new BusinessLogic.lnDoorsPrices();

                var mDoorsPrices = _LP.GetAllDoorsPrices();
                ViewBag.mDoorsPrices = mDoorsPrices;
                var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
                ViewBag.ListDoorsPrices = serializar.Serialize(mDoorsPrices);

                ViewBag.mRailThickness = _LNRT.GetAllRailThickness();
                ViewBag.mStatus = _LNStatus.GetAllStatus();
                ViewBag.cbDoorStyle = _LNPanel.GetAllPanel();
                ViewBag.cbMatarial = _LNMaterial.GetAllMaterial();
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult InsertDoorsPrices(DoorsPrices pDoorsPrices)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                pDoorsPrices.CreationDate = DateTime.Now;
                pDoorsPrices.CreatorUser = userID;
                pDoorsPrices.ModificationDate = DateTime.Now;
                pDoorsPrices.ModificationUser = userID;
                pDoorsPrices.Picture = "Picture";
                pDoorsPrices.ProfilePicture = "Picture";
                BusinessLogic.lnDoorsPrices _LP = new BusinessLogic.lnDoorsPrices();
                var InserDP = _LP.InsertDoorsPrices(pDoorsPrices);
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }
        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult UpdateDoorPrice(DoorsPrices uDoorPrice)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                uDoorPrice.ModificationDate = DateTime.Now;
                uDoorPrice.ModificationUser = userID;
                uDoorPrice.Picture = "Picture";
                uDoorPrice.ProfilePicture = "Picture";
                BusinessLogic.lnDoorsPrices _LP = new BusinessLogic.lnDoorsPrices();
                var modDP = _LP.UpdateDoorsPrices(uDoorPrice);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetAllDoorsPrices(DoorsPrices gDoorsPrices)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {

                try
                {

                    BusinessLogic.lnDoorsPrices _LP = new BusinessLogic.lnDoorsPrices();

                    return Json(_LP.GetAllDoorsPrices(), JsonRequestBehavior.AllowGet);

                }
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
        }


        [Authorize(Roles = "1")]
        [HttpPost]
        public ActionResult UpdateStatusDP(DoorsPrices moddp)
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                int userID = (int)Session["UserID"];
                try
                {
                    BusinessLogic.lnDoorsPrices _LNdp = new BusinessLogic.lnDoorsPrices();

                    moddp.ModificationDate = DateTime.Now;
                    moddp.ModificationUser = userID;
                    DoorsPrices dp = _LNdp.GetDoorPriceById(moddp.Id);
                    dp.Status.Id = moddp.Status.Id;
                    var updp = _LNdp.UpdateDoorsPrices(dp);


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
        #endregion

        #region DoorStyle
        [Authorize(Roles = "1")]
        public ActionResult Index()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.Masters = "active show-sub";
                ViewBag.DoorStyle = "active";
                BusinessLogic.lnDoorStyle _LA = new BusinessLogic.lnDoorStyle();

                var mDoorsStyle = _LA.GetAllDoorStyle();
                ViewBag.mDoorsStyle = mDoorsStyle;
                var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
                ViewBag.ListDoorsStyle = serializar.Serialize(mDoorsStyle);

                ViewBag.mStatus = _LNStatus.GetAllStatus();
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }            
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult InsertDoorStyle(DoorStyle pDoorStyle)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                pDoorStyle.CreationDate = DateTime.Now;
                pDoorStyle.CreatorUser = userID;
                pDoorStyle.ModificationDate = DateTime.Now;
                pDoorStyle.ModificationUser = userID;
                BusinessLogic.lnDoorStyle _LA = new BusinessLogic.lnDoorStyle();
                var InserDS = _LA.InsertDoorStyle(pDoorStyle);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }
        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult UpdateDoorStyle(DoorStyle uDoorStyle)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                uDoorStyle.ModificationDate = DateTime.Now;
                uDoorStyle.ModificationUser = userID;
                BusinessLogic.lnDoorStyle _LA = new BusinessLogic.lnDoorStyle();
                var modDS = _LA.UpdateDoorStyle(uDoorStyle);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetAllDoorStyle()
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {

                try
                {

                    BusinessLogic.lnDoorStyle _LA = new BusinessLogic.lnDoorStyle();

                    return Json(_LA.GetAllDoorStyle(), JsonRequestBehavior.AllowGet);

                }
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public ActionResult UpdateStatusDS(DoorStyle modDs)
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                int userID = (int)Session["UserID"];
                try
                {
                    BusinessLogic.lnDoorStyle _LNDS = new BusinessLogic.lnDoorStyle();

                    modDs.ModificationDate = DateTime.Now;
                    modDs.ModificationUser = userID;
                    DoorStyle ds = _LNDS.GetDoorStyleById(modDs.Id);
                    ds.Status.Id = modDs.Status.Id;
                    var upcom = _LNDS.UpdateDoorStyle(ds);


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
        #endregion

        #region Group
        [Authorize(Roles = "1")]
        public ActionResult Group()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.System = "active show-sub";
                ViewBag.Group = "active";
                BusinessLogic.lnGroup _LC = new BusinessLogic.lnGroup();
                var mGroup = _LC.GetAllGroup();
                ViewBag.mGroup = mGroup;
                var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
                ViewBag.ListGroup = serializar.Serialize(mGroup);
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }            
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult InsertGroup(Group pGroup)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                BusinessLogic.lnGroup _LC = new BusinessLogic.lnGroup();
                var InserGP = _LC.InsertGroup(pGroup);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }
        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult UpdateGroup(Group uGroup)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                BusinessLogic.lnGroup _LC = new BusinessLogic.lnGroup();
                var modGP = _LC.UpdateGroup(uGroup);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetAllGroup(Group gGroup)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {

                try
                {

                    BusinessLogic.lnGroup _LC = new BusinessLogic.lnGroup();

                    return Json(_LC.GetAllGroup(), JsonRequestBehavior.AllowGet);

                }
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
        }

        
        #endregion

        #region HingeDirection
        [Authorize(Roles = "1")]
        public ActionResult HingeDirection()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.Masters = "active show-sub";
                ViewBag.HingeDirection = "active";
                BusinessLogic.lnHingeDirection _LD = new BusinessLogic.lnHingeDirection();
                var mHingeDirection = _LD.GetAllHingeDirection();
                ViewBag.mHingeDirection = mHingeDirection;
                var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
                ViewBag.ListHingeDirection = serializar.Serialize(mHingeDirection);
                ViewBag.mStatus = _LNStatus.GetAllStatus();
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
            
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult InserHingeDirection(HingeDirection pHingeDirection)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                pHingeDirection.CreationDate = DateTime.Now;
                pHingeDirection.CreatorUser = userID;
                pHingeDirection.ModificationDate = DateTime.Now;
                pHingeDirection.ModificationUser = userID;
                BusinessLogic.lnHingeDirection _LD = new BusinessLogic.lnHingeDirection();
                var InserHD = _LD.InsertHingeDirection(pHingeDirection);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult UpdateHingeDirection(HingeDirection uHingeDirection)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                uHingeDirection.ModificationDate = DateTime.Now;
                uHingeDirection.ModificationUser = userID;
                BusinessLogic.lnHingeDirection _LD = new BusinessLogic.lnHingeDirection();
                var modHD = _LD.UpdateHingeDirection(uHingeDirection);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetAllHingeDirection(HingeDirection gHingeDirection)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {

                try
                {

                    BusinessLogic.lnHingeDirection _LD = new BusinessLogic.lnHingeDirection();

                    return Json(_LD.GetAllHingeDirection(), JsonRequestBehavior.AllowGet);

                }
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public ActionResult UpdateStatusHD(HingeDirection modHD)
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                int userID = (int)Session["UserID"];
                try
                {
                    BusinessLogic.lnHingeDirection _LNHD = new BusinessLogic.lnHingeDirection();

                    modHD.ModificationDate = DateTime.Now;
                    modHD.ModificationUser = userID;
                    HingeDirection hd = _LNHD.GetHingeDirectionById(modHD.Id);
                    hd.Status.Id = modHD.Status.Id;
                    var uphd = _LNHD.UpdateHingeDirection(hd);


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
        #endregion

        #region HingePositions
        [Authorize(Roles = "1")]
        public ActionResult HingePositions()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.Masters = "active show-sub";
                ViewBag.HingePositions = "active";
                BusinessLogic.lnHingePositions _LE = new BusinessLogic.lnHingePositions();
                var mHingePositions = _LE.GetAllHingePositions();
                ViewBag.mHingePositions = mHingePositions;
                var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
                ViewBag.ListHingePositions = serializar.Serialize(mHingePositions);
                ViewBag.mStatus = _LNStatus.GetAllStatus();
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }            
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult InserHingePositions(HingePositions pHingePositions)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                pHingePositions.CreationDate = DateTime.Now;
                pHingePositions.CreatorUser = userID;
                pHingePositions.ModificationDate = DateTime.Now;
                pHingePositions.ModificationUser = userID;
                BusinessLogic.lnHingePositions _LE = new BusinessLogic.lnHingePositions();
                var InserHP = _LE.InsertHingePositions(pHingePositions);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult UpdateHingePositions(HingePositions uHingePositions)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {           
                uHingePositions.ModificationDate = DateTime.Now;
                uHingePositions.ModificationUser = userID;
                BusinessLogic.lnHingePositions _LE = new BusinessLogic.lnHingePositions();
                var modHP = _LE.UpdateHingePositions(uHingePositions);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetAllHingePositions(HingePositions gHingePositions)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {

                try
                {

                    BusinessLogic.lnHingePositions _LE = new BusinessLogic.lnHingePositions();

                    return Json(_LE.GetAllHingePositions(), JsonRequestBehavior.AllowGet);

                }
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public ActionResult UpdateStatusHP(HingePositions modHP)
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                int userID = (int)Session["UserID"];
                try
                {
                    BusinessLogic.lnHingePositions _LNHP = new BusinessLogic.lnHingePositions();

                    modHP.ModificationDate = DateTime.Now;
                    modHP.ModificationUser = userID;
                    HingePositions HP = _LNHP.GetHingePositionsById(modHP.Id);
                    HP.Status.Id = modHP.Status.Id;
                    var uphp = _LNHP.UpdateHingePositions(HP);


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
        #endregion

        #region HorizontalDivisions
        [Authorize(Roles = "1")]
        public ActionResult HorizontalDivisions()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.Masters = "active show-sub";
                ViewBag.HorizontalDivisions = "active";
                BusinessLogic.lnHorizontalDivisions _LF = new BusinessLogic.lnHorizontalDivisions();

                var mHorizontalDivisions = _LF.GetAllHorizontalDivisions();
                ViewBag.mHorizontalDivisions = mHorizontalDivisions;
                var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
                ViewBag.ListHorizontalDivisions = serializar.Serialize(mHorizontalDivisions);

                ViewBag.mStatus = _LNStatus.GetAllStatus();
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }            
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult InserHorizontalDivisions(HorizontalDivisions pHorizontalDivisions)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                    pHorizontalDivisions.CreationDate = DateTime.Now;
                    pHorizontalDivisions.CreatorUser = userID;
                    pHorizontalDivisions.ModificationDate = DateTime.Now;
                    pHorizontalDivisions.ModificationUser = userID;
                    BusinessLogic.lnHorizontalDivisions _LF = new BusinessLogic.lnHorizontalDivisions();
                var InserHoDi = _LF.InsertHorizontalDivisions(pHorizontalDivisions);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }
        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult UpdateHorizontalDivisions(HorizontalDivisions uHorizontalDivisions)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                    uHorizontalDivisions.ModificationDate = DateTime.Now;
                    uHorizontalDivisions.ModificationUser = userID;
                    BusinessLogic.lnHorizontalDivisions _LF = new BusinessLogic.lnHorizontalDivisions();
                    var modHoDi = _LF.UpdateHorizontalDivisions(uHorizontalDivisions);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetAllHorizontalDivisions(HorizontalDivisions gHorizontalDivisions)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {

                try
                {

                    BusinessLogic.lnHorizontalDivisions _LF = new BusinessLogic.lnHorizontalDivisions();

                    return Json(_LF.GetAllHorizontalDivisions(), JsonRequestBehavior.AllowGet);

                }
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public ActionResult UpdateStatusHDIVI(HorizontalDivisions modHdi)
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                int userID = (int)Session["UserID"];
                try
                {
                    BusinessLogic.lnHorizontalDivisions _LNHDI = new BusinessLogic.lnHorizontalDivisions();

                    modHdi.ModificationDate = DateTime.Now;
                    modHdi.ModificationUser = userID;
                    HorizontalDivisions Hdiv = _LNHDI.GetHorizontalDivisionsById(modHdi.Id);
                    Hdiv.Status.Id = modHdi.Status.Id;
                    var uphdi = _LNHDI.UpdateHorizontalDivisions(Hdiv);


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
        #endregion

        #region InsideEdgeProfile
        [Authorize(Roles = "1")]
        public ActionResult InsideEdgeProfile()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.Masters = "active show-sub";
                ViewBag.InsideEdgeProfile = "active";
                BusinessLogic.lnInsideEdgeProfile _LG = new BusinessLogic.lnInsideEdgeProfile();

                var mInsideEdgeProfile = _LG.GetAllInsideEdgeProfile();
                ViewBag.mInsideEdgeProfile = mInsideEdgeProfile;
                var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
                ViewBag.ListInsideEdgeProfile = serializar.Serialize(mInsideEdgeProfile);

                ViewBag.mStatus = _LNStatus.GetAllStatus();
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }            
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult InsertInsideEdgeProfile(InsideEdgeProfile pInsideEdgeProfile)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                    pInsideEdgeProfile.CreationDate = DateTime.Now;
                    pInsideEdgeProfile.CreatorUser = userID;
                    pInsideEdgeProfile.ModificationUser = userID;
                    pInsideEdgeProfile.ModificationDate = DateTime.Now;
                BusinessLogic.lnInsideEdgeProfile _LG = new BusinessLogic.lnInsideEdgeProfile();
                var InserIEP = _LG.InsertInsideEdgeProfile(pInsideEdgeProfile);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult UpdateInsideEdgeProfile(InsideEdgeProfile uInsideEdgeProfile)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                    uInsideEdgeProfile.ModificationDate = DateTime.Now;
                    uInsideEdgeProfile.ModificationUser = userID;
                    BusinessLogic.lnInsideEdgeProfile _LG = new BusinessLogic.lnInsideEdgeProfile();
                var modIEP = _LG.UpdateInsideEdgeProfile(uInsideEdgeProfile);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetAllInsideEdgeProfile()
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {

                try
                {

                    BusinessLogic.lnInsideEdgeProfile _LG = new BusinessLogic.lnInsideEdgeProfile();

                    return Json(_LG.GetAllInsideEdgeProfile(), JsonRequestBehavior.AllowGet);

                }
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public ActionResult UpdateStatusIEP(InsideEdgeProfile modIEP)
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                int userID = (int)Session["UserID"];
                try
                {
                    BusinessLogic.lnInsideEdgeProfile _LNIEP = new BusinessLogic.lnInsideEdgeProfile();

                    modIEP.ModificationDate = DateTime.Now;
                    modIEP.ModificationUser = userID;
                    InsideEdgeProfile IEP = _LNIEP.GetInsideEdgeProfileById(modIEP.Id);
                    IEP.Status.Id = modIEP.Status.Id;
                    var upIEP = _LNIEP.UpdateInsideEdgeProfile(IEP);


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
        #endregion

        #region DoorStylexInsideProfile
        [Authorize(Roles = "1")]
        public ActionResult DoorStylexInsideEdgeProfile()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.Masters = "active show-sub";
                ViewBag.BottomRail = "active";
                BusinessLogic.lnDoorStylexInsideEdgeProfile _LN = new BusinessLogic.lnDoorStylexInsideEdgeProfile();



                var DoorStylexInsideEdgeProfile = _LN.GetAllDoorStylexInsideEdgeProfile();
                ViewBag.DoorStylexInsideEdgeProfile = DoorStylexInsideEdgeProfile;
                var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
                ViewBag.ListDoorStylexInsideEdgeProfile = serializar.Serialize(DoorStylexInsideEdgeProfile);
                return View();
            }
            else
            {

                return RedirectToAction("Index", "Home");
            }
        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public ActionResult InsertDoorStylexInsideEdgeProfile(DoorStyle pDoorStyle)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
                {
                    BusinessLogic.lnDoorStylexInsideEdgeProfile _LN = new BusinessLogic.lnDoorStylexInsideEdgeProfile();
                    var inBR = _LN.InsertDoorStylexInsideEdgeProfile(pDoorStyle);

                    if (inBR > 0)
                    {
                        return Json(new {  Success = true, Mensaje = "" }, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return Json(new { Success = false, Mensaje = "Error Inserting Door Inside Profile" }, JsonRequestBehavior.AllowGet);
                    }

                }
                catch (Exception ex)
                {
                    return Json(new { Success = false, Mensaje = ex.Message }, JsonRequestBehavior.AllowGet);
                }
            }
        }       

        [Authorize(Roles = "1")]
        [HttpPost]
        public ActionResult GetAllDoorStylexInsideEdgeProfile()
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {

                try
                {

                    BusinessLogic.lnDoorStylexInsideEdgeProfile _LN = new BusinessLogic.lnDoorStylexInsideEdgeProfile();
                    List<DoorStylexInsideEdgeProfile> list = _LN.GetAllDoorStylexInsideEdgeProfile();
                    if (list.Count > 0)
                    {
                        return Json(new { listDoorInside = list, Success = true, Mensaje = "" }, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return Json(new { Success = false, Mensaje = "Error getting all the door style + Inside profile" }, JsonRequestBehavior.AllowGet);
                    }

                }
                catch (Exception ex)
                {
                    return Json(new { Success = false, Mensaje = ex.Message }, JsonRequestBehavior.AllowGet);
                }
            }
        }
        [Authorize(Roles = "1")]
        [HttpPost]
        public ActionResult DeleteDoorStylexInsideEdgeProfile(int pId)
        {

            try
            {
                BusinessLogic.lnDoorStylexInsideEdgeProfile _LN = new BusinessLogic.lnDoorStylexInsideEdgeProfile();
                var delBR = _LN.DeleteDoorStylexInsideEdgeProfile(pId);
                if (delBR)
                {
                    return Json(new { Success = true, Mensaje = "" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { Success = false, Mensaje = "Error Deleting" }, JsonRequestBehavior.AllowGet);
                }
                

            }
            catch (Exception ex)
            {
                return Json(new { Success = false, Mensaje = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        #endregion



        #region Join
        [Authorize(Roles = "1")]
        public ActionResult Join()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.Masters = "active show-sub";
                ViewBag.Join = "active";
                BusinessLogic.lnJoin _LH = new BusinessLogic.lnJoin();

                var mJoin = _LH.GetAllJoin();
                ViewBag.mJoin = mJoin;
                var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
                ViewBag.ListJoin = serializar.Serialize(mJoin);

                ViewBag.mJoin = _LH.GetAllJoin();
                ViewBag.mStatus = _LNStatus.GetAllStatus();
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult InsertJoin(Join pJoin)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                    pJoin.CreationDate = DateTime.Now;
                    pJoin.CreatorUser = userID;
                    pJoin.ModificationUser = userID;
                    pJoin.ModificationDate = DateTime.Now;
                BusinessLogic.lnJoin _LH = new BusinessLogic.lnJoin();
                var InserJoin = _LH.InsertJoin(pJoin);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }
        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult UpdateJoin(Join uJoin)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                    uJoin.ModificationUser = userID;
                    uJoin.ModificationDate = DateTime.Now;
                BusinessLogic.lnJoin _LH = new BusinessLogic.lnJoin();
                var modJoin = _LH.UpdateJoin(uJoin);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }
        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetAllJoin(Join gJoin)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {

                try
                {

                    BusinessLogic.lnJoin _LH = new BusinessLogic.lnJoin();

                    return Json(_LH.GetAllJoin(), JsonRequestBehavior.AllowGet);

                }
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public ActionResult UpdateStatusJoin(Join modJoin)
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                int userID = (int)Session["UserID"];
                try
                {
                    BusinessLogic.lnJoin _LNJoin = new BusinessLogic.lnJoin();

                    modJoin.ModificationDate = DateTime.Now;
                    modJoin.ModificationUser = userID;
                    Join Join = _LNJoin.GetJoinById(modJoin.Id);
                    Join.Status.Id = modJoin.Status.Id;
                    var upJoin = _LNJoin.UpdateJoin(Join);


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
        #endregion

        #region Material
        [Authorize(Roles = "1")]
        public ActionResult Material()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.Masters = "active show-sub";
                ViewBag.Material = "active";
                BusinessLogic.lnMaterial _LI = new BusinessLogic.lnMaterial();

                var mMaterial = _LI.GetAllMaterial();
                ViewBag.mMaterial = mMaterial;
                var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
                ViewBag.ListMaterial = serializar.Serialize(mMaterial);

                ViewBag.mStatus = _LNStatus.GetAllStatus();
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult InsertMaterial(Material pMaterial)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                    pMaterial.CreationDate = DateTime.Now;
                    pMaterial.CreatorUser = userID;
                    pMaterial.ModificationUser = userID;
                    pMaterial.ModificationDate = DateTime.Now;
                BusinessLogic.lnMaterial _LI = new BusinessLogic.lnMaterial();
                var InserMaterial = _LI.InsertMaterial(pMaterial);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }
        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult UpdateMaterial(Material uMaterial)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                    uMaterial.ModificationUser = userID;
                    uMaterial.ModificationDate = DateTime.Now;
                BusinessLogic.lnMaterial _LI = new BusinessLogic.lnMaterial();
                var modMaterial = _LI.UpdateMaterial(uMaterial);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetAllMaterial(Material gMaterial)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {

                try
                {

                    BusinessLogic.lnMaterial _LI = new BusinessLogic.lnMaterial();

                    return Json(_LI.GetAllMaterial(), JsonRequestBehavior.AllowGet);

                }
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public ActionResult UpdateStatusMaterial(Material modMaterial)
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                int userID = (int)Session["UserID"];
                try
                {
                    BusinessLogic.lnMaterial _LNMaterial = new BusinessLogic.lnMaterial();

                    modMaterial.ModificationDate = DateTime.Now;
                    modMaterial.ModificationUser = userID;
                    Material upMate = _LNMaterial.GetMaterialById(modMaterial.Id);
                    upMate.Status.Id = modMaterial.Status.Id;
                    var upMa = _LNMaterial.UpdateMaterial(upMate);


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
        #endregion

        #region Order
        public ActionResult Order()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {                
                ViewBag.Order = "active";
                ViewBag.System = "active show-sub";
                BusinessLogic.lnOrder _LK = new BusinessLogic.lnOrder();

                var mOrder = _LK.GetAllOrder();
                ViewBag.mOrder = mOrder;
                var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
                ViewBag.ListOrder = serializar.Serialize(mOrder);

                ViewBag.mStatus = _LNStatus.GetAllStatus();
                ViewBag.cbUser = _LNUser.GetAllUser();
                ViewBag.cbType = _LNType.GetAllType();
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult InsertOrder(Order pOrder)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                    pOrder.CreationDate = DateTime.Now;
                    pOrder.CreatorUser = userID;
                    pOrder.ModificationUser = userID;
                    pOrder.ModificationDate = DateTime.Now;
                    pOrder.ShippingAddress.Id = 1;
                BusinessLogic.lnOrder _LK = new BusinessLogic.lnOrder();
                var InserOrder = _LK.InsertOrder(pOrder);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }
        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult UpdateOrder(Order uOrder)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                    uOrder.ModificationUser = userID;
                    uOrder.ModificationDate = DateTime.Now;
                BusinessLogic.lnOrder _LK = new BusinessLogic.lnOrder();
                var modOrder = _LK.UpdateOrder(uOrder);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetAllOrder(Order gOrder)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {

                try
                {

                    BusinessLogic.lnOrder _LK = new BusinessLogic.lnOrder();

                    return Json(_LK.GetAllOrder(), JsonRequestBehavior.AllowGet);

                }
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public ActionResult UpdateStatusOrder(Order modOrder)
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                int userID = (int)Session["UserID"];
                try
                {
                    BusinessLogic.lnOrder _LNOR = new BusinessLogic.lnOrder();

                    modOrder.ModificationDate = DateTime.Now;
                    modOrder.ModificationUser = userID;
                    Order upOR = _LNOR.GetOrderById(modOrder.Id);
                    upOR.Status.Id = modOrder.Status.Id;
                    var upO = _LNOR.UpdateOrder(upOR);


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
        #endregion

        #region OutsideEdgeProfile
        [Authorize(Roles = "1")]
        public ActionResult OutsideEdgeProfile()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.Masters = "active show-sub";
                ViewBag.OutsideEdgeProfile = "active";
                BusinessLogic.lnOutsideEdgeProfile _LL = new BusinessLogic.lnOutsideEdgeProfile();

                var mOutsideEdgeProfile = _LL.GetAllOutsideEdgeProfile();
                ViewBag.mOutsideEdgeProfile = mOutsideEdgeProfile;
                var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
                ViewBag.ListOutsideEdgeProfile = serializar.Serialize(mOutsideEdgeProfile);

                ViewBag.mStatus = _LNStatus.GetAllStatus();
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult InsertOutsideEdgeProfile(OutsideEdgeProfile pOutsideEdgeProfiler)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                    pOutsideEdgeProfiler.CreationDate = DateTime.Now;
                    pOutsideEdgeProfiler.CreatorUser = userID;
                    pOutsideEdgeProfiler.ModificationUser = userID;
                    pOutsideEdgeProfiler.ModificationDate = DateTime.Now;
                BusinessLogic.lnOutsideEdgeProfile _LL = new BusinessLogic.lnOutsideEdgeProfile();
                var InserOEP = _LL.InsertOutsideEdgeProfile(pOutsideEdgeProfiler);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult UpdateOutsideEdgeProfile(OutsideEdgeProfile uOutsideEdgeProfiler)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                    uOutsideEdgeProfiler.ModificationUser = userID;
                    uOutsideEdgeProfiler.ModificationDate = DateTime.Now;
                BusinessLogic.lnOutsideEdgeProfile _LL = new BusinessLogic.lnOutsideEdgeProfile();
                var modOEP = _LL.UpdateOutsideEdgeProfile(uOutsideEdgeProfiler);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetAllOutsideEdgeProfile(OutsideEdgeProfile gOutsideEdgeProfile)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {

                try
                {

                    BusinessLogic.lnOutsideEdgeProfile _LL = new BusinessLogic.lnOutsideEdgeProfile();

                    return Json(_LL.GetAllOutsideEdgeProfile(), JsonRequestBehavior.AllowGet);

                }
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public ActionResult UpdateStatusEP(OutsideEdgeProfile modEP)
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                int userID = (int)Session["UserID"];
                try
                {
                    BusinessLogic.lnOutsideEdgeProfile _LNOEP = new BusinessLogic.lnOutsideEdgeProfile();

                    modEP.ModificationDate = DateTime.Now;
                    modEP.ModificationUser = userID;
                    OutsideEdgeProfile upEP = _LNOEP.GetOutsideEdgeProfileById(modEP.Id);
                    upEP.Status.Id = modEP.Status.Id;
                    var upOEP = _LNOEP.UpdateOutsideEdgeProfile(upEP);


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
        #endregion        

        #region DoorStylexOutsideProfile
        [Authorize(Roles = "1")]
        public ActionResult DoorStylexOutsideEdgeProfile()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.Masters = "active show-sub";
                ViewBag.BottomRail = "active";
                BusinessLogic.lnDoorStylexOutsideEdgeProfile _LN = new BusinessLogic.lnDoorStylexOutsideEdgeProfile();



                var DoorStylexOutsideEdgeProfile = _LN.GetAllDoorStylexOutsideEdgeProfile();
                ViewBag.DoorStylexOutsideEdgeProfile = DoorStylexOutsideEdgeProfile;
                var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
                ViewBag.ListDoorStylexOutsideEdgeProfile = serializar.Serialize(DoorStylexOutsideEdgeProfile);
                return View();
            }
            else
            {

                return RedirectToAction("Index", "Home");
            }
        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public ActionResult InsertDoorStylexOutsideEdgeProfile(DoorStyle pDoorStyle)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
                {
                    BusinessLogic.lnDoorStylexOutsideEdgeProfile _LN = new BusinessLogic.lnDoorStylexOutsideEdgeProfile();
                    var inBR = _LN.InsertDoorStylexOutsideEdgeProfile(pDoorStyle);

                    if (inBR > 0)
                    {
                        return Json(new { Success = true, Mensaje = "" }, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return Json(new { Success = false, Mensaje = "Error Inserting Door Outside Profile" }, JsonRequestBehavior.AllowGet);
                    }

                }
                catch (Exception ex)
                {
                    return Json(new { Success = false, Mensaje = ex.Message }, JsonRequestBehavior.AllowGet);
                }
            }
        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public ActionResult GetAllDoorStylexOutsideEdgeProfile()
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {

                try
                {

                    BusinessLogic.lnDoorStylexOutsideEdgeProfile _LN = new BusinessLogic.lnDoorStylexOutsideEdgeProfile();
                    List<DoorStylexOutsideEdgeProfile> list = _LN.GetAllDoorStylexOutsideEdgeProfile();
                    if (list.Count > 0)
                    {
                        return Json(new { listDoorOutside = list, Success = true, Mensaje = "" }, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return Json(new { Success = false, Mensaje = "Error getting all the door style + Outside profile" }, JsonRequestBehavior.AllowGet);
                    }

                }
                catch (Exception ex)
                {
                    return Json(new { Success = false, Mensaje = ex.Message }, JsonRequestBehavior.AllowGet);
                }
            }
        }
        [Authorize(Roles = "1")]
        [HttpPost]
        public ActionResult DeleteDoorStylexOutsideEdgeProfile(int pId)
        {

            try
            {
                BusinessLogic.lnDoorStylexOutsideEdgeProfile _LN = new BusinessLogic.lnDoorStylexOutsideEdgeProfile();
                var delBR = _LN.DeleteDoorStylexOutsideEdgeProfile(pId);
                if (delBR)
                {
                    return Json(new { Success = true, Mensaje = "" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { Success = false, Mensaje = "Error Deleting" }, JsonRequestBehavior.AllowGet);
                }


            }
            catch (Exception ex)
            {
                return Json(new { Success = false, Mensaje = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        #endregion

        #region Panel
        [Authorize(Roles = "1")]
        public ActionResult Panel()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.Masters = "active show-sub";
                ViewBag.Panel = "active";
                BusinessLogic.lnPanel _LX = new BusinessLogic.lnPanel();

                var mPanel = _LX.GetAllPanel();
                ViewBag.mPanel = mPanel;
                var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
                ViewBag.ListPanel = serializar.Serialize(mPanel);

                ViewBag.mStatus = _LNStatus.GetAllStatus();
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult InsertPanel(Panel pPanel)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                    pPanel.CreationDate = DateTime.Now;
                    pPanel.CreatorUser = userID;
                    pPanel.ModificationUser = userID;
                    pPanel.ModificationDate = DateTime.Now;
                BusinessLogic.lnPanel _LX = new BusinessLogic.lnPanel();
                var InsertPanel = _LX.InsertPanel(pPanel);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }
        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult UpdatePanel(Panel uPanel)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                uPanel.ModificationUser = userID;
                uPanel.ModificationDate = DateTime.Now;
                BusinessLogic.lnPanel _LX = new BusinessLogic.lnPanel();
                var modPanel = _LX.UpdatePanel(uPanel);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetAllPanel(Panel gPanel)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {

                try
                {

                    BusinessLogic.lnPanel _LX = new BusinessLogic.lnPanel();

                    return Json(_LX.GetAllPanel(), JsonRequestBehavior.AllowGet);

                }
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public ActionResult UpdateStatusP(Panel modP)
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                int userID = (int)Session["UserID"];
                try
                {
                    BusinessLogic.lnPanel _LNP = new BusinessLogic.lnPanel();

                    modP.ModificationDate = DateTime.Now;
                    modP.ModificationUser = userID;
                    Panel upP = _LNP.GetPanelById(modP.Id);
                    upP.Status.Id = modP.Status.Id;
                    var upOEP = _LNP.UpdatePanel(upP);


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
        #endregion

        #region PanelMaterial
        [Authorize(Roles = "1")]
        public ActionResult PanelMaterial()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.Masters = "active show-sub";
                ViewBag.PanelMaterial = "active";
                BusinessLogic.lnPanelMaterial _PAC = new BusinessLogic.lnPanelMaterial();

                var mPanelMaterial = _PAC.GetAllPanelMaterial();
                ViewBag.mPanelMaterial = mPanelMaterial;
                var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
                ViewBag.ListPanelMaterial = serializar.Serialize(mPanelMaterial);

                ViewBag.mStatus = _LNStatus.GetAllStatus();
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult InsertPanelMaterial(PanelMaterial pPanelMaterial)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                    pPanelMaterial.CreationDate = DateTime.Now;
                    pPanelMaterial.CreatorUser = userID;
                    pPanelMaterial.ModificationUser = userID;
                    pPanelMaterial.ModificationDate = DateTime.Now;
                BusinessLogic.lnPanelMaterial _PAC = new BusinessLogic.lnPanelMaterial();
                var InsertPanelMaterial = _PAC.InsertPanelMaterial(pPanelMaterial);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }
        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult UpdatePanelMaterial(PanelMaterial uPanelMaterial)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                    uPanelMaterial.ModificationUser = userID;
                    uPanelMaterial.ModificationDate = DateTime.Now;
                BusinessLogic.lnPanelMaterial _PAC = new BusinessLogic.lnPanelMaterial();
                var modPanelMaterial = _PAC.UpdatePanelMaterial(uPanelMaterial);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetAllPanelMaterial(PanelMaterial gPanelMaterial)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {

                try
                {

                    BusinessLogic.lnPanelMaterial _PAC = new BusinessLogic.lnPanelMaterial();

                    return Json(_PAC.GetAllPanelMaterial(), JsonRequestBehavior.AllowGet);

                }
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public ActionResult UpdateStatusPM(PanelMaterial modPM)
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                int userID = (int)Session["UserID"];
                try
                {
                    BusinessLogic.lnPanelMaterial _LNPM = new BusinessLogic.lnPanelMaterial();

                    modPM.ModificationDate = DateTime.Now;
                    modPM.ModificationUser = userID;
                    PanelMaterial upPM = _LNPM.GetPanelMaterialById(modPM.Id);
                    upPM.Status.Id = modPM.Status.Id;
                    var upPm = _LNPM.UpdatePanelMaterial(upPM);


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
        #endregion

        #region Person
        [Authorize(Roles = "1")]
        public ActionResult Person()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.System = "active show-sub";
                ViewBag.Person = "active";
                BusinessLogic.lnPerson _PAX = new BusinessLogic.lnPerson();

                var mPerson = _PAX.GetAllPerson();
                ViewBag.mPerson = mPerson;
                var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
                ViewBag.ListPerson = serializar.Serialize(mPerson);

                ViewBag.mStatus = _LNStatus.GetAllStatus();
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult InsertPerson(Person pPerson)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                    pPerson.CreationDate = DateTime.Now;
                    pPerson.CreatorUser = userID;
                    pPerson.ModificationUser = userID;
                    pPerson.ModificationDate = DateTime.Now;
                BusinessLogic.lnPerson _PAX = new BusinessLogic.lnPerson();
                var InsertPerson = _PAX.InsertPerson(pPerson);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }
        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult UpdatePerson(Person uPerson)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                    uPerson.ModificationUser = userID;
                    uPerson.ModificationDate = DateTime.Now;
                BusinessLogic.lnPerson _PAX = new BusinessLogic.lnPerson();
                var modPerson = _PAX.UpdatePerson(uPerson);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetAllPerson(Person gPerson)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {

                try
                {

                    BusinessLogic.lnPerson _PAX = new BusinessLogic.lnPerson();

                    return Json(_PAX.GetAllPerson(), JsonRequestBehavior.AllowGet);

                }
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public ActionResult UpdateStatusPer(Person modPer)
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                int userID = (int)Session["UserID"];
                try
                {
                    BusinessLogic.lnPerson _LNPer = new BusinessLogic.lnPerson();

                    modPer.ModificationDate = DateTime.Now;
                    modPer.ModificationUser = userID;
                    Person upPer = _LNPer.GetPersonById(modPer.Id);
                    upPer.Status.Id = modPer.Status.Id;
                    var upPe = _LNPer.UpdatePerson(upPer);


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
        #endregion

        #region Preparation
        [Authorize(Roles = "1")]
        public ActionResult Preparation()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.Masters = "active show-sub";
                ViewBag.Preparation = "active";
                BusinessLogic.lnPreparation _JFK = new BusinessLogic.lnPreparation();

                var mPreparation = _JFK.GetAllPreparation();
                ViewBag.mPreparation = mPreparation;
                var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
                ViewBag.ListPreparation = serializar.Serialize(mPreparation);

                ViewBag.mStatus = _LNStatus.GetAllStatus();
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult InsertPreparation(Preparation pPreparation)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                    pPreparation.CreationDate = DateTime.Now;
                    pPreparation.CreatorUser = userID;
                    pPreparation.ModificationUser = userID;
                    pPreparation.ModificationDate = DateTime.Now;
                BusinessLogic.lnPreparation _JFK = new BusinessLogic.lnPreparation();
                var InsertPreparation = _JFK.InsertPreparation(pPreparation);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }
        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult UpdatePreparation(Preparation uPreparation)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                    uPreparation.ModificationUser = userID;
                    uPreparation.ModificationDate = DateTime.Now;
                BusinessLogic.lnPreparation _JFK = new BusinessLogic.lnPreparation();
                var modPerson = _JFK.UpdatePreparation(uPreparation);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetAllPreparation(Preparation gPreparation)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {

                try
                {

                    BusinessLogic.lnPreparation _JFK = new BusinessLogic.lnPreparation();

                    return Json(_JFK.GetAllPreparation(), JsonRequestBehavior.AllowGet);

                }
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public ActionResult UpdateStatusPre(Preparation modPre)
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                int userID = (int)Session["UserID"];
                try
                {
                    BusinessLogic.lnPreparation _LNPre = new BusinessLogic.lnPreparation();

                    modPre.ModificationDate = DateTime.Now;
                    modPre.ModificationUser = userID;
                    Preparation upPre = _LNPre.GetPreparationById(modPre.Id);
                    upPre.Status.Id = modPre.Status.Id;
                    var upPr = _LNPre.UpdatePreparation(upPre);


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
        #endregion

        #region RailThickness
        [Authorize(Roles = "1")]
        public ActionResult RailThickness()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.Masters = "active show-sub";
                ViewBag.RailThickness = "active";
                BusinessLogic.lnRailThickness _LN = new BusinessLogic.lnRailThickness();

                ViewBag.mStatus = _LNStatus.GetAllStatus();

                var mRailThickness = _LN.GetAllRailThickness();
                ViewBag.mRailThickness = mRailThickness;
                var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
                ViewBag.ListRailThickness = serializar.Serialize(mRailThickness);
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult InsertRailThickness(RailThickness pRailThickness)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                    pRailThickness.CreationDate = DateTime.Now;
                    pRailThickness.CreatorUser = userID;
                    pRailThickness.ModificationUser = userID;
                    pRailThickness.ModificationDate = DateTime.Now;
                BusinessLogic.lnRailThickness _LN = new BusinessLogic.lnRailThickness();
                var InsertRailThickness = _LN.InsertRailThickness(pRailThickness);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }
        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult UpdateRailThickness(RailThickness uRailThickness)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                    uRailThickness.ModificationUser = userID;
                    uRailThickness.ModificationDate = DateTime.Now;
                BusinessLogic.lnRailThickness _LN = new BusinessLogic.lnRailThickness();
                var modRT = _LN.UpdateRailThickness(uRailThickness);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }
        public ActionResult DeleteRailThickness(int id)
        {

            RailThickness dRailThickness = ViewBag.delRailThickness(id);

            if (dRailThickness == null)
                return View("NotFound");
            else
                return View(dRailThickness);
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetAllRailThickness(RailThickness gRailThicknessn)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {

                try
                {

                    BusinessLogic.lnRailThickness _LN = new BusinessLogic.lnRailThickness();

                    return Json(_LN.GetAllRailThickness(), JsonRequestBehavior.AllowGet);

                }
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public ActionResult UpdateStatusRT(RailThickness modRT)
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                int userID = (int)Session["UserID"];
                try
                {
                    BusinessLogic.lnRailThickness _LNRT = new BusinessLogic.lnRailThickness();

                    modRT.ModificationDate = DateTime.Now;
                    modRT.ModificationUser = userID;
                    RailThickness uprt = _LNRT.GetRailThicknessById(modRT.Id);
                    uprt.Status.Id = modRT.Status.Id;
                    var upRT = _LNRT.UpdateRailThickness(uprt);


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
        #endregion

        #region Status
        [Authorize(Roles = "1")]
        public ActionResult Status()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.System = "active show-sub";
                ViewBag.Status = "active";
                BusinessLogic.lnStatus _LNStatus = new BusinessLogic.lnStatus();

                var mStatus = _LNStatus.GetAllStatus();
                ViewBag.mStatus = mStatus;
                var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
                ViewBag.ListStatus = serializar.Serialize(mStatus);

                ViewBag.cbGroup = _LNGroup.GetAllGroup();
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult InsertStatus(Status pStatus)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                BusinessLogic.lnStatus _LNStatus = new BusinessLogic.lnStatus();
                var InsertStatus = _LNStatus.InsertStatus(pStatus);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }
        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult UpdateStatus(Status uStatus)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                BusinessLogic.lnStatus _LNStatus = new BusinessLogic.lnStatus();
                var modStatus = _LNStatus.UpdateStatus(uStatus);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetAllStatus(Status gStatus)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {

                try
                {

                    BusinessLogic.lnStatus _LNStatus = new BusinessLogic.lnStatus();

                    return Json(_LNStatus.GetAllStatus(), JsonRequestBehavior.AllowGet);

                }
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
        }
        #endregion

        #region TopRail
        [Authorize(Roles = "1")]
        public ActionResult TopRail()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.Masters = "active show-sub";
                ViewBag.TopRail = "active";
                BusinessLogic.lnTopRail _TOP = new BusinessLogic.lnTopRail();

                var mTopRail = _TOP.GetAllTopRail();
                ViewBag.mTopRail = mTopRail;
                var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
                ViewBag.ListTopRail = serializar.Serialize(mTopRail);

                ViewBag.mStatus = _LNStatus.GetAllStatus();
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult InsertTopRail(TopRail pTopRail)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                    pTopRail.CreationDate = DateTime.Now;
                    pTopRail.CreatorUser = userID;
                    pTopRail.ModificationUser = userID;
                    pTopRail.ModificationDate = DateTime.Now;
                BusinessLogic.lnTopRail _TOP = new BusinessLogic.lnTopRail();
                var InsertTopRail = _TOP.InsertTopRail(pTopRail);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }
        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult UpdateTopRail(TopRail uTopRail)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                    uTopRail.ModificationUser = userID;
                    uTopRail.ModificationDate = DateTime.Now;
                BusinessLogic.lnTopRail _TOP = new BusinessLogic.lnTopRail();
                var modTopRail = _TOP.UpdateTopRail(uTopRail);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetAllTopRail(TopRail gTopRail)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {

                try
                {

                    BusinessLogic.lnTopRail _TOP = new BusinessLogic.lnTopRail();

                    return Json(_TOP.GetAllTopRail(), JsonRequestBehavior.AllowGet);

                }
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public ActionResult UpdateStatusTRA(TopRail modToP)
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                int userID = (int)Session["UserID"];
                try
                {
                    BusinessLogic.lnTopRail _LNTOP = new BusinessLogic.lnTopRail();

                    modToP.ModificationDate = DateTime.Now;
                    modToP.ModificationUser = userID;
                    TopRail uptop = _LNTOP.GetTopRailById(modToP.Id);
                    uptop.Status.Id = modToP.Status.Id;
                    var upTOP = _LNTOP.UpdateTopRail(uptop);


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
        #endregion

        #region Type
        [Authorize(Roles = "1")]
        public ActionResult Type()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.System = "active show-sub";
                ViewBag.Type = "active";
                BusinessLogic.lnType _LBL = new BusinessLogic.lnType();

                var mType = _LBL.GetAllType();
                ViewBag.mType = mType;
                var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
                ViewBag.ListType = serializar.Serialize(mType);

                ViewBag.cbGroup = _LNGroup.GetAllGroup();
                ViewBag.mStatus = _LNStatus.GetAllStatus();
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult InsertType(Model.Type pTypes)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                    pTypes.CreationDate = DateTime.Now;
                    pTypes.CreatorUser = userID;
                    pTypes.ModificationUser = userID;
                    pTypes.ModificationDate = DateTime.Now;
                BusinessLogic.lnType _LBL = new BusinessLogic.lnType();
                var InsertType = _LBL.InsertType(pTypes);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }
        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult UpdateType(Model.Type uTypes)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                    uTypes.ModificationUser = userID;
                    uTypes.ModificationDate = DateTime.Now;
                BusinessLogic.lnType _LBL = new BusinessLogic.lnType();
                var modType = _LBL.UpdateType(uTypes);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }
        

        //[Authorize(Roles = "1")] [HttpPost]
        //public ActionResult GetAllType(Model.Type gType)
        //{
        //    if (Session["UserID"] == null)
        //    {
        //        return View();
        //    }
        //    else
        //    {

        //        try
        //        {

        //            BusinessLogic.lnType _LBL = new BusinessLogic.lnType();

        //            return Json(_LBL.GetAllType(), JsonRequestBehavior.AllowGet);

        //        }
        //        catch
        //        {
        //            return Json(false, JsonRequestBehavior.AllowGet);
        //        }
        //    }
        //}
        #endregion

        #region User
        [Authorize(Roles = "1")]
        public ActionResult Usuario()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.System = "active show-sub";
                ViewBag.Usuario = "active";
                BusinessLogic.lnUser _USB = new BusinessLogic.lnUser();

                var mUsuario = _USB.GetAllUser();
                ViewBag.mUsuario = mUsuario;
                var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
                ViewBag.ListUsuario = serializar.Serialize(mUsuario);

                ViewBag.mStatus = _LNStatus.GetAllStatus();
                ViewBag.cbType = _LNType.GetAllType();
                ViewBag.cbPerson = _LNPerson.GetAllPerson();
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult InsertUser(User pUser)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                    pUser.CreationDate = DateTime.Now;
                    pUser.CreatorUser = userID;
                    pUser.ModificationUser = userID;
                    pUser.ModificationDate = DateTime.Now;
                BusinessLogic.lnUser _USB = new BusinessLogic.lnUser();
                var InsertUser = _USB.InsertUser(pUser);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }
        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult UpdateUser(User uUser)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                    uUser.ModificationUser = userID;
                    uUser.ModificationDate = DateTime.Now;
                BusinessLogic.lnUser _USB = new BusinessLogic.lnUser();
                var modUser = _USB.UpdateUser(uUser);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetAllUser(User gType)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {

                try
                {

                    BusinessLogic.lnUser _USB = new BusinessLogic.lnUser();

                    return Json(_USB.GetAllUser(), JsonRequestBehavior.AllowGet);

                }
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public ActionResult UpdateStatusUser(User modUser)
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                int userID = (int)Session["UserID"];
                try
                {
                    BusinessLogic.lnUser _LNUS = new BusinessLogic.lnUser();

                    modUser.ModificationDate = DateTime.Now;
                    modUser.ModificationUser = userID;
                    User upuser = _LNUS.GetUserById(modUser.Id);
                    upuser.Status.Id = modUser.Status.Id;
                    var upTOP = _LNUS.UpdateUser(upuser);


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
        #endregion

        #region VerticalDivisions
        [Authorize(Roles = "1")]
        public ActionResult VerticalDivisions()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.Masters = "active show-sub";
                ViewBag.VerticalDivisions = "active";
                BusinessLogic.lnVerticalDivisions _UCB = new BusinessLogic.lnVerticalDivisions();

                var mVerticalDivisions = _UCB.GetAllVerticalDivisions();
                ViewBag.mVerticalDivisions = mVerticalDivisions;
                var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
                ViewBag.ListVerticalDivisions = serializar.Serialize(mVerticalDivisions);

                ViewBag.mStatus = _LNStatus.GetAllStatus();
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult InsertVerticalDivisions(VerticalDivisions pVerticalDivisions)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                    pVerticalDivisions.CreationDate = DateTime.Now;
                    pVerticalDivisions.CreatorUser = userID;
                    pVerticalDivisions.ModificationUser = userID;
                    pVerticalDivisions.ModificationDate = DateTime.Now;
                BusinessLogic.lnVerticalDivisions _UCB = new BusinessLogic.lnVerticalDivisions();
                var InsertVerticalDivisions = _UCB.InsertVerticalDivisions(pVerticalDivisions);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }
        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult UpdateVerticalDivisions(VerticalDivisions uVerticalDivisions)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                int userID = (int)Session["UserID"];
                try
            {

                    uVerticalDivisions.ModificationUser = userID;
                    uVerticalDivisions.ModificationDate = DateTime.Now;
                BusinessLogic.lnVerticalDivisions _UCB = new BusinessLogic.lnVerticalDivisions();
                var modVD = _UCB.UpdateVerticalDivisions(uVerticalDivisions);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetAllVerticalDivisions(VerticalDivisions gVerticalDivisions)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {

                try
                {

                    BusinessLogic.lnVerticalDivisions _UCB = new BusinessLogic.lnVerticalDivisions();

                    return Json(_UCB.GetAllVerticalDivisions(), JsonRequestBehavior.AllowGet);

                }
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public ActionResult UpdateStatusVD(VerticalDivisions modVD)
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                int userID = (int)Session["UserID"];
                try
                {
                    BusinessLogic.lnVerticalDivisions _LNVD = new BusinessLogic.lnVerticalDivisions();

                    modVD.ModificationDate = DateTime.Now;
                    modVD.ModificationUser = userID;
                    VerticalDivisions upVD = _LNVD.GetVerticalDivisionsById(modVD.Id);
                    upVD.Status.Id = modVD.Status.Id;
                    var upVd = _LNVD.UpdateVerticalDivisions(upVD);


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
        #endregion


        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetStatus()
        {
            try
            {

                return Json(_LNStatus.GetAllStatus());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetCompany()
        {
            try
            {

                return Json(_LNCOMP.GetAllCompany());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetDoorStyle()
        {
            try
            {

                return Json(_LNDoorStile.GetAllDoorStyle());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetMaterial()
        {
            try
            {

                return Json(_LNMaterial.GetAllMaterial());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetTopRail()
        {
            try
            {

                return Json(_LNTopRail.GetAllTopRail());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetBottomRail()
        {
            try
            {

                return Json(_LNBottomRail.GetAllBottomRail());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetPreparation()
        {
            try
            {

                return Json(_LNPreparation.GetAllPreparation());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetJoin()
        {
            try
            {

                return Json(_LNJoin.GetAllJoin());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetOutsideEdgeProfile()
        {
            try
            {

                return Json(_LNOutsideEdgeProfile.GetAllOutsideEdgeProfile());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetInsideEdgeProfile()
        {
            try
            {

                return Json(_LNInsideEdgeProfile.GetAllInsideEdgeProfile());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetVerticalDivisions()
        {
            try
            {

                return Json(_LNVerticalDivisions.GetAllVerticalDivisions());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetHorizontalDivisions()
        {
            try
            {

                return Json(_LNHorizontalDivisions.GetAllHorizontalDivisions());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetPanel()
        {
            try
            {

                return Json(_LNPanel.GetAllPanel());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetPanelMaterial()
        {
            try
            {

                return Json(_LNPanelMaterial.GetAllPanelMaterial());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetRailThickness()
        {
            try
            {

                return Json(_LNRT.GetAllRailThickness());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetUser()
        {
            try
            {

                return Json(_LNUser.GetAllUser());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetAllType()
        {
            try
            {

                return Json(_LNType.GetAllType());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetGroup()
        {
            try
            {

                return Json(_LNGroup.GetAllGroup());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetPerson()
        {
            try
            {

                return Json(_LNPerson.GetAllPerson());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [Authorize(Roles = "1")] [HttpPost]
        public ActionResult GetShippingAddress()
        {
            try
            {

                return Json(_LNShip.GetAllShippingAddress());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }


    }
}

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
        BusinessLogic.lnStatus _LNStatus = new BusinessLogic.lnStatus();
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

        #region BottomRail
        public ActionResult BottomRail()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.Masters = "active show-sub";
                ViewBag.BottomRail = "active";
                BusinessLogic.lnBottomRail _LN = new BusinessLogic.lnBottomRail();

                ViewBag.mStatus = _LNStatus.GetAllStatus();

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

        [HttpPost]
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
        [HttpPost]
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
        #endregion

        #region Doors
        public ActionResult Doors()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.Masters = "active show-sub";
                ViewBag.Doors = "active";
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

        [HttpPost]
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
                    pDoors.Picture = "Picture";
                    pDoors.ProfilePicture = "empty";
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
                    pDoors.Picture = "Picture";
                    pDoors.ProfilePicture = "empty";
                    BusinessLogic.lnDoors _LM = new BusinessLogic.lnDoors();
                    BusinessLogic.lnHingePositions _LNHP = new BusinessLogic.lnHingePositions();

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
                    pDoors.HingePositions = newhp;
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

        [HttpPost]
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
        #endregion

        #region DoorsPrices
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
                ViewBag.cbDoorStyle = _LNDoorStile.GetAllDoorStyle();
                ViewBag.cbMatarial = _LNMaterial.GetAllMaterial();
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        [HttpPost]
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
        [HttpPost]
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
        #endregion

        #region DoorStyle
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

        [HttpPost]
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
        [HttpPost]
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
        #endregion

        #region DoorStylexInsideEdgeProfile
        public ActionResult DoorStyleByInsideEdgeProfile()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.Masters = "active show-sub";
                ViewBag.DoorStyleByInsideEdgeProfile = "active";
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }
        #endregion

        #region DoorStylexOutsideEdgeProfile
        public ActionResult DoorStyleByOutsideEdgeProfile()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.Masters = "active show-sub";
                ViewBag.DoorStyleByOutsideEdgeProfile = "active";
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }            
        }
        #endregion

        #region DoorsxUser
        public ActionResult DoorByUser()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.Masters = "active show-sub";
                ViewBag.DoorByUser = "active";
                BusinessLogic.lnDoorsxUser _LB = new BusinessLogic.lnDoorsxUser();
                ViewBag.mDoorxUser = _LB.GetAllDoorsxUser();
                ViewBag.mStatus = _LNStatus.GetAllStatus();
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }            
        }
        #endregion

        #region Group
        public ActionResult Group()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.Masters = "active show-sub";
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

        [HttpPost]
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
        [HttpPost]
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
        #endregion

        #region HingeDirection
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

        [HttpPost]
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

        [HttpPost]
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
        #endregion

        #region HingePositions
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

        [HttpPost]
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

        [HttpPost]
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
        #endregion

        #region HorizontalDivisions
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

        [HttpPost]
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
        [HttpPost]
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
        #endregion

        #region InsideEdgeProfile
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

        [HttpPost]
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

        [HttpPost]
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
        #endregion

        #region Join
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

        [HttpPost]
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
        [HttpPost]
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
        #endregion

        #region Material
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

        [HttpPost]
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
        [HttpPost]
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
        #endregion

        #region MaterialxBottomRail
        public ActionResult MaterialxBottomRail()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.Masters = "active show-sub";
                ViewBag.MaterialxBottomRail = "active";
                BusinessLogic.lnMaterialxBottomRail _LJ = new BusinessLogic.lnMaterialxBottomRail();

                var mMaterialxBottomRail = _LJ.GetAllMaterialxBottomRail();
                ViewBag.mMaterialxBottomRail = mMaterialxBottomRail;
                var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
                ViewBag.ListMaterialxBottomRail = serializar.Serialize(mMaterialxBottomRail);

                ViewBag.mStatus = _LNStatus.GetAllStatus();
                ViewBag.cbMatarial = _LNMaterial.GetAllMaterial();
                ViewBag.cbBottomRail = _LNBottomRail.GetAllBottomRail();
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        [HttpPost]
        public ActionResult InsertMaterialxBottomRail(MaterialxBottomRail pMaterialxBottomRail)
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

                    pMaterialxBottomRail.CreationDate = DateTime.Now;
                    pMaterialxBottomRail.CreatorUser = userID;
                    pMaterialxBottomRail.ModificationUser = userID;
                    pMaterialxBottomRail.ModificationDate = DateTime.Now;
                BusinessLogic.lnMaterialxBottomRail _LJ = new BusinessLogic.lnMaterialxBottomRail();
                var InserMaterialxBoR = _LJ.InsertMaterialxBottomRail(pMaterialxBottomRail);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }
        [HttpPost]
        public ActionResult UpdateMaterialxBottomRail(MaterialxBottomRail uMaterialxBottomRail)
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

                    uMaterialxBottomRail.ModificationUser = userID;
                    uMaterialxBottomRail.ModificationDate = DateTime.Now;
                BusinessLogic.lnMaterialxBottomRail _LJ = new BusinessLogic.lnMaterialxBottomRail();
                var modMaterialxBR = _LJ.UpdateMaterialxBottomRail(uMaterialxBottomRail);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        }
        #endregion

        #region Order
        public ActionResult Order()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.Masters = "active show-sub";
                ViewBag.Order = "active";
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

        [HttpPost]
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
        [HttpPost]
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
        #endregion

        #region OutsideEdgeProfile
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

        [HttpPost]
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

        [HttpPost]
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
        #endregion

        #region Panel
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

        [HttpPost]
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
        [HttpPost]
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
        #endregion

        #region PanelMaterial
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

        [HttpPost]
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
        [HttpPost]
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
        #endregion

        #region Person
        public ActionResult Person()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.Masters = "active show-sub";
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

        [HttpPost]
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
        [HttpPost]
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
        #endregion

        #region Preparation
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

        [HttpPost]
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
        [HttpPost]
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
        #endregion

        #region RailThickness
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

        [HttpPost]
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
        [HttpPost]
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
        #endregion

        #region Status
        public ActionResult Status()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.Masters = "active show-sub";
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

        [HttpPost]
        public ActionResult InsertStatus(Status pStatus)
        {
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

        [HttpPost]
        public ActionResult UpdateStatus(Status uStatus)
        {
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
        #endregion

        #region TopRail
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

        [HttpPost]
        public ActionResult InsertTopRail(TopRail pTopRail)
        {
            try
            {

                pTopRail.CreationDate = DateTime.Now;
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

        [HttpPost]
        public ActionResult UpdateTopRail(TopRail uTopRail)
        {
            try
            {

                uTopRail.CreationDate = DateTime.Now;
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
        #endregion

        #region TopRailxHorizontalDivisions
        public ActionResult TopRailByHorizontalDivisions()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.Masters = "active show-sub";
                ViewBag.TopRailByHorizontalDivisions = "active";
                BusinessLogic.lnTopRailxHorizontalDivisions _TAP = new BusinessLogic.lnTopRailxHorizontalDivisions();

                var mTopRailByHorizontalDivisions = _TAP.GetAllTopRailxHorizontalDivisions();
                ViewBag.mTopRailByHorizontalDivisions = mTopRailByHorizontalDivisions;
                var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
                ViewBag.ListTopRailxHorizontal = serializar.Serialize(mTopRailByHorizontalDivisions);

                ViewBag.mStatus = _LNStatus.GetAllStatus();
                ViewBag.cbTopRail = _LNTopRail.GetAllTopRail();
                ViewBag.cbHorizontalDivisions = _LNHorizontalDivisions.GetAllHorizontalDivisions();
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        [HttpPost]
        public ActionResult InsertTopRailxHorizontalDivisions(TopRailxHorizontalDivisions pTopRailByHorizontalDivisions)
        {
            try
            {

                pTopRailByHorizontalDivisions.CreationDate = DateTime.Now;
                pTopRailByHorizontalDivisions.ModificationDate = DateTime.Now;
                BusinessLogic.lnTopRailxHorizontalDivisions _TAP = new BusinessLogic.lnTopRailxHorizontalDivisions();
                var InsertTopRailxHorizontalDivisions = _TAP.InsertTopRailxHorizontalDivisions(pTopRailByHorizontalDivisions);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult UpdateTopRailxHorizontalDivisions(TopRailxHorizontalDivisions uTopRailByHorizontalDivisions)
        {
            try
            {

                uTopRailByHorizontalDivisions.CreationDate = DateTime.Now;
                uTopRailByHorizontalDivisions.ModificationDate = DateTime.Now;
                BusinessLogic.lnTopRailxHorizontalDivisions _TAP = new BusinessLogic.lnTopRailxHorizontalDivisions();
                var modTopRailxHD = _TAP.UpdateTopRailxHorizontalDivisions(uTopRailByHorizontalDivisions);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region TopRailxJoin
        public ActionResult TopRailByJoin()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.Masters = "active show-sub";
                ViewBag.TopRailByJoin = "active";
                BusinessLogic.lnTopRailxJoin _TEP = new BusinessLogic.lnTopRailxJoin();

                var mTopRailByJoin = _TEP.GetAllTopRailxJoin();
                ViewBag.mTopRailByJoin = mTopRailByJoin;
                var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
                ViewBag.ListTopRailByJoin = serializar.Serialize(mTopRailByJoin);

                ViewBag.mStatus = _LNStatus.GetAllStatus();
                ViewBag.cbTopRail = _LNTopRail.GetAllTopRail();
                ViewBag.cbJoin = _LNJoin.GetAllJoin();
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        [HttpPost]
        public ActionResult InsertTopRailByJoin(TopRailxJoin pTopRailByJoin)
        {
            try
            {

                pTopRailByJoin.CreationDate = DateTime.Now;
                pTopRailByJoin.ModificationDate = DateTime.Now;
                BusinessLogic.lnTopRailxJoin _TEP = new BusinessLogic.lnTopRailxJoin();
                var InsertTopRailxJoin = _TEP.InsertTopRailxJoin(pTopRailByJoin);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult UpdateTopRailByJoin(TopRailxJoin uTopRailByJoin)
        {
            try
            {

                uTopRailByJoin.CreationDate = DateTime.Now;
                uTopRailByJoin.ModificationDate = DateTime.Now;
                BusinessLogic.lnTopRailxJoin _TEP = new BusinessLogic.lnTopRailxJoin();
                var modTopRailxJoin = _TEP.UpdateTopRailxJoin(uTopRailByJoin);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region TopRailxVerticalDivisions
        public ActionResult TopRailByVerticalDivisions()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.Masters = "active show-sub";
                ViewBag.TopRailByVerticalDivisions = "active";
                BusinessLogic.lnTopRailxVerticalDivisions _TUP = new BusinessLogic.lnTopRailxVerticalDivisions();

                var mTopRailByVerticalDivisions = _TUP.GetAllTopRailxVerticalDivisions();
                ViewBag.mTopRailByVerticalDivisions = mTopRailByVerticalDivisions;
                var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
                ViewBag.ListTopRailxVertical = serializar.Serialize(mTopRailByVerticalDivisions);

                ViewBag.mStatus = _LNStatus.GetAllStatus();
                ViewBag.cbTopRail = _LNTopRail.GetAllTopRail();
                ViewBag.cbVerticalDivisions = _LNVerticalDivisions.GetAllVerticalDivisions();
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        [HttpPost]
        public ActionResult InsertTopRailByVerticalDivisions(TopRailxVerticalDivisions pTopRailByVerticalDivisions)
        {
            try
            {

                pTopRailByVerticalDivisions.CreationDate = DateTime.Now;
                pTopRailByVerticalDivisions.ModificationDate = DateTime.Now;
                BusinessLogic.lnTopRailxVerticalDivisions _TUP = new BusinessLogic.lnTopRailxVerticalDivisions();
                var InsertTopRailxVerticalDivisions = _TUP.InsertTopRailxVerticalDivisions(pTopRailByVerticalDivisions);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult UpdateTopRailByVerticalDivisions(TopRailxVerticalDivisions uTopRailByVerticalDivisions)
        {
            try
            {

                uTopRailByVerticalDivisions.CreationDate = DateTime.Now;
                uTopRailByVerticalDivisions.ModificationDate = DateTime.Now;
                BusinessLogic.lnTopRailxVerticalDivisions _TUP = new BusinessLogic.lnTopRailxVerticalDivisions();
                var modTopRailxVD = _TUP.UpdateTopRailxVerticalDivisions(uTopRailByVerticalDivisions);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region Type
        public ActionResult Type()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.Masters = "active show-sub";
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

        [HttpPost]
        public ActionResult InsertType(Model.Type pTypes)
        {
            try
            {

                pTypes.CreationDate = DateTime.Now;
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

        [HttpPost]
        public ActionResult UpdateType(Model.Type uTypes)
        {
            try
            {

                uTypes.CreationDate = DateTime.Now;
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
        #endregion

        #region User
        public ActionResult Usuario()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.Masters = "active show-sub";
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

        [HttpPost]
        public ActionResult InsertUsuario(User pUsuario)
        {
            try
            {

                pUsuario.CreationDate = DateTime.Now;
                pUsuario.ModificationDate = DateTime.Now;
                BusinessLogic.lnUser _USB = new BusinessLogic.lnUser();
                var InsertUser = _USB.InsertUser(pUsuario);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult UpdateUsuario(User uUsuario)
        {
            try
            {

                uUsuario.CreationDate = DateTime.Now;
                uUsuario.ModificationDate = DateTime.Now;
                BusinessLogic.lnUser _USB = new BusinessLogic.lnUser();
                var modUser = _USB.UpdateUser(uUsuario);
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region VerticalDivisions
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

        [HttpPost]
        public ActionResult InsertVerticalDivisions(VerticalDivisions pVerticalDivisions)
        {
            try
            {

                pVerticalDivisions.CreationDate = DateTime.Now;
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

        [HttpPost]
        public ActionResult UpdateVerticalDivisions(VerticalDivisions uVerticalDivisions)
        {
            try
            {

                uVerticalDivisions.CreationDate = DateTime.Now;
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
        #endregion

        public class HomeController : Controller
        {
            //
            // GET: /Home/

            public ActionResult Index()
            {
                return View();
            }

            [HttpPost]
            public void Subir(HttpPostedFileBase file)
            {
                if (file == null) return;

                string archivo = (DateTime.Now.ToString("yyyyMMddHHmmss") + "-" + file.FileName).ToLower();

                file.SaveAs(Server.MapPath("~/img/" + archivo));
            }
        }

        // GET: Masters/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Masters/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Masters/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Masters/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Masters/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Masters/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Masters/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}

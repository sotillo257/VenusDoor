using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Model;

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


        public ActionResult BottomRail()
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

        [HttpPost]
        public ActionResult InsertBottomRail(BottomRail pBottomRail)
        {
            try
            {

                pBottomRail.CreationDate = DateTime.Now;
                pBottomRail.ModificationDate = DateTime.Now;
                BusinessLogic.lnBottomRail _LN = new BusinessLogic.lnBottomRail();
                return Json(_LN.InsertBottomRail(pBottomRail));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult UpdateBottomRail(BottomRail uBottomRail)
        {
           try
            {

                uBottomRail.CreationDate = DateTime.Now;
                uBottomRail.ModificationDate = DateTime.Now;
                BusinessLogic.lnBottomRail _LN = new BusinessLogic.lnBottomRail();
                return Json(_LN.UpdateBottomRail(uBottomRail));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        //[HttpPost]
        //public ActionResult DeleteBottomRail(BottomRail dBottomRail)
        //{
        //    try
        //    {

        //        dBottomRail.CreationDate = DateTime.Now;
        //        dBottomRail.ModificationDate = DateTime.Now;
        //        BusinessLogic.lnBottomRail _LN = new BusinessLogic.lnBottomRail();
        //        return Json(_LN.de(dBottomRail));

        //    }
        //    catch
        //    {
        //        return Json(false, JsonRequestBehavior.AllowGet);
        //    }
        //}


        public ActionResult Doors()
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

        [HttpPost]
        public ActionResult InsertDoors(Doors pDoors)
        {
            try
            {

                pDoors.CreationDate = DateTime.Now;
                pDoors.ModificationDate = DateTime.Now;
                BusinessLogic.lnDoors _LM = new BusinessLogic.lnDoors();
                return Json(_LM.InsertDoors(pDoors));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult UpdateDoors(Doors uDoors)
        {
            try
            {

                uDoors.CreationDate = DateTime.Now;
                uDoors.ModificationDate = DateTime.Now;
                BusinessLogic.lnDoors _LM = new BusinessLogic.lnDoors();
                return Json(_LM.UpdateDoors(uDoors));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult DoorsPrices()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.DoorPrice = "active";
            BusinessLogic.lnDoorsPrices _LP = new BusinessLogic.lnDoorsPrices();

            var mDoorsPrices = _LP.GetAllDoorsPrices();
            ViewBag.mDoorsPrices = mDoorsPrices;
            var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
            ViewBag.ListDoorsPrices = serializar.Serialize(mDoorsPrices);

            ViewBag.mStatus = _LNStatus.GetAllStatus();
            ViewBag.cbDoorStyle = _LNDoorStile.GetAllDoorStyle();
            ViewBag.cbMatarial = _LNMaterial.GetAllMaterial();
            return View();
        }

        [HttpPost]
        public ActionResult InsertDoorPrice(DoorsPrices pDoorPrice)
        {
            try
            {

                pDoorPrice.CreationDate = DateTime.Now;
                pDoorPrice.ModificationDate = DateTime.Now;
                BusinessLogic.lnDoorsPrices _LP = new BusinessLogic.lnDoorsPrices();
                return Json(_LP.InsertDoorsPrices(pDoorPrice));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult UpdateDoorPrice(DoorsPrices uDoorPrice)
        {
            try
            {

                uDoorPrice.CreationDate = DateTime.Now;
                uDoorPrice.ModificationDate = DateTime.Now;
                BusinessLogic.lnDoorsPrices _LP = new BusinessLogic.lnDoorsPrices();
                return Json(_LP.UpdateDoorsPrices(uDoorPrice));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        
        public ActionResult Index()
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

        [HttpPost]
        public ActionResult InsertDoorStyle(DoorStyle pDoorStyle)
        {
            try
            {

                pDoorStyle.CreationDate = DateTime.Now;
                pDoorStyle.ModificationDate = DateTime.Now;
                BusinessLogic.lnDoorStyle _LA = new BusinessLogic.lnDoorStyle();
                return Json(_LA.InsertDoorStyle(pDoorStyle));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult UpdateDoorStyle(DoorStyle uDoorStyle)
        {
            try
            {

                uDoorStyle.CreationDate = DateTime.Now;
                uDoorStyle.ModificationDate = DateTime.Now;
                BusinessLogic.lnDoorStyle _LA = new BusinessLogic.lnDoorStyle();
                return Json(_LA.UpdateDoorStyle(uDoorStyle));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult DoorStyleByInsideEdgeProfile()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.DoorStyleByInsideEdgeProfile = "active";
            return View();
        }

        public ActionResult DoorStyleByOutsideEdgeProfile()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.DoorStyleByOutsideEdgeProfile = "active";
            return View();
        }

        public ActionResult DoorByUser()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.DoorByUser = "active";
            BusinessLogic.lnDoorsxUser _LB = new BusinessLogic.lnDoorsxUser();
            ViewBag.mDoorxUser = _LB.GetAllDoorsxUser();
            ViewBag.mStatus = _LNStatus.GetAllStatus();
            return View();
        }

        public ActionResult Group()
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

        [HttpPost]
        public ActionResult InsertGroup(Group pGroup)
        {
            try
            {

                BusinessLogic.lnGroup _LC = new BusinessLogic.lnGroup();
                return Json(_LC.InsertGroup(pGroup));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult UpdateGroup(Group uGroup)
        {
            try
            {

                BusinessLogic.lnGroup _LC = new BusinessLogic.lnGroup();
                return Json(_LC.UpdateGroup(uGroup));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult HingeDirection()
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

        [HttpPost]
        public ActionResult InserHingeDirection(HingeDirection pHingeDirection)
        {
            try
            {

                pHingeDirection.CreationDate = DateTime.Now;
                pHingeDirection.ModificationDate = DateTime.Now;
                BusinessLogic.lnHingeDirection _LD = new BusinessLogic.lnHingeDirection();
                return Json(_LD.InsertHingeDirection(pHingeDirection));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult UpdateHingeDirection(HingeDirection uHingeDirection)
        {
            try
            {

                uHingeDirection.CreationDate = DateTime.Now;
                uHingeDirection.ModificationDate = DateTime.Now;
                BusinessLogic.lnHingeDirection _LD = new BusinessLogic.lnHingeDirection();
                return Json(_LD.UpdateHingeDirection(uHingeDirection));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult HingePositions()
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

        [HttpPost]
        public ActionResult InserHingePositions(HingePositions pHingePositions)
        {
            try
            {

                pHingePositions.CreationDate = DateTime.Now;
                pHingePositions.ModificationDate = DateTime.Now;
                BusinessLogic.lnHingePositions _LE = new BusinessLogic.lnHingePositions();
                return Json(_LE.InsertHingePositions(pHingePositions));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult UpdateHingePositions(HingePositions uHingePositions)
        {
            try
            {

                uHingePositions.CreationDate = DateTime.Now;
                uHingePositions.ModificationDate = DateTime.Now;
                BusinessLogic.lnHingePositions _LE = new BusinessLogic.lnHingePositions();
                return Json(_LE.UpdateHingePositions(uHingePositions));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult HorizontalDivisions()
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

        [HttpPost]
        public ActionResult InserHorizontalDivisions(HorizontalDivisions pHorizontalDivisions)
        {
            try
            {

                pHorizontalDivisions.CreationDate = DateTime.Now;
                pHorizontalDivisions.ModificationDate = DateTime.Now;
                BusinessLogic.lnHorizontalDivisions _LF = new BusinessLogic.lnHorizontalDivisions();
                return Json(_LF.InsertHorizontalDivisions(pHorizontalDivisions));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult UpdateHorizontalDivisions(HorizontalDivisions uHorizontalDivisions)
        {
            try
            {

                uHorizontalDivisions.CreationDate = DateTime.Now;
                uHorizontalDivisions.ModificationDate = DateTime.Now;
                BusinessLogic.lnHorizontalDivisions _LF = new BusinessLogic.lnHorizontalDivisions();
                return Json(_LF.UpdateHorizontalDivisions(uHorizontalDivisions));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult InsideEdgeProfile()
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

        [HttpPost]
        public ActionResult InsertInsideEdgeProfile(InsideEdgeProfile pInsideEdgeProfile)
        {
            try
            {

                pInsideEdgeProfile.CreationDate = DateTime.Now;
                pInsideEdgeProfile.ModificationDate = DateTime.Now;
                BusinessLogic.lnInsideEdgeProfile _LG = new BusinessLogic.lnInsideEdgeProfile();
                return Json(_LG.InsertInsideEdgeProfile(pInsideEdgeProfile));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult UpdateInsideEdgeProfile(InsideEdgeProfile uInsideEdgeProfile)
        {
            try
            {

                uInsideEdgeProfile.CreationDate = DateTime.Now;
                uInsideEdgeProfile.ModificationDate = DateTime.Now;
                BusinessLogic.lnInsideEdgeProfile _LG = new BusinessLogic.lnInsideEdgeProfile();
                return Json(_LG.UpdateInsideEdgeProfile(uInsideEdgeProfile));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult Join()
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

        [HttpPost]
        public ActionResult InsertJoin(Join pJoin)
        {
            try
            {

                pJoin.CreationDate = DateTime.Now;
                pJoin.ModificationDate = DateTime.Now;
                BusinessLogic.lnJoin _LH = new BusinessLogic.lnJoin();
                return Json(_LH.InsertJoin(pJoin));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult UpdateJoin(Join uJoin)
        {
            try
            {

                uJoin.CreationDate = DateTime.Now;
                uJoin.ModificationDate = DateTime.Now;
                BusinessLogic.lnJoin _LH = new BusinessLogic.lnJoin();
                return Json(_LH.UpdateJoin(uJoin));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult Material()
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

        [HttpPost]
        public ActionResult InsertMaterial(Material pMaterial)
        {
            try
            {

                pMaterial.CreationDate = DateTime.Now;
                pMaterial.ModificationDate = DateTime.Now;
                BusinessLogic.lnMaterial _LI = new BusinessLogic.lnMaterial();
                return Json(_LI.InsertMaterial(pMaterial));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult UpdateMaterial(Material uMaterial)
        {
            try
            {

                uMaterial.CreationDate = DateTime.Now;
                uMaterial.ModificationDate = DateTime.Now;
                BusinessLogic.lnMaterial _LI = new BusinessLogic.lnMaterial();
                return Json(_LI.UpdateMaterial(uMaterial));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult MaterialxBottomRail()
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

        [HttpPost]
        public ActionResult InsertMaterialxBottomRail(MaterialxBottomRail pMaterialxBottomRail)
        {
            try
            {

                pMaterialxBottomRail.CreationDate = DateTime.Now;
                pMaterialxBottomRail.ModificationDate = DateTime.Now;
                BusinessLogic.lnMaterialxBottomRail _LJ = new BusinessLogic.lnMaterialxBottomRail();
                return Json(_LJ.InsertMaterialxBottomRail(pMaterialxBottomRail));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult UpdateMaterialxBottomRail(MaterialxBottomRail uMaterialxBottomRail)
        {
            try
            {

                uMaterialxBottomRail.CreationDate = DateTime.Now;
                uMaterialxBottomRail.ModificationDate = DateTime.Now;
                BusinessLogic.lnMaterialxBottomRail _LJ = new BusinessLogic.lnMaterialxBottomRail();
                return Json(_LJ.UpdateMaterialxBottomRail(uMaterialxBottomRail));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult Order()
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

        [HttpPost]
        public ActionResult InsertOrder(Order pOrder)
        {
            try
            {

                pOrder.CreationDate = DateTime.Now;
                pOrder.ModificationDate = DateTime.Now;
                BusinessLogic.lnOrder _LK = new BusinessLogic.lnOrder();
                return Json(_LK.InsertOrder(pOrder));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult UpdateOrder(Order uOrder)
        {
            try
            {

                uOrder.CreationDate = DateTime.Now;
                uOrder.ModificationDate = DateTime.Now;
                BusinessLogic.lnOrder _LK = new BusinessLogic.lnOrder();
                return Json(_LK.UpdateOrder(uOrder));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult OutsideEdgeProfile()
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

        [HttpPost]
        public ActionResult InsertOutsideEdgeProfile(OutsideEdgeProfile pOutsideEdgeProfiler)
        {
            try
            {

                pOutsideEdgeProfiler.CreationDate = DateTime.Now;
                pOutsideEdgeProfiler.ModificationDate = DateTime.Now;
                BusinessLogic.lnOutsideEdgeProfile _LL = new BusinessLogic.lnOutsideEdgeProfile();
                return Json(_LL.InsertOutsideEdgeProfile(pOutsideEdgeProfiler));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult UpdateOutsideEdgeProfile(OutsideEdgeProfile uOutsideEdgeProfiler)
        {
            try
            {

                uOutsideEdgeProfiler.CreationDate = DateTime.Now;
                uOutsideEdgeProfiler.ModificationDate = DateTime.Now;
                BusinessLogic.lnOutsideEdgeProfile _LL = new BusinessLogic.lnOutsideEdgeProfile();
                return Json(_LL.UpdateOutsideEdgeProfile(uOutsideEdgeProfiler));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult Panel()
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

        [HttpPost]
        public ActionResult InsertPanel(Panel pPanel)
        {
            try
            {

                pPanel.CreationDate = DateTime.Now;
                pPanel.ModificationDate = DateTime.Now;
                BusinessLogic.lnPanel _LX = new BusinessLogic.lnPanel();
                return Json(_LX.InsertPanel(pPanel));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult UpdatePanel(Panel uPanel)
        {
            try
            {

                uPanel.CreationDate = DateTime.Now;
                uPanel.ModificationDate = DateTime.Now;
                BusinessLogic.lnPanel _LX = new BusinessLogic.lnPanel();
                return Json(_LX.UpdatePanel(uPanel));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult PanelMaterial()
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

        [HttpPost]
        public ActionResult InsertPanelMaterial(PanelMaterial pPanelMaterial)
        {
            try
            {

                pPanelMaterial.CreationDate = DateTime.Now;
                pPanelMaterial.ModificationDate = DateTime.Now;
                BusinessLogic.lnPanelMaterial _PAC = new BusinessLogic.lnPanelMaterial();
                return Json(_PAC.InsertPanelMaterial(pPanelMaterial));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult UpdatePanelMaterial(PanelMaterial uPanelMaterial)
        {
            try
            {

                uPanelMaterial.CreationDate = DateTime.Now;
                uPanelMaterial.ModificationDate = DateTime.Now;
                BusinessLogic.lnPanelMaterial _PAC = new BusinessLogic.lnPanelMaterial();
                return Json(_PAC.UpdatePanelMaterial(uPanelMaterial));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult Person()
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

        [HttpPost]
        public ActionResult InsertPerson(Person pPerson)
        {
            try
            {

                pPerson.CreationDate = DateTime.Now;
                pPerson.ModificationDate = DateTime.Now;
                BusinessLogic.lnPerson _PAX = new BusinessLogic.lnPerson();
                return Json(_PAX.InsertPerson(pPerson));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult UpdatePerson(Person uPerson)
        {
            try
            {

                uPerson.CreationDate = DateTime.Now;
                uPerson.ModificationDate = DateTime.Now;
                BusinessLogic.lnPerson _PAX = new BusinessLogic.lnPerson();
                return Json(_PAX.UpdatePerson(uPerson));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult Preparation()
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

        [HttpPost]
        public ActionResult InsertPreparation(Preparation pPreparation)
        {
            try
            {

                pPreparation.CreationDate = DateTime.Now;
                pPreparation.ModificationDate = DateTime.Now;
                BusinessLogic.lnPreparation _JFK = new BusinessLogic.lnPreparation();
                return Json(_JFK.InsertPreparation(pPreparation));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult UpdatePreparation(Preparation uPreparation)
        {
            try
            {

                uPreparation.CreationDate = DateTime.Now;
                uPreparation.ModificationDate = DateTime.Now;
                BusinessLogic.lnPreparation _JFK = new BusinessLogic.lnPreparation();
                return Json(_JFK.UpdatePreparation(uPreparation));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }


        public ActionResult Status()
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

        [HttpPost]
        public ActionResult InsertStatus(Status pStatus)
        {
            try
            {

                BusinessLogic.lnStatus _LNStatus = new BusinessLogic.lnStatus();
                return Json(_LNStatus.InsertStatus(pStatus));

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
                return Json(_LNStatus.UpdateStatus(uStatus));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult TopRail()
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

        [HttpPost]
        public ActionResult InsertTopRail(TopRail pTopRail)
        {
            try
            {

                pTopRail.CreationDate = DateTime.Now;
                pTopRail.ModificationDate = DateTime.Now;
                BusinessLogic.lnTopRail _TOP = new BusinessLogic.lnTopRail();
                return Json(_TOP.InsertTopRail(pTopRail));

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
                return Json(_TOP.UpdateTopRail(uTopRail));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult TopRailByHorizontalDivisions()
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

        [HttpPost]
        public ActionResult InsertTopRailxHorizontalDivisions(TopRailxHorizontalDivisions pTopRailByHorizontalDivisions)
        {
            try
            {

                pTopRailByHorizontalDivisions.CreationDate = DateTime.Now;
                pTopRailByHorizontalDivisions.ModificationDate = DateTime.Now;
                BusinessLogic.lnTopRailxHorizontalDivisions _TAP = new BusinessLogic.lnTopRailxHorizontalDivisions();
                return Json(_TAP.InsertTopRailxHorizontalDivisions(pTopRailByHorizontalDivisions));

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
                return Json(_TAP.UpdateTopRailxHorizontalDivisions(uTopRailByHorizontalDivisions));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult TopRailByJoin()
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

        [HttpPost]
        public ActionResult InsertTopRailByJoin(TopRailxJoin pTopRailByJoin)
        {
            try
            {

                pTopRailByJoin.CreationDate = DateTime.Now;
                pTopRailByJoin.ModificationDate = DateTime.Now;
                BusinessLogic.lnTopRailxJoin _TEP = new BusinessLogic.lnTopRailxJoin();
                return Json(_TEP.InsertTopRailxJoin(pTopRailByJoin));

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
                return Json(_TEP.UpdateTopRailxJoin(uTopRailByJoin));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult TopRailByVerticalDivisions()
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

        [HttpPost]
        public ActionResult InsertTopRailByVerticalDivisions(TopRailxVerticalDivisions pTopRailByVerticalDivisions)
        {
            try
            {

                pTopRailByVerticalDivisions.CreationDate = DateTime.Now;
                pTopRailByVerticalDivisions.ModificationDate = DateTime.Now;
                BusinessLogic.lnTopRailxVerticalDivisions _TUP = new BusinessLogic.lnTopRailxVerticalDivisions();
                return Json(_TUP.InsertTopRailxVerticalDivisions(pTopRailByVerticalDivisions));

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
                return Json(_TUP.UpdateTopRailxVerticalDivisions(uTopRailByVerticalDivisions));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult Type()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.Type = "active";
            BusinessLogic.lnType _LBL = new BusinessLogic.lnType();
            ViewBag.cbGroup = _LNGroup.GetAllGroup();
            ViewBag.mStatus = _LNStatus.GetAllStatus();

            var mType = _LBL.GetAllType();
            ViewBag.mType = mType;
            var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
            ViewBag.ListType = serializar.Serialize(mType);
            
            return View();
        }

        [HttpPost]
        public ActionResult InsertType(Model.Type pTypes)
        {
            try
            {

                pTypes.CreationDate = DateTime.Now;
                pTypes.ModificationDate = DateTime.Now;
                BusinessLogic.lnType _LBL = new BusinessLogic.lnType();
                return Json(_LBL.InsertType(pTypes));

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
                return Json(_LBL.UpdateType(uTypes));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult Usuario()
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

        [HttpPost]
        public ActionResult InsertUsuario(User pUsuario)
        {
            try
            {

                pUsuario.CreationDate = DateTime.Now;
                pUsuario.ModificationDate = DateTime.Now;
                BusinessLogic.lnUser _USB = new BusinessLogic.lnUser();
                return Json(_USB.InsertUser(pUsuario));

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
                return Json(_USB.UpdateUser(uUsuario));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult VerticalDivisions()
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

        [HttpPost]
        public ActionResult InsertVerticalDivisions(VerticalDivisions pVerticalDivisions)
        {
            try
            {

                pVerticalDivisions.CreationDate = DateTime.Now;
                pVerticalDivisions.ModificationDate = DateTime.Now;
                BusinessLogic.lnVerticalDivisions _UCB = new BusinessLogic.lnVerticalDivisions();
                return Json(_UCB.InsertVerticalDivisions(pVerticalDivisions));

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
                return Json(_UCB.UpdateVerticalDivisions(uVerticalDivisions));

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
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

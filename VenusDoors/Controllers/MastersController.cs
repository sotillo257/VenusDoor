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
            //ViewBag.cbStileWidth = _LNStileWidth.GetAllStileWidth();
            //ViewBag.cbRailWidth = _LNRailWidth.GetAllRailWidth();
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
            //ViewBag.cbStileWidth = _LNStileWidth.GetAllStileWidth();
            //ViewBag.cbRailWidth = _LNRailWidth.GetAllRailWidth();
            return View();
        }

        public ActionResult Index()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.DoorStyle = "active";
            BusinessLogic.lnDoorStyle _LA = new BusinessLogic.lnDoorStyle();

            var mDoorsStyle = _LA.GetAllDoorStyle();
            ViewBag.mDoorsStyle = mDoorsStyle;
            var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
            ViewBag.ListDoorStyle = serializar.Serialize(mDoorsStyle);
            return View();
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

        public ActionResult Join()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.Join = "active";
            BusinessLogic.lnJoin _LH = new BusinessLogic.lnJoin();
            ViewBag.mJoin = _LH.GetAllJoin();
            ViewBag.mStatus = _LNStatus.GetAllStatus();
            return View();
        }

        public ActionResult Material()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.Material = "active";
            BusinessLogic.lnMaterial _LI = new BusinessLogic.lnMaterial();
            ViewBag.mMaterial = _LI.GetAllMaterial();
            ViewBag.mStatus = _LNStatus.GetAllStatus();
            return View();
        }

        public ActionResult MaterialxBottomRail()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.MaterialxBottomRail = "active";
            BusinessLogic.lnMaterialxBottomRail _LJ = new BusinessLogic.lnMaterialxBottomRail();
            ViewBag.mMaterialxBottomRail = _LJ.GetAllMaterialxBottomRail();
            ViewBag.mStatus = _LNStatus.GetAllStatus();
            ViewBag.cbMatarial = _LNMaterial.GetAllMaterial();
            ViewBag.cbBottomRail = _LNBottomRail.GetAllBottomRail();
            return View();
        }

        public ActionResult Order()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.Order = "active";
            BusinessLogic.lnOrder _LK = new BusinessLogic.lnOrder();
            ViewBag.mOrder = _LK.GetAllOrder();
            ViewBag.mStatus = _LNStatus.GetAllStatus();
            ViewBag.cbUser = _LNUser.GetAllUser();
            ViewBag.cbType = _LNType.GetAllType();
            return View();
        }

        public ActionResult OutsideEdgeProfile()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.OutsideEdgeProfile = "active";
            BusinessLogic.lnOutsideEdgeProfile _LL = new BusinessLogic.lnOutsideEdgeProfile();
            ViewBag.mOutsideEdgeProfile = _LL.GetAllOutsideEdgeProfile();
            ViewBag.mStatus = _LNStatus.GetAllStatus();
            return View();
        }

        public ActionResult Panel()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.Panel = "active";
            BusinessLogic.lnPanel _LX = new BusinessLogic.lnPanel();
            ViewBag.mPanel = _LX.GetAllPanel();
            ViewBag.mStatus = _LNStatus.GetAllStatus();
            return View();
        }
        public ActionResult PanelMaterial()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.PanelMaterial = "active";
            BusinessLogic.lnPanelMaterial _PAC = new BusinessLogic.lnPanelMaterial();
            ViewBag.mPanelMaterial = _PAC.GetAllPanelMaterial();
            ViewBag.mStatus = _LNStatus.GetAllStatus();
            return View();
        }

        public ActionResult Person()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.Person = "active";
            BusinessLogic.lnPerson _PAX = new BusinessLogic.lnPerson();
            ViewBag.mPerson = _PAX.GetAllPerson();            
            ViewBag.mStatus = _LNStatus.GetAllStatus();
            return View();
        }

        public ActionResult Preparation()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.Preparation = "active";
            BusinessLogic.lnPreparation _JFK = new BusinessLogic.lnPreparation();
            ViewBag.mPreparation = _JFK.GetAllPreparation();
            ViewBag.mStatus = _LNStatus.GetAllStatus();
            return View();
        }

        public ActionResult RailWidth()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.RailWidth = "active";
            //BusinessLogic.lnRailWidth _JES = new BusinessLogic.lnRailWidth();
            //ViewBag.mRailWidth = _JES.GetAllRailWidth();
            ViewBag.mStatus = _LNStatus.GetAllStatus();
            return View();
        }

        public ActionResult Status()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.Status = "active";
            BusinessLogic.lnStatus _LNStatus = new BusinessLogic.lnStatus();
            ViewBag.mStatus = _LNStatus.GetAllStatus();
            ViewBag.cbGroup = _LNGroup.GetAllGroup();
            return View();
        }

        public ActionResult StileWidth()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.StileWidth = "active";
            //BusinessLogic.lnStileWidth _GRE = new BusinessLogic.lnStileWidth();
            //ViewBag.mStileWidth = _GRE.GetAllStileWidth();
            ViewBag.mStatus = _LNStatus.GetAllStatus();
            return View();
        }

        public ActionResult TopRail()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.TopRail = "active";
            BusinessLogic.lnTopRail _TOP = new BusinessLogic.lnTopRail();
            ViewBag.mTopRail = _TOP.GetAllTopRail();
            ViewBag.mStatus = _LNStatus.GetAllStatus();
            return View();
        }

        public ActionResult TopRailByHorizontalDivisions()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.TopRailByHorizontalDivisions = "active";
            BusinessLogic.lnTopRailxHorizontalDivisions _TAP = new BusinessLogic.lnTopRailxHorizontalDivisions();
            ViewBag.mTopRailByHorizontalDivisions = _TAP.GetAllTopRailxHorizontalDivisions();
            ViewBag.mStatus = _LNStatus.GetAllStatus();
            ViewBag.cbTopRail = _LNTopRail.GetAllTopRail();
            ViewBag.cbHorizontalDivisions = _LNHorizontalDivisions.GetAllHorizontalDivisions();
            return View();
        }

        public ActionResult TopRailByJoin()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.TopRailByJoin = "active";
            BusinessLogic.lnTopRailxJoin _TEP = new BusinessLogic.lnTopRailxJoin();
            ViewBag.mTopRailByJoin = _TEP.GetAllTopRailxJoin();
            ViewBag.mStatus = _LNStatus.GetAllStatus();
            ViewBag.cbTopRail = _LNTopRail.GetAllTopRail();
            ViewBag.cbJoin = _LNJoin.GetAllJoin();
            return View();
        }

        public ActionResult TopRailByVerticalDivisions()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.TopRailByVerticalDivisions = "active";
            BusinessLogic.lnTopRailxVerticalDivisions _TUP = new BusinessLogic.lnTopRailxVerticalDivisions();
            ViewBag.mTopRailByVerticalDivisions = _TUP.GetAllTopRailxVerticalDivisions();
            ViewBag.mStatus = _LNStatus.GetAllStatus();
            ViewBag.cbTopRail = _LNTopRail.GetAllTopRail();
            ViewBag.cbVerticalDivisions = _LNVerticalDivisions.GetAllVerticalDivisions();
            return View();
        }

        public ActionResult Type()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.Type = "active";
            BusinessLogic.lnType _LBL = new BusinessLogic.lnType();
            ViewBag.mType = _LBL.GetAllType();
            ViewBag.mStatus = _LNStatus.GetAllStatus();
            ViewBag.cbGroup = _LNGroup.GetAllGroup();
            return View();
        }

        public ActionResult Usuario()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.Usuario = "active";
            BusinessLogic.lnUser _USB = new BusinessLogic.lnUser();
            ViewBag.mUsuario = _USB.GetAllUser();
            ViewBag.mStatus = _LNStatus.GetAllStatus();
            ViewBag.cbType = _LNType.GetAllType();
            ViewBag.cbPerson = _LNPerson.GetAllPerson();
            return View();
        }

        public ActionResult VerticalDivisions()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.VerticalDivisions = "active";
            BusinessLogic.lnVerticalDivisions _USB = new BusinessLogic.lnVerticalDivisions();
            ViewBag.mVerticalDivisions = _USB.GetAllVerticalDivisions();
            ViewBag.mStatus = _LNStatus.GetAllStatus();
            return View();
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

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
                return Json(xDP);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
            
        }
        
        [HttpPost]
        public ActionResult UploadExcel()
        {

            try
            {

                if (Session["UserID"] == null)                
                {
                    return Json(false);
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


                         if (file.FileName.EndsWith(".xlsx"))
                        {
                            reader = ExcelReaderFactory.CreateOpenXmlReader(stream);
                            BusinessLogic.lnDoorsxUser lnDoorxUsers = new BusinessLogic.lnDoorsxUser();                            
                            return Json(lnDoorxUsers.UploadExcel(reader, (int)Session["UserID"]));
                        }
                        else
                        {
                            return Json(false);
                        }


                    }
                }
            }
            catch (Exception ex)
            {
                return Json(false);
            }

            return Json(true);

        }


        public ActionResult InsertDoorsxUser(DoorsxUser pDoorsxUser, HingePositions HingeP, Order Ord)
        {
            if (Session["UserID"] == null)
            {

                return Json(false, JsonRequestBehavior.AllowGet);
            }
            else
            {
        BusinessLogic.lnDoorsxUser ln = new BusinessLogic.lnDoorsxUser();
        
        return Json(ln.InsertarDoors(pDoorsxUser, HingeP, Ord,(int)Session["UserID"]), JsonRequestBehavior.AllowGet);
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


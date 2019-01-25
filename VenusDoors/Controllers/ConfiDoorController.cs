using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Model;
using System.Net.Mail;

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
        public ActionResult UpdateOrderExist(Order item, DoorsxUser pDoorsxUser)
        {
            BusinessLogic.lnOrder _LNUPor = new BusinessLogic.lnOrder();
            item.Quantity = item.Quantity + pDoorsxUser.Quantity;
            item.Total = item.Total + pDoorsxUser.SubTotal;
            return Json(_LNUPor.UpdateOrder(item));
        }

        public ActionResult InsertDoorsxUser(DoorsxUser pDoorsxUser, HingePositions pHP, RailThickness RailThick)
        {
            if (Session["UserID"] == null)
            {

                return View();
            }
            else
            {
                BusinessLogic.lnOrder _LNOrder = new BusinessLogic.lnOrder();
                BusinessLogic.lnHingePositions _LNHP = new BusinessLogic.lnHingePositions();
                BusinessLogic.lnDoorsPrices _DP = new BusinessLogic.lnDoorsPrices();
                
                var xDoorsP = _DP.GetAllDoorsPrices();
                var PriceByOptions = xDoorsP.Where(x => x.RailThickness.Id == RailThick.Id && x.Material.Id == pDoorsxUser.Material.Id && x.DoorStyle.Id == pDoorsxUser.DoorStyle.Id).ToList();
                ViewBag.xDoorPrice = PriceByOptions;

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
                            Status = new Model.Status() { Id = 1 },
                            Type = new Model.Type() { Id = 1 },
                            Quantity = pDoorsxUser.Quantity,
                            Total = pDoorsxUser.SubTotal,
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
                            Position1 = pHP.Position1,
                            Position2 = pHP.Position2,
                            Position3 = pHP.Position3,
                            Position4 = pHP.Position4,
                            Position5 = pHP.Position5,
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
                else if (item.Status.Id == 1)
                {
                    try
                    {
                        HingePositions newhp = new HingePositions()
                        {
                            Status = new Model.Status() { Id = 1 },
                            Position1 = pHP.Position1,
                            Position2 = pHP.Position2,
                            Position3 = pHP.Position3,
                            Position4 = pHP.Position4,
                            Position5 = pHP.Position5,
                            CreationDate = DateTime.Now,
                            CreatorUser = userID,
                            ModificationDate = DateTime.Now,
                            ModificationUser = userID
                        };

                        int IdHingeP = _LNHP.InsertHingePositions(newhp);
                        newhp.Id = IdHingeP;

                        UpdateOrderExist(item, pDoorsxUser);
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
                else if (item.Status.Id == 2)
                {
                    try
                    {
                        Order neworder = new Order()
                        {
                            User = new Model.User() { Id = userID },
                            Status = new Model.Status() { Id = 1 },
                            Type = new Model.Type() { Id = 1 },
                            Quantity = pDoorsxUser.Quantity,
                            Total = pDoorsxUser.SubTotal,
                            CreationDate = DateTime.Now,
                            CreatorUser = userID,
                            ModificationDate = DateTime.Now,
                            ModificationUser = userID
                        };

                        int IdOrder = _LNOrder.InsertOrder(neworder);

                        HingePositions newhp = new HingePositions()
                        {
                            Status = new Model.Status() { Id = 1 },
                            Position1 = "1",
                            Position2 = "2",
                            Position3 = "3",
                            Position4 = "4",
                            Position5 = "5",
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
                else
                {
                    return View();
                }

            }
        }

    }
}


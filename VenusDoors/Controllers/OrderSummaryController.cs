using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Model;

namespace VenusDoors.Controllers
{
    public class OrderSummaryController : Controller
    {
        // GET: OrderSummary
        public ActionResult Index()
        {
            ViewBag.OrderSummary = "active";
            return View();
        }

        [HttpPost]
        public ActionResult InsertOrder(DoorsxUser pDoorUser)
        {
            try
            {
                Order order = new Order() {
                    IdUser = 6,
                    IdStatus = 1,
                    IdType = 1,
                    Total = 100,
                    Quantity = 2,
                    CreationDate = DateTime.Now,
                    CreatorUser = 6,
                    ModificationDate = DateTime.Now,
                    ModificationUser = 6

                };

                BusinessLogic.lnOrder _LNOrder = new BusinessLogic.lnOrder();
                int IdOrder = _LNOrder.InsertOrder(order);
                pDoorUser.IdOrder = IdOrder;
                BusinessLogic.lnDoorsxUser _LN = new BusinessLogic.lnDoorsxUser();
                return Json(_LN.InsertDoorsxUser(pDoorUser));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
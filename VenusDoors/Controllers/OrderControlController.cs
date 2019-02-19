using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Model;

namespace VenusDoors.Controllers
{
    public class OrderControlController : Controller
    {
        BusinessLogic.lnOrder _LNOR = new BusinessLogic.lnOrder();

        // GET: OrderControl
        public ActionResult Index()
        {            
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.OrderControl = "active";
               
                List<Order> ListOrders = _LNOR.GetAllOrder();
                List<Order> ListaOrdenada = ListOrders.OrderByDescending(x => x.ModificationDate).ToList();
                ViewBag.Ordenes = ListaOrdenada;
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        [HttpPost]
        public ActionResult ModifiyOrder()
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                ViewBag.OrderControl = "active";
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }
    }
}
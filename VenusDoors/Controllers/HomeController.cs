using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Model;
using System.Globalization;

namespace VenusDoors.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            try
            {
                if (Session["UserID"] != null)
                {
                    if ((int)Session["UserType"] == 1)
                    {
                        return RedirectToAction("Dashboard", "Home");

                    }
                    else if ((int)Session["UserType"] == 2)
                    {
                        BusinessLogic.lnOrder order = new BusinessLogic.lnOrder();
                        var list = order.GetOrderByUser((int)Session["UserID"]).ToList();
                        if (list.Count > 0)
                        {
                            if (list.Where(x => x.Status.Id == 4).ToList().Count > 0)
                            {
                                return RedirectToAction("DashboardUser", "Home");
                            }
                        }
                       

                    }
                }
                ViewBag.Dashboard = "active";
                BusinessLogic.lnDoors _LN = new BusinessLogic.lnDoors();
                List<Doors> Door = _LN.GetAllDoors();
                ViewBag.ListDoors = Door;
                var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
                ViewBag.ListDoor = serializar.Serialize(Door);

                return View();

            }
            catch (Exception ex)
            {
                return View("Error");
            }
           
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Dashboard()
        {
            try
            {
                DateTime hoy = DateTime.Now;

                string mes = hoy.ToString("MMMM"); //te da el nombre completo en la cultura default
                ViewBag.Dashboard = "active";
                ViewBag.lblMes = hoy.ToString("MMMM", CultureInfo.CreateSpecificCulture("en-US")); //en ingles

                ViewBag.lblMesAnterior = hoy.AddMonths(-1).ToString("MMMM", CultureInfo.CreateSpecificCulture("en-US"));

                BusinessLogic.lnOrder Order = new BusinessLogic.lnOrder();                
                var totales = Order.GetAllTotales();
                ViewBag.TotalHistorico = totales.TotalHistorico;
                ViewBag.Mes = totales.TotalMes;
                ViewBag.MesAnterior = totales.TotalMesAnterior;
                if (totales.TotalMes > totales.TotalMesAnterior)
                {
                    ViewBag.Estado = true;
                }
                else
                {
                    ViewBag.Estado = false;
                }
                List<decimal> listTotal = new List<decimal>();
                if (totales.Enero > 0)
                {
                    listTotal.Add(totales.Enero);
                }
                if (totales.Febrero > 0)
                {
                    listTotal.Add(totales.Febrero);
                }
                if (totales.Marzo > 0)
                {
                    listTotal.Add(totales.Marzo);
                }
                if (totales.Abril > 0)
                {
                    listTotal.Add(totales.Abril);
                }
                if (totales.Mayo > 0)
                {
                    listTotal.Add(totales.Mayo);
                }
                if (totales.Junio > 0)
                {
                    listTotal.Add(totales.Junio);
                }
                if (totales.Julio > 0)
                {
                    listTotal.Add(totales.Junio);
                }
                if (totales.Agosto > 0)
                {
                    listTotal.Add(totales.Agosto);
                }
                if (totales.Septiembre > 0)
                {
                    listTotal.Add(totales.Septiembre);
                }
                if (totales.Octubre > 0)
                {
                    listTotal.Add(totales.Octubre);
                }
                if (totales.Noviembre > 0)
                {
                    listTotal.Add(totales.Noviembre);
                }
                if (totales.Diciembre > 0)
                {
                    listTotal.Add(totales.Diciembre);
                }
                ViewBag.MejorMes = listTotal.Average().ToString("N2");
                return View();
            }
            catch (Exception ex)
            {
                return View("Error");
            }

        }

        public ActionResult Doors() {
            try
            {
                ViewBag.Doors = "active";
                BusinessLogic.lnDoors _LN = new BusinessLogic.lnDoors();
                List<Doors> Door = _LN.GetAllDoors();
                ViewBag.ListDoors = Door;
                var serializar = new System.Web.Script.Serialization.JavaScriptSerializer();
                ViewBag.ListDoor = serializar.Serialize(Door);

                return View();
            }
            catch (Exception)
            {
                return View("Error");
            }
           
        }

        public ActionResult DashboardUser()
        {
            try
            {
                if (Session["UserID"] == null)
                {
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    ViewBag.Dashboard = "active";
                    int userID = (int)Session["UserID"];

                    //Get last Order 
                    BusinessLogic.lnOrder _LNO = new BusinessLogic.lnOrder();
                    var getOr = _LNO.GetAllOrder();
                    var LastOrder = getOr.Where(x => x.Status.Id != 9 && x.User.Id == userID).OrderByDescending(x => x.ModificationDate).FirstOrDefault();
                    ViewBag.LastOrder = LastOrder;

                    if (LastOrder != null)
                    {
                        //Get Doors in the last Order
                        BusinessLogic.lnDoorsxUser _LN = new BusinessLogic.lnDoorsxUser();
                        var xDoorsU = _LN.GetAllDoorsxUser();
                        DoorsxUser doorByOrder = xDoorsU.Where(x => x.Order.Id == LastOrder.Id).OrderByDescending(x => x.CreationDate).FirstOrDefault();
                        ViewBag.xUserDoors = doorByOrder;
                    }

                    //Get List Order
                    List<Order> ListOrders = _LNO.GetAllOrder();
                    List<Order> OrdersByU = ListOrders.Where(x => x.User.Id == userID).OrderByDescending(x => x.ModificationDate).ToList();
                    if (OrdersByU.Count == 0)
                    {
                        ViewBag.ListO = null;
                    }
                    else
                    {
                        ViewBag.ListO = OrdersByU;
                    }

                    return View();

                }
            }
            catch (Exception)
            {
                return View("Error");
            }

        }
    }
}
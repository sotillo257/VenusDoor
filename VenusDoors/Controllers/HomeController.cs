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

                ViewBag.lblMes = hoy.ToString("MMMM", CultureInfo.CreateSpecificCulture("en-US")); //en ingles

                BusinessLogic.lnOrder Order = new BusinessLogic.lnOrder();                
                var totales = Order.GetAllTotales();
                ViewBag.TotalHistorico = totales.TotalHistorico;
                ViewBag.Mes = totales.TotalMes;
                ViewBag.MejorMes = totales.TotalMesAnterior;
                if (totales.TotalMes > totales.TotalMesAnterior)
                {
                    ViewBag.Estado = true;
                }
                else
                {
                    ViewBag.Estado = false;
                }
                List<decimal> listTotal = new List<decimal>();
                listTotal.Add(totales.Enero);
                listTotal.Add(totales.Febrero);
                listTotal.Add(totales.Marzo);
                listTotal.Add(totales.Abril);
                listTotal.Add(totales.Mayo);
                listTotal.Add(totales.Junio);
                listTotal.Add(totales.Julio);
                listTotal.Add(totales.Agosto);
                listTotal.Add(totales.Septiembre);
                listTotal.Add(totales.Octubre);
                listTotal.Add(totales.Noviembre);
                listTotal.Add(totales.Diciembre);
                var resul = listTotal.Max();
                return View();
            }
            catch (Exception ex)
            {
                return View("Error");
            }

        }
    }
}
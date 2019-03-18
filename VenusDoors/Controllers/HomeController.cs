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
        //[Authorize]
        public ActionResult Index()
        {
            try
            {
                if (Session["UserID"] != null)
                {
                    if ((int)Session["UserType"] == 1 || (int)Session["UserType"] == 2)
                    {
                        return RedirectToAction("Dashboard", "Home");

                    }
                    else if ((int)Session["UserType"] == 3)
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

        [Authorize(Roles = "1, 2")]
        public ActionResult Dashboard(int? Id)
        {
            try
            {
                if (Session["UserID"] == null)
                {
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    if (Id != null)
                    {
                        if ((int)Session["UserType"] == 1)
                        {
                            if (Id > 0)
                        {
                           
                                System.Web.HttpContext.Current.Session["CompanyActive"] = Id;
                                BusinessLogic.lnCompany comp = new BusinessLogic.lnCompany();
                                Company company = comp.GetCompanyById((int)Id);
                                System.Web.HttpContext.Current.Session["NameCompany"] = company.Name;
                                System.Web.HttpContext.Current.Session["IdCompany"] = company.Id;
                                System.Web.HttpContext.Current.Session["CompanyLogo"] = company.Logo;
                                System.Web.HttpContext.Current.Session["IdTypeCompany"] = 2;
                            
                        }
                        else
                        {
                            System.Web.HttpContext.Current.Session["NameCompany"] = "All Companies";
                                System.Web.HttpContext.Current.Session["CompanyLogo"] = "/Content/img/img11.jpg";
                                BusinessLogic.lnUser user = new BusinessLogic.lnUser();
                            Model.User _user = user.GetUserById((int)Session["UserID"]);
                            System.Web.HttpContext.Current.Session["IdCompany"] = _user.Company.Id;
                            System.Web.HttpContext.Current.Session["IdTypeCompany"] = 1;
                        }
                        }

                    }
                DateTime hoy = DateTime.Now;
                string mes = hoy.ToString("MMMM"); //te da el nombre completo en la cultura default
                ViewBag.Dashboard = "active";
                ViewBag.lblMes = hoy.ToString("MMMM", CultureInfo.CreateSpecificCulture("en-US")); //en ingles

                ViewBag.lblMesAnterior = hoy.AddMonths(-1).ToString("MMMM", CultureInfo.CreateSpecificCulture("en-US"));
                BusinessLogic.lnDoors doors = new BusinessLogic.lnDoors();
                var TotalesDoors = doors.GetTotalesDoors((int)Session["IdCompany"], (int)Session["IdTypeCompany"]);
                ViewBag.doors = TotalesDoors;
                var aux = TotalesDoors;
                var aux2 = aux.Active + aux.Approve + aux.Completed + aux.InProcess + aux.Pending;
                    var aux3 = aux.DoorApprove + aux.DoorCompleted + aux.DoorInProcess + aux.DoorPending;
                ViewBag.totalOrdenes = aux2;
                TotalesDoors TD = new TotalesDoors();
                    decimal uu = 0;
                    decimal yy = 0;
                    decimal zz = 0;
                    decimal ii = 0;
                    decimal x = 0;
                    decimal u = 0;
                    decimal y = 0;
                    decimal z = 0;
                    decimal i = 0;
                    if (aux3 > 0)
                    {
                         uu = decimal.Parse(aux.DoorPending.ToString()) / decimal.Parse(aux3.ToString()) * 100;
                         yy = decimal.Parse(aux.DoorApprove.ToString()) / decimal.Parse(aux3.ToString()) * 100;
                         zz = decimal.Parse(aux.DoorInProcess.ToString()) / decimal.Parse(aux3.ToString()) * 100;
                         ii = decimal.Parse(aux.DoorCompleted.ToString()) / decimal.Parse(aux3.ToString()) * 100;
                    }
                    if (aux2 > 0)
                    {
                         x = decimal.Parse(aux.Active.ToString()) / decimal.Parse(aux2.ToString()) * 100;
                         u = decimal.Parse(aux.Pending.ToString()) / decimal.Parse(aux2.ToString()) * 100;
                         y = decimal.Parse(aux.Approve.ToString()) / decimal.Parse(aux2.ToString()) * 100;
                         z = decimal.Parse(aux.InProcess.ToString()) / decimal.Parse(aux2.ToString()) * 100;
                         i = decimal.Parse(aux.Completed.ToString()) / decimal.Parse(aux2.ToString()) * 100;
                    }                 
                    
                    bool bande = true;
                    x = decimal.Parse(x.ToString("N0"));
                    while (bande)
                    {
                        if (x % 5 == 0)
                        {
                            bande = false;
                        }
                        else
                        {
                            x = decimal.Parse(x.ToString("N0")) + 1m;    
                        }
                    }
                    bande = true;
                    u = decimal.Parse(u.ToString("N0"));
                    while (bande)
                    {
                        if (u % 5 == 0)
                        {
                            bande = false;
                        }
                        else
                        {
                            u = decimal.Parse(u.ToString("N0")) + 1m;
                        }
                    }
                    bande = true;
                    y = decimal.Parse(y.ToString("N0"));
                    while (bande)
                    {
                        if (y % 5 == 0)
                        {
                            bande = false;
                        }
                        else
                        {
                            y = decimal.Parse(y.ToString("N0")) + 1m;
                        }
                    }
                    bande = true;
                    z = decimal.Parse(z.ToString("N0"));
                    while (bande)
                    {
                        if (z % 5 == 0)
                        {
                            bande = false;
                        }
                        else
                        {
                            z = decimal.Parse(z.ToString("N0")) + 1m;
                        }
                    }
                    bande = true;
                    i = decimal.Parse(i.ToString("N0"));
                    while (bande)
                    {
                        if (i % 5 == 0)
                        {
                            bande = false;
                        }
                        else
                        {
                            i = decimal.Parse(i.ToString("N0")) + 1m;
                        }
                    }

                    ViewBag.Active = "wd-"+x.ToString("N0")+"p";
                ViewBag.Pending = "wd-" + u.ToString("N0") + "p";
                ViewBag.Approve = "wd-" + y.ToString("N0") + "p";
                ViewBag.InProcess = "wd-" + z.ToString("N0") + "p";
                ViewBag.Completed = "wd-" + i.ToString("N0") + "p";
                ViewBag.doorsPorcentaje = TD;
                    ViewBag.DoorPending =  uu.ToString("N2") + "% of the doors";
                    ViewBag.DoorApprove =  yy.ToString("N2") + "% of the doors";
                    ViewBag.DoorInProcess =  zz.ToString("N2") + "% of the doors";
                    ViewBag.DoorCompleted =  ii.ToString("N2") + "% of the doors";
                    BusinessLogic.lnOrder Order = new BusinessLogic.lnOrder();                
                var totales = Order.GetAllTotales((int)Session["IdCompany"], (int)Session["IdTypeCompany"]);
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
                    ViewBag.MejorMes = 0;
                    if (listTotal.Count > 0)
                    {
                        ViewBag.MejorMes = listTotal.Average().ToString("N2");
                    }
               
                return View();
            }
            }
            catch (Exception ex)
            {
                return View("Error");
            }

        }

        [Authorize]
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

        [Authorize]
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
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Model;
using System.Net.Mail;
using System.Text;

namespace VenusDoors.Controllers
{
    public class UserManagementController : Controller
    {
        BusinessLogic.lnUser _LNU = new BusinessLogic.lnUser();
        BusinessLogic.lnSendMail _SEND = new BusinessLogic.lnSendMail();
        // GET: UserManagement
        [Authorize(Roles = "1, 2")]
        public ActionResult Index()
        {

            List<User> Usuarios = _LNU.GetAllUserByCompany((int)Session["IdCompany"], (int)Session["IdTypeCompany"]);
            List<User> ListaUsuarios = Usuarios.Where(x => x.Status.Id == 2 || x.Status.Id == 12).OrderByDescending(x => x.ModificationDate).ToList();
            ViewBag.UserList = ListaUsuarios;
            return View();
            
        }
        [Authorize(Roles = "1, 2")]
        [HttpPost]
        public ActionResult UpdateUserStatus(User modUser)
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                int userID = (int)Session["UserID"];
                try
                {
                    BusinessLogic.lnUser _LNU = new BusinessLogic.lnUser();
                    BusinessLogic.lnPerson _LNP = new BusinessLogic.lnPerson();

                    modUser.ModificationDate = DateTime.Now;
                    modUser.ModificationUser = userID;                                      
                    var modOrderStatus = _LNU.UpdateUserStatus(modUser);

                    User pUser = _LNU.GetUserById(modUser.Id);
                    int idPerson = pUser.Person.Id;
                    pUser.Person = _LNP.GetPersonById(idPerson);
                    string message = "";
                    string subject = "Account registration process";
                    string FromTittle = "Venus Cabinet Doors Administration";
                    string typeMessage = "UserControl";
                    if (modUser.Status.Id == 1)
                    {
                        message += "<!DOCTYPE html><html style='height: 100 %; '><head></head><body style='height: 100 %; margin: 0; '><section style='width: 100 %; display: flex; justify - content: center; height: 100 %; '><div id='DivContent' style='width: 80 %; height: 100 %; '><div id='DivHeader' style='height: 20 %; '><div id='HeaderImg' style='justify - content: center; display: flex; align - items: center; '><img style='width: 200px; padding: 3px; height: 56px; ' src='http://app.venuscabinetdoors.com/Content/img/Venus_Doors11.png'></div><div id='HeaderTittle' style='display: flex;justify-content: center;'><h1 style='margin: 0;width: 100%;text-align: center;background: #014d41;padding: 15px;color: #fff;'>Account registration process</h1></div></div><div id='DivBody' style='height: 65%;'><div style='display: flex;justify-content: center;text-align: justify;height: 75%;'><p style='width: 80%;'>Congratulations "+ pUser.Person.Name + " "+ pUser.Person.Lastname + ", your account has been approved by one of our administrators.<br><br>Now you can start creating orders and customize your doors according to your preferences and needs.<br><br>This is an automatic message.</p></div><div style='display: flex; justify - content: center; height: 10 % '><a target='_blank' style='padding: 5px 17px; border: #15a04d solid 1px;color: #fff;border-radius: 5px;cursor: pointer;font-weight: bold;background: #035246;display: flex;justify-content: center;align-items: center;font-family: sans-serif;text-decoration: none' href='http://app.venuscabinetdoors.com/Logins'>LOG IN</a></div><div style='text-align: center;height: 25%;'><div style='display:flex; justify-content:center'><p style='width: 100%;'>Stay connected with us.</p></div><div></div><div style='display:flex; justify-content:center; align-items:center'><span><a href='https://www.facebook.com/Venus-Cabinet-Doors-171950720354840/' target='_blank' title='Venus Cabinet Doors on FB'><img style='width:5%' src='http://app.venuscabinetdoors.com/Content/img/fbICO.png'></a><a href='http://venuscabinetdoors.com/' target='_blank' style='margin-left: 5px;margin-right: 5px;'><img style='width:5%' title='Venus Cabinet Doors Homepage' src='http://app.venuscabinetdoors.com/Content/img/Venus_Doors11.ico'></a><a href='https://www.instagram.com/venusdoors/' target='_blank' title='@venusdoors'><img style='width:5%' src='http://app.venuscabinetdoors.com/Content/img/igICO.png'></a><span></span></span></div></div></div><div id='DivFooter' style='height: 10%;display: flex;text-align: center;justify-content: center;'><p style='width: 35%;'><span>Venus Doors</span> - Copyright © 2019 | <a target='_blank' href='http://venuscabinetdoors.com/' style='color:#014d41'>Venuscabinetdoors.com</a> - All rights reserved. | Privacy policy | About.</p></div></div></section></body></html>";
                    }
                    else
                    {
                        message += "<!DOCTYPE html><html style='height: 100 %; '><head></head><body style='height: 100 %; margin: 0; '><section style='width: 100 %; display: flex; justify - content: center; height: 100 %; '><div id='DivContent' style='width: 80 %; height: 100 %; '><div id='DivHeader' style='height: 20 %; '><div id='HeaderImg' style='justify - content: center; display: flex; align - items: center; '><img style='width: 200px; padding: 3px; height: 56px; ' src='http://app.venuscabinetdoors.com/Content/img/Venus_Doors11.png'></div><div id='HeaderTittle' style='display: flex;justify-content: center;'><h1 style='margin: 0;width: 100%;text-align: center;background: #014d41;padding: 15px;color: #fff;'>Account registration process</h1></div>	</div><div id='DivBody' style='height: 70%;'><div style='display: flex;justify-content: center;text-align: justify;height: 75%;'><p style='width: 80%;'>Hello "+ pUser.Person.Name + " "+ pUser.Person.Lastname + ".<br><br>Your account has been rejected while we verify a possible activation, we apologize for the lost time.<br><br>This is an automatic message.</p></div><div style='text-align: center;height: 25%;'><div style='display:flex; justify-content:center'><p style='width: 100%;'>Stay connected with us.</p></div><div></div><div style='display:flex; justify-content:center; align-items:center'><span><a href='https://www.facebook.com/Venus-Cabinet-Doors-171950720354840/' target='_blank' title='Venus Cabinet Doors on FB'><img style='width:5%' src='http://app.venuscabinetdoors.com/Content/img/fbICO.png'></a><a href='http://venuscabinetdoors.com/' target='_blank' style='margin-left: 5px;margin-right: 5px;'><img style='width:5%' title='Venus Cabinet Doors Homepage' src='http://app.venuscabinetdoors.com/Content/img/Venus_Doors11.ico'></a><a href='https://www.instagram.com/venusdoors/' target='_blank' title='@venusdoors'><img style='width:5%' src='http://app.venuscabinetdoors.com/Content/img/igICO.png'></a><span></span></span></div></div>	</div><div id='DivFooter' style='height: 10%;display: flex;text-align: center;justify-content: center;'><p style='width: 35%;'><span>Venus Doors</span> - Copyright © 2019 | <a target='_blank' href='http://venuscabinetdoors.com/' style='color:#014d41'>Venuscabinetdoors.com</a> - All rights reserved. | Privacy policy | About.</p></div></div></section></body></html>";
                    }
                    _SEND.SendMail(pUser, subject, FromTittle, message, typeMessage);
                    return Json(true, JsonRequestBehavior.AllowGet);

                }
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }
        [Authorize(Roles = "1, 2")]
        [HttpPost]
        public ActionResult GetAllUserManagement()
        {
            if (Session["UserID"] == null)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
            else
            {

                try
                {
                    BusinessLogic.lnUser _LNU = new BusinessLogic.lnUser();
                    List<User> Usuarios = _LNU.GetAllUserByCompany((int)Session["IdCompany"], (int)Session["IdTypeCompany"]);
                    List<User> ListaUsuarios = Usuarios.Where(x => x.Status.Id == 2 || x.Status.Id == 12).OrderByDescending(x => x.ModificationDate).ToList();
                    return Json(ListaUsuarios, JsonRequestBehavior.AllowGet);

                }
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
        }

        [Authorize(Roles = "1, 2")]
        [HttpPost]
        public ActionResult UpdateUserDescuento(int IdUser, int Descuento)
        {          
                try
                {                
                    BusinessLogic.lnUser _LNU = new BusinessLogic.lnUser();
                    var modOrderStatus = _LNU.UpdateDescuentoUser(IdUser,Descuento, (int)Session["UserID"]);
                    return Json(modOrderStatus, JsonRequestBehavior.AllowGet);

                }
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }          
        }


    }
}
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
    public class LoginsController : Controller
    {

        // GET: Logins
        public ActionResult Index()
        {
            if (Session["UserID"] == null)
            {
                return View();

            }
            else
            {
                return RedirectToAction("Index", "Home");
            }

        }

        public ActionResult sing_up()
        {
            if (Session["UserID"] == null)
            {
                return View();

            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        [HttpPost]
        public ActionResult GetAllCompany()
        {
            try
            {
                BusinessLogic.lnCompany _LN = new BusinessLogic.lnCompany();
                return Json(_LN.GetAllCompany());
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        // GET: Logins
        public ActionResult Recover_Password(User puser)
        {
            if (Session["UserID"] == null)
            {
                return View();

            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        [HttpPost]
        public ActionResult RecoveryProcess(string semail)
        {
            BusinessLogic.lnUser _LNUSER = new BusinessLogic.lnUser();
            var getUser = _LNUSER.GetAllUser();
            var userDetails = getUser.Where(x => x.Email == semail).FirstOrDefault();
            if (userDetails == null)
            {
                return Json(1, JsonRequestBehavior.AllowGet);
            }
            else
            {
                try
                {
                    //Random code start
                    Random obj = new Random();
                    string sCadena = "ABCDEFGNOPQRSWXYZ1234567890";
                    int longitud = sCadena.Length;
                    char cletra;
                    int nlongitud = 8;
                    string sNuevacadena = string.Empty;
                    for (int i = 0; i < nlongitud; i++)
                    {
                        cletra = sCadena[obj.Next(nlongitud)];
                        sNuevacadena += cletra.ToString();
                    }
                    string newVerificationCode = sNuevacadena;
                    //Random code end

                    //Obtaining the complete user info
                    BusinessLogic.lnPerson _LNper = new BusinessLogic.lnPerson();
                    var pPerson = _LNper.GetPersonById(userDetails.Person.Id);

                    //update the new verification code
                    userDetails.VerificationCode = newVerificationCode;
                    var reCode = _LNUSER.UpdateUser(userDetails);

                    SendEmailCodeRecuperation(semail, pPerson, newVerificationCode);
                    System.Web.HttpContext.Current.Session["ActivePasswordRecovery"] = userDetails.Email;
                    return Json(2, JsonRequestBehavior.AllowGet);
                }
                catch
                {
                    return Json(3, JsonRequestBehavior.AllowGet);
                }
            }
        }

        public ActionResult New_Password()
        {
            if (Session["UserID"] == null)
            {
                if (Session["ActivePasswordRecovery"] == null)
                {
                    return RedirectToAction("Index", "Logins");
                }
                else
                {
                    return View();
                }

            }
            else
            {
                return RedirectToAction("Index", "Home");
            }            

        }

        [HttpPost]
        public ActionResult ValidateCodeRecovery(string verificationC)
        {
            if (Session["ActivePasswordRecovery"] == null)
            {
                return RedirectToAction("Index", "Logins");
            }
            else
            {
                try
                {                    
                    string EmailActive = (string)Session["ActivePasswordRecovery"];
                    BusinessLogic.lnUser _LNUSER = new BusinessLogic.lnUser();
                    var getUser = _LNUSER.GetAllUser();
                    var userDetails = getUser.Where(x => x.Email == EmailActive).FirstOrDefault();
                    if(userDetails.VerificationCode == verificationC)
                    {                      
                        return Json(1, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return Json(2, JsonRequestBehavior.AllowGet);
                    }
                   
                }
                catch
                {
                    return Json(3, JsonRequestBehavior.AllowGet);
                }
            }
        }

        [HttpPost]
        public ActionResult ModifyPassword(User pusernew, string verificationC)
        {
            if (Session["ActivePasswordRecovery"] == null)
            {
                return RedirectToAction("Index", "Logins");
            }
            else
            {
                try
                {
                    string EmailActive = (string)Session["ActivePasswordRecovery"];
                    BusinessLogic.lnUser _LNUSER = new BusinessLogic.lnUser();
                    var getUser = _LNUSER.GetAllUser();
                    var userDetails = getUser.Where(x => x.Email == EmailActive).FirstOrDefault();
                    if (userDetails.VerificationCode == verificationC)
                    {                                                                                                
                        userDetails.Password = pusernew.Password;
                        userDetails.VerificationCode = "Verified";
                        var ModfyContra = _LNUSER.UpdateUser(userDetails);
                        Session.Abandon();
                        return Json(1, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return Json(2, JsonRequestBehavior.AllowGet);
                    }                   
                }
                catch
                {
                    return Json(3, JsonRequestBehavior.AllowGet);
                }
            }
        }

        public ActionResult Account_Verification()
        {
            if (Session["UserID"] == null)
            {
                return View();

            }
            else
            {
                return RedirectToAction("Index", "Home");
            }

        }

        [HttpPost]
        public ActionResult SendEmailCodeRecuperation(string semail, Person pPerson, string newVerificationCode)
        {
            try
            {
                string To = semail;
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.ionos.com");
                mail.From = new MailAddress("orders@venuscabinetdoors.com", "Venus Cabinet Doors");
                mail.To.Add(new MailAddress(To));
                mail.Subject = "Password recovery code";
                mail.Body =
                "<p>Dear " + pPerson.Name + "</p><p>Your verification code is: " + newVerificationCode + "</p><br>Enter this code in the validation field to change your password. This code will expire shortly. If you do not use it you will have to repeat the whole process again<br>Do not respond to this email, it is an automatic response.<br>© 2019 - Venus Doors.</p>";
                mail.IsBodyHtml = true;

                SmtpServer.Port = 587;
                SmtpServer.Credentials = new System.Net.NetworkCredential("orders@venuscabinetdoors.com", "venusCD2019*");
                SmtpServer.EnableSsl = true;
                SmtpServer.Send(mail);

                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }    

        [HttpPost]
        public ActionResult Autherize(User userData)
        {
            BusinessLogic.lnUser _LNU = new BusinessLogic.lnUser();
            var getU = _LNU.GetAllUser();
            //Buscar el usuario con ese email
            var userDetails = getU.Where(x => x.Email == userData.Email).FirstOrDefault();
            //Validar que ese usuario exista
            if (userDetails != null)
            {
                //Validar que la contrasena este correcta
                if (userDetails.Password == userData.Password)
                {
                    //Validar el estado de la cuenta
                    if (userDetails.Status.Id == 1)
                    {
                        System.Web.HttpContext.Current.Session["UserID"] = userDetails.Id;
                        System.Web.HttpContext.Current.Session["UserName"] = userDetails.Person.Id;
                        System.Web.HttpContext.Current.Session["UserType"] = userDetails.Type.Id;

                        return Json(1, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return Json(2, JsonRequestBehavior.AllowGet);
                    }
                }
                else
                {
                    return Json(3, JsonRequestBehavior.AllowGet);
                }               
            }
            else
            {
                return Json(4, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpPost]
        public ActionResult InsertUser(Person PersonData, User UserData)
        {
            try
            {
                BusinessLogic.lnUser _LNU = new BusinessLogic.lnUser();
                var getU = _LNU.GetAllUser();
                var userDetails = getU.Where(x => x.Email == UserData.Email).FirstOrDefault();
                if (userDetails == null)
                {
                    BusinessLogic.lnPerson _LNP = new BusinessLogic.lnPerson();
                    PersonData.CreationDate = DateTime.Now;
                    PersonData.ModificationDate = DateTime.Now;
                    int IdPerson = _LNP.InsertPerson(PersonData);
                    PersonData.Id = IdPerson;
                    UserData.Person = PersonData;
                    UserData.CreationDate = DateTime.Now;
                    UserData.ModificationDate = DateTime.Now;                                       
                    var create = _LNU.InsertUser(UserData);
                    return Json(1, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(2, JsonRequestBehavior.AllowGet);
                }
               
            }
            catch
            {
                return Json(3, JsonRequestBehavior.AllowGet);
            }
        }    

        public ActionResult LogOut()
        {
            Session.Abandon();
            return RedirectToAction("Index", "Logins");
        }
    }
}
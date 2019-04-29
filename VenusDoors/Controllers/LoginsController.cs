using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Model;
using System.Net.Mail;
using System.Text;
using System.Web.Security;

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
                    if (userDetails.Status.Id != 1)
                    {
                        return Json(2, JsonRequestBehavior.AllowGet);
                    }
                    else
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
                        return Json(3, JsonRequestBehavior.AllowGet);
                    }
                    
                }
                catch
                {
                    return Json(4, JsonRequestBehavior.AllowGet);
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
            BusinessLogic.lnCompany _Company = new BusinessLogic.lnCompany();
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
                        userDetails.Company = _Company.GetCompanyById(userDetails.Company.Id);
                        System.Web.HttpContext.Current.Session["UserID"] = userDetails.Id;
                        System.Web.HttpContext.Current.Session["UserName"] = userDetails.Person.Name;
                        System.Web.HttpContext.Current.Session["UserType"] = userDetails.Type.Id;
                        System.Web.HttpContext.Current.Session["IdCompany"] = userDetails.Company.Id;
                        System.Web.HttpContext.Current.Session["IdTypeCompany"] = userDetails.Company.Type.Id;
                        System.Web.HttpContext.Current.Session["NameCompany"] = userDetails.Company.Name;
                        System.Web.HttpContext.Current.Session["CompanyActive"] = userDetails.Company.Id;
                        System.Web.HttpContext.Current.Session["CompanyLogo"] = userDetails.Company.Logo;
                        if (userDetails.Company.Type.Id == 1 && userDetails.Type.Id == 1)
                        {
                         List<Company> _CompanyList =  _Company.GetAllCompany();
                            System.Web.HttpContext.Current.Session["NameCompany"] = "All Companies";
                            System.Web.HttpContext.Current.Session["CompanyLogo"] = "/Content/img/img11.jpg";
                            System.Web.HttpContext.Current.Session["CompanyActive"] = 0;
                            System.Web.HttpContext.Current.Session["ListCompany"] = _CompanyList;
                        }
                        SetupFormsAuthTicket(userDetails, true);
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
        public ActionResult InsertUser(Person PersonData, User UserData, ShippingAddress ShippingData)
        {
            try
            {
                BusinessLogic.lnUser _LNU = new BusinessLogic.lnUser();
                var getU = _LNU.GetAllUser();
                var userDetails = getU.Where(x => x.Email == UserData.Email).FirstOrDefault();
                if (userDetails == null)
                {
                    BusinessLogic.lnPerson _LNP = new BusinessLogic.lnPerson();
                    BusinessLogic.lnShippingAddress _LNSA = new BusinessLogic.lnShippingAddress();
                    PersonData.CreationDate = DateTime.Now;
                    PersonData.ModificationDate = DateTime.Now;
                    int IdPerson = _LNP.InsertPerson(PersonData);
                    PersonData.Id = IdPerson;
                    UserData.Status.Id = 2;
                    UserData.Person = PersonData;
                    UserData.CreationDate = DateTime.Now;
                    UserData.ModificationDate = DateTime.Now;
                    UserData.VerificationCode = "Created";                                     
                    int create = _LNU.InsertUser(UserData);
                    UserData.Id = create;
                    ShippingData.User = UserData;
                    ShippingData.CreationDate = DateTime.Now;
                    ShippingData.ModificationDate = DateTime.Now;
                    ShippingData.LotBlock = "00000000";
                    var InsertShip = _LNSA.InsertShippingAddress(ShippingData);
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
            clearCookie();
            Session.Abandon();
            return RedirectToAction("Index", "Logins");
        }

        private void SetupFormsAuthTicket(User Usuario, bool persistanceFlag)
        {

            FormsAuthenticationTicket authTicket = new FormsAuthenticationTicket(1,
                                    Usuario.Person.Name,
                                    DateTime.Now,
                                    DateTime.Now.AddMinutes(1),
                                    persistanceFlag,
                                    Usuario.Id.ToString());

            string encTicket = FormsAuthentication.Encrypt(authTicket);
            this.Response.Cookies.Add(new HttpCookie("VenusCabinetDoorsCookie", encTicket));

        }
        private void clearCookie()
        {
            FormsAuthentication.SignOut();
            Session.Abandon();

            // clear authentication cookie
            HttpCookie cookie1 = new HttpCookie("VenusCabinetDoorsCookie", "");
            cookie1.Expires = DateTime.Now.AddYears(-1);
            Response.Cookies.Add(cookie1);

            // clear session cookie (not necessary for your current problem but i would recommend you do it anyway)
            HttpCookie cookie2 = new HttpCookie("VenusCabinetDoorsCookie", "");
            cookie2.Expires = DateTime.Now.AddYears(-1);
            Response.Cookies.Add(cookie2);
        }
    }
}
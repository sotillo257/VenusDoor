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

        // GET: Logins
        public ActionResult Recover_Password()
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

        public ActionResult New_Password()
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
        public ActionResult SendEmailConfirm(User UserData, Person PersonData, string VerificationCode)
        {
            try
            {
                string To = UserData.Email;
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                mail.From = new MailAddress("azazeldroid@gmail.com");
                mail.To.Add(new MailAddress(To));
                mail.Subject = "Verification code";
                mail.Body =
                "<p>Dear " + PersonData.Name + "</p><p>Your verification code is: " + VerificationCode + "</p><br><p>Thank you for registering and prefer us. To complete your registration and activate your account you must enter this code in the validation field.<br>Do not respond to this email, it is an automatic response.<br>© 2019 - Venus Doors.</p>";
                mail.IsBodyHtml = true;

                SmtpServer.Port = 587;
                SmtpServer.Credentials = new System.Net.NetworkCredential("azazeldroid@gmail.com", "24766031");
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
            var userDetails = getU.Where(x => x.Email == userData.Email && x.Password == userData.Password).FirstOrDefault();
            if (userDetails != null)
            {
                System.Web.HttpContext.Current.Session["UserID"] = userDetails.Id;
                System.Web.HttpContext.Current.Session["UserName"] = userDetails.Person.Id;
                System.Web.HttpContext.Current.Session["UserType"] = userDetails.Type.Id;

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(false, JsonRequestBehavior.AllowGet);
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

                    //Random code start
                    Random obj = new Random();
                    string sCadena = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
                    int longitud = sCadena.Length;
                    char cletra;
                    int nlongitud = 8;
                    string sNuevacadena = string.Empty;
                    for (int i = 0; i < nlongitud; i++)
                    {
                        cletra = sCadena[obj.Next(nlongitud)];
                        sNuevacadena += cletra.ToString();
                    }
                    string VerificationCode = sNuevacadena;
                    //Random code end

                    UserData.VerificationCode = VerificationCode;
                    var create = _LNU.InsertUser(UserData);
                    SendEmailConfirm(UserData, PersonData, VerificationCode);
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

        [HttpPost]
        public ActionResult Recovery(User pEmail)
        {
            try
            {
                BusinessLogic.lnUser _LNU = new BusinessLogic.lnUser();
                var getU = _LNU.GetAllUser();
                var userDetails = getU.Where(x => x.Email == pEmail.Email).FirstOrDefault();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        //[HttpPost]
        //public bool validar(string correo)
        //{ 
        //{
        //    return Regex.IsMatch(correo, "\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*");
        //}
        //    if (validar(correo) == true)
        //    {
        //        try
        //        {
        //            int userID = (int)Session["UserID"];
        //            int idU = userID;
        //            BusinessLogic.lnUser _LN = new BusinessLogic.lnUser();
        //            User use = _LN.GetUserById(idU);
        //            string To = use.Email;
        //            MailMessage mail = new MailMessage();
        //            SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
        //            mail.From = new MailAddress("user@gmail.com");
        //            mail.To.Add(new MailAddress(To));
        //            mail.Subject = "New order";
        //            mail.Body =
        //            " ";
        //            mail.IsBodyHtml = true;

        //            SmtpServer.Port = 587;
        //            SmtpServer.Credentials = new System.Net.NetworkCredential("user@gmail.com", "password");
        //            SmtpServer.EnableSsl = true;
        //            SmtpServer.Send(mail);

        //            BusinessLogic.lnOrder _LNUPor = new BusinessLogic.lnOrder();
        //            var orderList = _LNUPor.GetOrderByUser(idU);
        //            ViewBag.Listo = orderList;
        //            Order item = ViewBag.Listo;

        //        }
        //        catch
        //        {
        //            return Json(false, JsonRequestBehavior.AllowGet);
        //        }

        //        //MessageBox.Show("Correo valido");
        //    }
        //    else
        //    {
        //        //si no es valido
        //        //MessageBox.Show("No valido");
        //    }
        //}

        public ActionResult LogOut()
        {
            Session.Abandon();
            return RedirectToAction("Index", "Logins");
        }
    }
}
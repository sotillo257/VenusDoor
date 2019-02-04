using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Model;
using System.Net.Mail;

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

        [HttpPost]
        public ActionResult ConfirmOrder(string idOrderSummary)
        {
            if (Session["UserID"] == null)
            {
                return View();
            }
            else
            {
                try
                {
                    int userID = (int)Session["UserID"];
                    int idU = userID;
                    BusinessLogic.lnUser _LN = new BusinessLogic.lnUser();
                    User use = _LN.GetUserById(idU);
                    string To = use.Email;
                    MailMessage mail = new MailMessage();
                    SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                    mail.From = new MailAddress("user@gmail.com");
                    mail.To.Add(new MailAddress(To));
                    mail.Subject = "New order";
                    mail.Body =
                    "<p>Dear Javier,</p><p>Please review the estimate below.Feel free to contact us if you have any questions.<br>We look forward to working with you.</p><p>Thanks for your business!<br><b>Venus Doors<b></p>  <table width=700 border=0 cellspacing=0 cellpadding=0 style=background:#f7f7f7;font-family:Arial,Helvetica,sans-serif;font-size:12px><tbody><tr><td style = padding:20px><p> ------------------------&nbsp; &nbsp; &nbsp;Estimate & nbsp; Summary & nbsp; &nbsp; --------------------------<br> Estimate & nbsp;#&nbsp;:&nbsp;1010<br>Estimate&nbsp;Date:&nbsp;01/15/2019<br>Total:&nbsp;$4,360.00<br>The&nbsp;complete&nbsp;version&nbsp;has&nbsp;been&nbsp;<wbr>provided&nbsp;as&nbsp;an&nbsp;attachment&nbsp;to&nbsp;<wbr>this&nbsp;email.<br>---------------------------------------------------------------------</p></td></tr></tbody></table> ";
                    mail.IsBodyHtml = true;

                    SmtpServer.Port = 587;
                    SmtpServer.Credentials = new System.Net.NetworkCredential("user@gmail.com", "password");
                    SmtpServer.EnableSsl = true;
                    SmtpServer.Send(mail);

                    BusinessLogic.lnOrder _LNUPor = new BusinessLogic.lnOrder();
                    var orderList = _LNUPor.GetOrderByUser(idU);
                    ViewBag.Listo = orderList;
                    Order item = ViewBag.Listo;
                    return Json(true, JsonRequestBehavior.AllowGet);

                }
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
        }

        [HttpPost]
        public ActionResult Autherize(User userModel)
        {
            BusinessLogic.lnUser _LNU = new BusinessLogic.lnUser();
            var getU = _LNU.GetAllUser();
            var userDetails = getU.Where(x => x.Email == userModel.Email && x.Password == userModel.Password).FirstOrDefault();
            if (userDetails == null)
            {
                //userModel.LoginErrorMessage = "Wrong Email or Password.";
                return View("Index", userModel);
            }
            else
            {
                System.Web.HttpContext.Current.Session["UserID"] = userDetails.Id;
                System.Web.HttpContext.Current.Session["UserName"] = userDetails.Person.Id;
                System.Web.HttpContext.Current.Session["UserType"] = userDetails.Type.Id;
                return RedirectToAction("Index", "Home");
            }

        }


        [HttpPost]
        public ActionResult InsertUser(Person PersonData, User UserData)
        {
            try
            {
                BusinessLogic.lnPerson _LNP = new BusinessLogic.lnPerson();
                PersonData.CreationDate = DateTime.Now;
                PersonData.ModificationDate = DateTime.Now;
                int IdPerson = _LNP.InsertPerson(PersonData);
                PersonData.Id = IdPerson;
                UserData.Person = PersonData;
                UserData.CreationDate = DateTime.Now;
                UserData.ModificationDate = DateTime.Now;
                BusinessLogic.lnUser _LNU = new BusinessLogic.lnUser();
                var create = _LNU.InsertUser(UserData);
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
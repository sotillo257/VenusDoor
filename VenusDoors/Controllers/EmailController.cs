using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net.Mail;

namespace VenusDoors.Controllers
{
    public class EmailController : Controller
    {
        // GET: Email
        public ActionResult Index(int id)
        {
            try
            {
                if (id == 12345678)
                {
                    MailMessage mail = new MailMessage();
                    SmtpClient SmtpServer = new SmtpClient("smtp.ionos.com");
                    mail.From = new MailAddress("orders@venuscabinetdoors.com", "Correo Programado de Prueba");
                    mail.Bcc.Add(new MailAddress("sotillo257@gmail.com"));
                    mail.Subject = "Correo Programado de Prueba";

                    mail.Body = "Texto de pruea";
                    mail.IsBodyHtml = true;
                    SmtpServer.Port = 587;
                    SmtpServer.Credentials = new System.Net.NetworkCredential("orders@venuscabinetdoors.com", "venusCBD2019*");
                    SmtpServer.EnableSsl = true;
                    SmtpServer.Send(mail);
                    return View();
                }
                else
                {
                    return RedirectToAction("Index", "Home");
                }
               
            }
            catch (Exception)
            {
                return RedirectToAction("Index", "Home");
            }
           
            
        }
    }
}
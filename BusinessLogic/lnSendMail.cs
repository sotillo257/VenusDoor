using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using System.Net.Mail;

namespace BusinessLogic
{
    public class lnSendMail
    {
        String path;
        MailMessage mail = new MailMessage();

        public void SendMail(User pUser, string subject, string FromTittle, string message,string typeMessage)
        {
            try
            {
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.ionos.com");
                mail.From = new MailAddress("orders@venuscabinetdoors.com",FromTittle);
                mail.Bcc.Add(new MailAddress(pUser.Email));
                mail.Subject = subject;
                mail.Body = message;
                mail.IsBodyHtml = true;
                SmtpServer.Port = 587;
                SmtpServer.Credentials = new System.Net.NetworkCredential("orders@venuscabinetdoors.com", "venusCBD2019*");
                SmtpServer.EnableSsl = true;
                SmtpServer.Send(mail);
                if(typeMessage == "OrderSumm")
                {
                    SendCopyToManager(pUser, message);
                }
            }
            catch (Exception ex)
            {
                throw ;
            }
        }

        public void SendCopyToManager(User pUser, string message)
        {
            try
            {
                BusinessLogic.lnPerson _LNP = new BusinessLogic.lnPerson();
                Person PersonInfo = _LNP.GetPersonById(pUser.Person.Id);

                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.ionos.com");
                mail.From = new MailAddress("orders@venuscabinetdoors.com", "A new order has been received");
                mail.Bcc.Add(new MailAddress("orders@venuscabinetdoors.com"));
                mail.Subject = "New order by " + PersonInfo.Name + " " + PersonInfo.Lastname;
                mail.Body = message;
                mail.IsBodyHtml = true;
                SmtpServer.Port = 587;
                SmtpServer.Credentials = new System.Net.NetworkCredential("orders@venuscabinetdoors.com", "venusCBD2019*");
                SmtpServer.EnableSsl = true;
                SmtpServer.Send(mail);
            }
            catch (Exception ex)
            {

                throw;
            }
        }        
    }
}

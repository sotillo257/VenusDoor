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

        public void SendMail(User pUser, string subject, string FromTittle, string message, string typeMessage)
        {
            try
            {                
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.ionos.com");
                mail.From = new MailAddress("orders@venuscabinetdoors.com",FromTittle);
                mail.Bcc.Add(new MailAddress(pUser.Email));
                mail.Subject = subject;
                string bodyMessage = "";          
                if (typeMessage == "OrderSumm")
                {
                    string MessageOrder = "<p>Please review the estimate below. Feel free to contact us if you have any questions.<br>We look forward to working with you.</p><p>Thanks for your business!<br><b>Venus Doors</b></p>";
                    MessageOrder += message;
                    bodyMessage = MessageOrder;
                }
                else
                {
                    bodyMessage = message;
                }
                mail.Body = "<!DOCTYPE html><html><body style=' margin: 0; width:100%'><section style='width: 100%; display: flex; justify-content: center; height: 100%;'><div id='DivContent' style='width: 100%; height: 100%;'><div id='DivHeader' style='height: 20%;'><div id='HeaderImg' style='justify - content: center; display: flex; align-items: center;'><img style='width: 200px; padding: 3px; height: 56px;' src='http://app.venuscabinetdoors.com/Content/img/Venus_Doors11.png'></div><div id='HeaderTittle' style='display: flex;justify-content: center;'><h1 style='margin: 0;width: 100%;text-align: center;background: #014d41;padding: 15px;color: #fff;'>" + subject + "</h1></div></div><div id='DivBody' style='height: 65%; width:100%'><div style='display: flex;justify-content: center;text-align: justify;height: 75%; width:100%'><div id='DivOrderInfo' style='width:100%'>" + bodyMessage + "</div></div><div style='text-align: center;height: 25%;'><div style='display:flex; justify-content:center'><p style='width: 100%;'>Stay connected with us.</p></div><div style='display:flex; justify-content:center; align-items:center'><span style='width:100%'><a href='https://www.facebook.com/Venus-Cabinet-Doors-171950720354840/' target='_blank' title='Venus Cabinet Doors on FB'><img style='width:40px; height:40px' src='http://app.venuscabinetdoors.com/Content/img/fbICO.png'></a><a href='http://venuscabinetdoors.com/' target='_blank' style='margin-left: 8px;margin-right: 8px;'><img style='width:40px; height:40px' title='Venus Cabinet Doors Homepage' src='http://app.venuscabinetdoors.com/Content/img/Venus_Doors11.ico'></a><a href='https://www.instagram.com/venusdoors/' target='_blank' title='@venusdoors'><img style='width:40px; height:40px' src='http://app.venuscabinetdoors.com/Content/img/igICO.png'></a></span></div></div></div><div id='DivFooter' style='height: 15%;display: flex;text-align: center;justify-content: center; align-items:center'><p style='width: 90%;'><span>Venus Doors</span> - Copyright © 2019 | <a target='_blank' href='http://venuscabinetdoors.com/' style='color:#014d41'>Venuscabinetdoors.com</a> - All rights reserved. | Privacy policy | About.</p></div></div></section></body></html>"; string mailBody = "<!DOCTYPE html><html><body style=' margin: 0;'><section style='width: 100%; display: flex; justify-content: center; height: 100%;'><div id='DivContent' style='width: 100%; height: 100%;'><div id='DivHeader' style='height: 20%;'><div id='HeaderImg' style='justify - content: center; display: flex; align-items: center;'><img style='width: 200px; padding: 3px; height: 56px;' src='http://app.venuscabinetdoors.com/Content/img/Venus_Doors11.png'></div><div id='HeaderTittle' style='display: flex;justify-content: center;'><h1 style='margin: 0;width: 100%;text-align: center;background: #014d41;padding: 15px;color: #fff;'>" + subject + "</h1></div></div><div id='DivBody' style='height: 65%;'><div style='display: flex;justify-content: center;text-align: justify;height: 75%;'><div id='DivOrderInfo'" + bodyMessage + "</div></div><div style='text-align: center;height: 25%;'><div style='display:flex; justify-content:center'><p style='width: 100%;'>Stay connected with us.</p></div><div style='display:flex; justify-content:center; align-items:center'><span style='width:100%'><a href='https://www.facebook.com/Venus-Cabinet-Doors-171950720354840/' target='_blank' title='Venus Cabinet Doors on FB'><img style='width:5%' src='http://app.venuscabinetdoors.com/Content/img/fbICO.png'></a><a href='http://venuscabinetdoors.com/' target='_blank' style='margin-left: 8px;margin-right: 8px;'><img style='width:5%' title='Venus Cabinet Doors Homepage' src='http://app.venuscabinetdoors.com/Content/img/Venus_Doors11.ico'></a><a href='https://www.instagram.com/venusdoors/' target='_blank' title='@venusdoors'><img style='width:5%' src='http://app.venuscabinetdoors.com/Content/img/igICO.png'></a></span></div></div></div><div id='DivFooter' style='height: 15%;display: flex;text-align: center;justify-content: center; align-items:center'><p style='width: 90%;'><span>Venus Doors</span> - Copyright © 2019 | <a target='_blank' href='http://venuscabinetdoors.com/' style='color:#014d41'>Venuscabinetdoors.com</a> - All rights reserved. | Privacy policy | About.</p></div></div></section></body></html>";
                mail.Body = mailBody;
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
                string subject = "New order by " + PersonInfo.Name + " " + PersonInfo.Lastname;
                mail.Subject = subject;
                mail.Body = "<!DOCTYPE html><html><body style=' margin: 0;'><section style='width: 100%; display: flex; justify-content: center; height: 100%;'><div id='DivContent' style='width: 100%; height: 100%;'><div id='DivHeader' style='height: 20%;'><div id='HeaderImg' style='justify - content: center; display: flex; align-items: center;'><img style='width: 200px; padding: 3px; height: 56px;' src='http://app.venuscabinetdoors.com/Content/img/Venus_Doors11.png'></div><div id='HeaderTittle' style='display: flex;justify-content: center;'><h1 style='margin: 0;width: 100%;text-align: center;background: #014d41;padding: 15px;color: #fff;'>" + subject + "</h1></div></div><div id='DivBody' style='height: 65%;'><div style='display: flex;justify-content: center;text-align: justify;height: 75%;'><div id='DivOrderInfo' style='width:100%'>" + message + "</div></div><div style='text-align: center;height: 25%;'><div style='display:flex; justify-content:center'><p style='width: 100%;'>Stay connected with us.</p></div><div style='display:flex; justify-content:center; align-items:center'><span style='width:100%'><a href='https://www.facebook.com/Venus-Cabinet-Doors-171950720354840/' target='_blank' title='Venus Cabinet Doors on FB'><img style='width:40px; height:40px' src='http://app.venuscabinetdoors.com/Content/img/fbICO.png'></a><a href='http://venuscabinetdoors.com/' target='_blank' style='margin-left: 8px;margin-right: 8px;'><img style='width:40px; height:40px' title='Venus Cabinet Doors Homepage' src='http://app.venuscabinetdoors.com/Content/img/Venus_Doors11.ico'></a><a href='https://www.instagram.com/venusdoors/' target='_blank' title='@venusdoors'><img style='width:40px; height:40px' src='http://app.venuscabinetdoors.com/Content/img/igICO.png'></a></span></div></div></div><div id='DivFooter' style='height: 15%;display: flex;text-align: center;justify-content: center; align-items:center'><p style='width: 90%;'><span>Venus Doors</span> - Copyright © 2019 | <a target='_blank' href='http://venuscabinetdoors.com/' style='color:#014d41'>Venuscabinetdoors.com</a> - All rights reserved. | Privacy policy | About.</p></div></div></section></body></html>";
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

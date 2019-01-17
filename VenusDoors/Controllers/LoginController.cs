using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VenusDoors.Models;
using Model;

namespace VenusDoors.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {

            return View();
        }

        public ActionResult sing_up()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Autherize(VenusDoors.Models.User userModel)
        {
            using (DB_A448B1_venusdoorsDBEntities1 db = new DB_A448B1_venusdoorsDBEntities1())
            {
                var userDetails = db.Users.Where(x => x.Email == userModel.Email && x.Password == userModel.Password).FirstOrDefault();
                if(userDetails == null)
                {
                    userModel.LoginErrorMessage = "Wrong Email or Password.";
                    return View("Index", userModel);
                }
                else
                {
                    Session["UserID"] = userDetails.Id;
                    return RedirectToAction("Index", "Home");
                }
            }         
        }

        [HttpPost]
        public ActionResult InsertUser(Model.Person PersonData, Model.User UserData)
        {
            
            BusinessLogic.lnPerson _LNP = new BusinessLogic.lnPerson();
            PersonData.CreationDate = DateTime.Now;
            PersonData.ModificationDate = DateTime.Now;
            int IdPerson = _LNP.InsertPerson(PersonData);
            PersonData.Id = IdPerson;
            UserData.Person = PersonData;
            BusinessLogic.lnUser _LNU = new BusinessLogic.lnUser();
            return Json(_LNU.InsertUser(UserData));
        }
    }  
}
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
        private object item;

        // GET: Login
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
                    System.Web.HttpContext.Current.Session["UserID"] = userDetails.Id;
                    System.Web.HttpContext.Current.Session["UserName"] = userDetails.IdPerson;
                    System.Web.HttpContext.Current.Session["UserType"] = userDetails.IdType;
                    return RedirectToAction("Index", "Home");  
                }
            }         
        }

      
        [HttpPost]
        public ActionResult InsertUser(Model.Person PersonData, Model.User UserData)
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

        

        public ActionResult LogOut()
        {
            Session.Abandon();
            return RedirectToAction("Index", "Login");
        } 
    }  
}
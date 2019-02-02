using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Model;

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



        public ActionResult LogOut()
        {
            Session.Abandon();
            return RedirectToAction("Index", "Logins");
        }
    }
}
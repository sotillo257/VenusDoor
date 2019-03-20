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
    public class UserManagementController : Controller
    {
        BusinessLogic.lnUser _LNU = new BusinessLogic.lnUser();
        // GET: UserManagement
        [Authorize(Roles = "1, 2")]
        public ActionResult Index()
        {

            List<User> Usuarios = _LNU.GetAllUserByCompany((int)Session["IdCompany"], (int)Session["IdTypeCompany"]);
            List<User> ListaUsuarios = Usuarios.Where(x => x.Status.Id == 2 || x.Status.Id == 12).OrderByDescending(x => x.ModificationDate).ToList();
            ViewBag.UserList = ListaUsuarios;
            return View();
            
        }
        [Authorize(Roles = "1, 2")]
        [HttpPost]
        public ActionResult UpdateUserStatus(User modUser)
        {
            if (Session["UserID"] != null && (int)Session["UserType"] == 1)
            {
                int userID = (int)Session["UserID"];
                try
                {

                    modUser.ModificationDate = DateTime.Now;
                    modUser.ModificationUser = userID;
                    BusinessLogic.lnUser _LNU = new BusinessLogic.lnUser();
                    var modOrderStatus = _LNU.UpdateUserStatus(modUser);
                    return Json(true, JsonRequestBehavior.AllowGet);

                }
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }
        [Authorize(Roles = "1, 2")]
        [HttpPost]
        public ActionResult GetAllUserManagement()
        {
            if (Session["UserID"] == null)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
            else
            {

                try
                {
                    BusinessLogic.lnUser _LNU = new BusinessLogic.lnUser();
                    List<User> Usuarios = _LNU.GetAllUserByCompany((int)Session["IdCompany"], (int)Session["IdTypeCompany"]);
                    List<User> ListaUsuarios = Usuarios.Where(x => x.Status.Id == 2 || x.Status.Id == 12).OrderByDescending(x => x.ModificationDate).ToList();
                    return Json(ListaUsuarios, JsonRequestBehavior.AllowGet);

                }
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
        }

        [Authorize(Roles = "1, 2")]
        [HttpPost]
        public ActionResult UpdateUserDescuento(int IdUser, int Descuento)
        {          
                try
                {                
                    BusinessLogic.lnUser _LNU = new BusinessLogic.lnUser();
                    var modOrderStatus = _LNU.UpdateDescuentoUser(IdUser,Descuento, (int)Session["UserID"]);
                    return Json(modOrderStatus, JsonRequestBehavior.AllowGet);

                }
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }          
        }


    }
}
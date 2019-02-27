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
        public ActionResult Index()
        {
            List<User> Usuarios = _LNU.GetAllUser();
            List<User> ListaUsuarios = Usuarios.Where(x => x.Status.Id == 2).OrderByDescending(x => x.ModificationDate).ToList();
            ViewBag.UserList = ListaUsuarios;
            return View();
        }
    }
}
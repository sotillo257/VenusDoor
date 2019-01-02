using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VenusDoors.Controllers
{
    public class MastersController : Controller
    {
        // GET: Masters
        public ActionResult Index()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.DoorStyle = "active";
            return View();
        }

        // GET: Masters/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Masters/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Masters/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Masters/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Masters/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Masters/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Masters/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}

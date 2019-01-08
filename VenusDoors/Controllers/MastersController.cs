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

        public ActionResult DoorsPrices()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.DoorPrice = "active";
            return View();
        }

        public ActionResult Doors()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.Doors = "active";
            return View();
        }

        public ActionResult DoorStyleByInsideEdgeProfile()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.DoorStyleByInsideEdgeProfile = "active";
            return View();
        }

        public ActionResult BottomRail()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.BottomRail = "active";
            return View();
        }

        public ActionResult DoorStyleByOutsideEdgeProfile()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.DoorStyleByOutsideEdgeProfile = "active";
            return View();
        }

        public ActionResult DoorByUser()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.DoorByUser = "active";
            return View();
        }

        public ActionResult Group()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.Group = "active";
            return View();
        }

        public ActionResult HingeDirection()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.HingeDirection = "active";
            return View();
        }

        public ActionResult HingePositions()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.HingePositions = "active";
            return View();
        }

        public ActionResult HorizontalDivisions()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.HorizontalDivisions = "active";
            return View();
        }

        public ActionResult InsideEdgeProfile()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.InsideEdgeProfile = "active";
            return View();
        }

        public ActionResult Join()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.Join = "active";
            return View();
        }

        public ActionResult Material()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.Material = "active";
            return View();
        }

        public ActionResult MaterialxBottomRail()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.MaterialxBottomRail = "active";
            return View();
        }

        public ActionResult Order()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.Order = "active";
            return View();
        }

        public ActionResult OutsideEdgeProfile()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.OutsideEdgeProfile = "active";
            return View();
        }

        public ActionResult Panel()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.Panel = "active";
            return View();
        }
        public ActionResult PanelMaterial()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.PanelMaterial = "active";
            return View();
        }

        public ActionResult Person()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.Person = "active";
            return View();
        }

        public ActionResult Preparation()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.Preparation = "active";
            return View();
        }

        public ActionResult RailWidth()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.RailWidth = "active";
            return View();
        }

        public ActionResult Status()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.Status = "active";
            return View();
        }

        public ActionResult StileWidth()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.StileWidth = "active";
            return View();
        }

        public ActionResult TopRail()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.TopRail = "active";
            return View();
        }

        public ActionResult TopRailByHorizontalDivisions()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.TopRailByHorizontalDivisions = "active";
            return View();
        }

        public ActionResult TopRailByJoin()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.TopRailByJoin = "active";
            return View();
        }

        public ActionResult TopRailByVerticalDivisions()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.TopRailByVerticalDivisions = "active";
            return View();
        }

        public ActionResult Type()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.Type = "active";
            return View();
        }

        public ActionResult Usuario()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.Usuario = "active";
            return View();
        }

        public ActionResult VerticalDivisions()
        {
            ViewBag.Masters = "active show-sub";
            ViewBag.VerticalDivisions = "active";
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

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HelloWorldReact.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            HttpRequestBase request = this.HttpContext.Request;
            if (request.Cookies.Count!=0 && request.Cookies["id"].Value.ToString()!="")
            {
                return RedirectToAction("Index","Inicio");
            }
            return View();
        }
    }
}
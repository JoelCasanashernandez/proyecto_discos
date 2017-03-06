using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication1.Controllers
{
    [Authorize]
    public class InicioController : Controller
    {
        // GET: Inicio
        [Authorize]
        public ActionResult Index()
        {
            HttpRequestBase request = HttpContext.Request;
            if (request.Cookies["id"].Value.ToString() != "")
            {
                return View();
            }
            else
            {
                return RedirectToAction("Index","Home");
            }
            
        }
    }
}
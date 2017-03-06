using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class AccountController : Controller
    {
        // GET: Account

        [HttpPost]
        public ActionResult Register(Cliente account)
        {
            
            if (ModelState.IsValid)
            {
                using (OurDbContext db = new OurDbContext())
                {
                    db.Cliente.Add(account);
                    db.SaveChanges();
                }
                ModelState.Clear();
            }
            return RedirectToAction("Index", "Home");
        }
        //Login
        [HttpPost]
        public ActionResult Login(Cliente cliente)
        {
            using (OurDbContext db = new OurDbContext())
            {
                Cliente usr = null;
                usr = db.Cliente.FirstOrDefault(u => u.Email == cliente.Email && u.Password == cliente.Password);
                if (usr != null)
                {
                    FormsAuthentication.SetAuthCookie(usr.id.ToString(), false);
                    Session["id"] = usr.id.ToString();
                    Session["Email"] = usr.Email.ToString();
                    Session["Password"] = usr.Password.ToString();
                    HttpCookie ck = new HttpCookie("id");
                    ck.Value = usr.id.ToString();
                    Response.SetCookie(ck);
                    return RedirectToAction("Index","Inicio");

                }
                else
                {
                    ViewBag.Message = "Datos incorrectos.";
                    return RedirectToAction("Index","Home");
                }
            }
        }
        public ActionResult LoggedIn()
        {
            if (Session["Email"] != null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Login");
           }     

            }
        }
    }

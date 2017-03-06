using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Http.Description;
using WebApplication1;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class PuntuacionsController : ApiController
    {
        private OurDbContext db = new OurDbContext();

        // GET: api/Puntuacions
        public IQueryable<Puntuacion> GetPuntuacion()
        {
            return db.Puntuacion;
        }

        // GET: api/Puntuacions/5
        [ResponseType(typeof(Puntuacion))]
        public IHttpActionResult GetPuntuacion(int id)
        {
            Puntuacion puntuacion = db.Puntuacion.Find(id);
            if (puntuacion == null)
            {
                return NotFound();
            }

            return Ok(puntuacion);
        }

        // PUT: api/Puntuacions/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPuntuacion(int id, Puntuacion puntuacion)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != puntuacion.Id)
            {
                return BadRequest();
            }

            db.Entry(puntuacion).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PuntuacionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Puntuacions
        [ResponseType(typeof(Puntuacion))]
        public IHttpActionResult PostPuntuacion(Puntuacion puntuacion)
        {
            puntuacion.Idcliente = 1;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Puntuacion.Add(puntuacion);

            try
            {
                db.SaveChanges();
            }
            catch (DbEntityValidationException ex)
            {
                StringBuilder sb = new StringBuilder();

                foreach (var failure in ex.EntityValidationErrors)
                {
                    sb.AppendFormat("{0} failed validation\n", failure.Entry.Entity.GetType());
                    foreach (var error in failure.ValidationErrors)
                    {
                        sb.AppendFormat("- {0} : {1}", error.PropertyName, error.ErrorMessage);
                        sb.AppendLine();
                    }
                }

                throw new DbEntityValidationException(
                    "Entity Validation Failed - errors follow:\n" +
                    sb.ToString(), ex
                ); // Add the original exception as the innerException
            }

            return CreatedAtRoute("DefaultApi", new { id = puntuacion.Id }, puntuacion);
        }

        // DELETE: api/Puntuacions/5
        [ResponseType(typeof(Puntuacion))]
        public IHttpActionResult DeletePuntuacion(int id)
        {
            Puntuacion puntuacion = db.Puntuacion.Find(id);
            if (puntuacion == null)
            {
                return NotFound();
            }

            db.Puntuacion.Remove(puntuacion);
            db.SaveChanges();

            return Ok(puntuacion);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PuntuacionExists(int id)
        {
            return db.Puntuacion.Count(e => e.Id == id) > 0;
        }
    }
}
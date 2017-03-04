using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace WebApplication1.Models
{
    public class OurDbContext : DbContext
     {
        public DbSet<Cliente> Cliente { get; set; }
        public DbSet<Puntuacion> Puntuacion { get; set; }
    }
}
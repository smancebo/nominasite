﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace api.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class fmpEntities : DbContext
    {
        public fmpEntities()
            : base("name=fmpEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<payments> payments { get; set; }
        public virtual DbSet<payments_details> payments_details { get; set; }
        public virtual DbSet<phones> phones { get; set; }
        public virtual DbSet<reimbursement> reimbursement { get; set; }
        public virtual DbSet<staff> staff { get; set; }
        public virtual DbSet<titles> titles { get; set; }
        public virtual DbSet<users> users { get; set; }
        public virtual DbSet<schools> schools { get; set; }
    }
}

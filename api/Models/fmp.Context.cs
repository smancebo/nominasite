﻿//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
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
    
        public DbSet<contract_permit_periods> contract_permit_periods { get; set; }
        public DbSet<contract_permit_periods_hours_worked> contract_permit_periods_hours_worked { get; set; }
        public DbSet<contract_permits> contract_permits { get; set; }
        public DbSet<payments> payments { get; set; }
        public DbSet<payments_details> payments_details { get; set; }
        public DbSet<payments_reimbursements> payments_reimbursements { get; set; }
        public DbSet<phones> phones { get; set; }
        public DbSet<reimbursement> reimbursement { get; set; }
        public DbSet<schools> schools { get; set; }
        public DbSet<security_groups> security_groups { get; set; }
        public DbSet<security_groups_users> security_groups_users { get; set; }
        public DbSet<security_permits> security_permits { get; set; }
        public DbSet<security_screens> security_screens { get; set; }
        public DbSet<staff> staff { get; set; }
        public DbSet<staff_by_schools> staff_by_schools { get; set; }
        public DbSet<sys_parameters> sys_parameters { get; set; }
        public DbSet<titles> titles { get; set; }
        public DbSet<users> users { get; set; }
    }
}

//------------------------------------------------------------------------------
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
    using System.Collections.Generic;
    
    public partial class payments_reimbursements
    {
        public int id { get; set; }
        public Nullable<int> reimbursement_id { get; set; }
        public Nullable<int> payment_id { get; set; }
        public string day { get; set; }
        public Nullable<System.DateTime> date { get; set; }
        public Nullable<decimal> hours { get; set; }
        public Nullable<decimal> rate { get; set; }
        public string comment { get; set; }
        public Nullable<int> reimbursement_type { get; set; }
        public string employee_code { get; set; }
    
        public virtual staff staff { get; set; }
    }
}

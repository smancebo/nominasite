//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace models
{
    using System;
    using System.Collections.Generic;
    
    public partial class payments_details
    {
        public int id { get; set; }
        public Nullable<int> payment_id { get; set; }
        public string employee_code { get; set; }
        public Nullable<System.DateTime> day { get; set; }
        public Nullable<decimal> required_hours { get; set; }
        public Nullable<decimal> overtime { get; set; }
        public string comments { get; set; }
    
        public virtual payments payments { get; set; }
        public virtual staff staff { get; set; }
    }
}

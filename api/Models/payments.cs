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
    
    public partial class payments
    {
        public payments()
        {
            this.payments_details = new HashSet<payments_details>();
        }
    
        public int payment_id { get; set; }
        public Nullable<System.DateTime> startdate { get; set; }
        public Nullable<System.DateTime> enddate { get; set; }
        public string username { get; set; }
        public Nullable<bool> applied { get; set; }
        public string payment_code { get; set; }
    
        public virtual ICollection<payments_details> payments_details { get; set; }
        public virtual users users { get; set; }
    }
}

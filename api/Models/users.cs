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
    
    public partial class users
    {
        public users()
        {
            this.payments = new HashSet<payments>();
        }
    
        public int id { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string school_code { get; set; }
    
        public virtual ICollection<payments> payments { get; set; }
        public virtual schools schools { get; set; }
    }
}

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
    
    public partial class titles
    {
        public titles()
        {
            this.staff = new HashSet<staff>();
        }
    
        public int id { get; set; }
        public string description { get; set; }
        public Nullable<decimal> payrate { get; set; }
        public Nullable<decimal> nigthdiff { get; set; }
    
        public virtual ICollection<staff> staff { get; set; }
    }
}

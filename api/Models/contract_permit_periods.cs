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
    
    public partial class contract_permit_periods
    {
        public int id { get; set; }
        public string guid { get; set; }
        public string number_registered { get; set; }
        public string week_days { get; set; }
        public Nullable<System.DateTime> start_date { get; set; }
        public Nullable<System.DateTime> end_date { get; set; }
        public string start_time { get; set; }
        public string end_time { get; set; }
        public Nullable<int> hours { get; set; }
    }
}

//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

using System;
using System.Collections.Generic;

public partial class security_permits
{
    public int id { get; set; }
    public string username { get; set; }
    public string group { get; set; }
    public string screen_code { get; set; }

    public virtual security_groups security_groups { get; set; }
    public virtual security_screens security_screens { get; set; }
    public virtual users users { get; set; }
}

//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace AngularWebApiMakeLifeEasyModel.Model
{
    using System;
    using System.Collections.Generic;
    
    public partial class ProductFile
    {
        public string CustomerId { get; set; }
        public string ProductCode { get; set; }
        public string Description { get; set; }
        public string DescriptionShort { get; set; }
        public Nullable<int> ProductGroup { get; set; }
        public Nullable<short> KeyboardOrderX { get; set; }
        public Nullable<short> KeyboardOrderY { get; set; }
        public string HTextAlign { get; set; }
        public string TextSize { get; set; }
        public string Weight { get; set; }
        public string VTextAlign { get; set; }
        public string Facename { get; set; }
        public string VatCode { get; set; }
        public Nullable<bool> ShowDescriptionWithImage { get; set; }
        public byte[] Photo { get; set; }
        public byte[] DSPhoto { get; set; }
        public byte[] WebPhoto { get; set; }
        public string Image { get; set; }
        public string Filepath { get; set; }
        public string Tags { get; set; }
        public Nullable<int> Width { get; set; }
        public Nullable<int> Height { get; set; }
        public Nullable<decimal> SellingPrice { get; set; }
        public Nullable<int> XPos { get; set; }
        public Nullable<int> YPos { get; set; }
        public string ProductFace { get; set; }
        public Nullable<bool> UseImage { get; set; }
        public Nullable<decimal> ShippingPrice { get; set; }
        public string Details { get; set; }
    }
}
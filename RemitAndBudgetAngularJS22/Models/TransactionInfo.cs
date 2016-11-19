using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RemitAndBudgetAngularJS22.Models
{
    public class TransactionInfo
    {
        public int TransactionInfoId { get; set; }
        public string Amount { get; set; }
        public DateTime Month { get; set; }
        public string Description { get; set; }
        public string Action { get; set; }
        //no longer relationship
        //public int UserInfoId { get; set; }
        //[JsonIgnore]
        //public virtual UserInfo UserInfo { get; set; }
        public string UserId { get; set; }
    }
}
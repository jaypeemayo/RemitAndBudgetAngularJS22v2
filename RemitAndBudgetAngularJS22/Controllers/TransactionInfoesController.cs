using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using RemitAndBudgetAngularJS22.Models;
using Microsoft.AspNet.Identity;
using System.Security.Claims;

namespace RemitAndBudgetAngularJS22.Controllers
{
    [Authorize]
    public class TransactionInfoesController : ApiController
    {
        private RemitAndBudgetAngularJS22Context db = new RemitAndBudgetAngularJS22Context();

        private string GetCurrentUserId()
        {
            var identity = (ClaimsIdentity)User.Identity;
            return identity.Claims.Where(c => c.Type == ClaimTypes.Sid)
                     .Select(c => c.Value).SingleOrDefault();
        }
        // GET: api/TransactionInfoes
        public IQueryable<TransactionInfo> GetTransactionInfoes()
        {
          
            return db.TransactionInfoes;
        }

        // GET: api/TransactionInfoes/5
        [ResponseType(typeof(TransactionInfo))]
        public IHttpActionResult GetTransactionInfo(int id)
        {
            TransactionInfo transactionInfo = db.TransactionInfoes.Find(id);
            if (transactionInfo == null)
            {
                return NotFound();
            }

            return Ok(transactionInfo);
        }

        // PUT: api/TransactionInfoes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTransactionInfo(int id, TransactionInfo transactionInfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != transactionInfo.TransactionInfoId)
            {
                return BadRequest();
            }
           
            db.Entry(transactionInfo).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransactionInfoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/TransactionInfoes     
        [ResponseType(typeof(TransactionInfo))]
        public IHttpActionResult PostTransactionInfo(TransactionInfo transactionInfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            transactionInfo.UserId = GetCurrentUserId();
            db.TransactionInfoes.Add(transactionInfo);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = transactionInfo.TransactionInfoId }, transactionInfo);
        }

        // DELETE: api/TransactionInfoes/5
        [ResponseType(typeof(TransactionInfo))]
        public IHttpActionResult DeleteTransactionInfo(int id)
        {
            TransactionInfo transactionInfo = db.TransactionInfoes.Find(id);
            if (transactionInfo == null)
            {
                return NotFound();
            }

            db.TransactionInfoes.Remove(transactionInfo);
            db.SaveChanges();

            return Ok(transactionInfo);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TransactionInfoExists(int id)
        {
            return db.TransactionInfoes.Count(e => e.TransactionInfoId == id) > 0;
        }
    }
}
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using AngularWebApiMakeLifeEasyModel.Model;
using System.Web.Http.OData;

namespace AngularWebApiMakeLifeEasy.Controllers
{
    public class LocalesHistoriesController : ApiController
    {
        private AngularWebApiMakeLifeEasyEntities db = new AngularWebApiMakeLifeEasyEntities();

        // GET: api/LocalesHistories
        [EnableQueryAttribute]
        public IQueryable<LocalesHistory> GetLocalesHistories()
        {
            return db.LocalesHistories;
        }

        // GET: api/LocalesHistories/5
        [ResponseType(typeof(LocalesHistory))]
        public async Task<IHttpActionResult> GetLocalesHistory(DateTime id)
        {
            LocalesHistory localesHistory = await db.LocalesHistories.FindAsync(id);
            if (localesHistory == null)
            {
                return NotFound();
            }

            return Ok(localesHistory);
        }

        // PUT: api/LocalesHistories/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutLocalesHistory(DateTime id, LocalesHistory localesHistory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != localesHistory.CreateDate)
            {
                return BadRequest();
            }

            db.Entry(localesHistory).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LocalesHistoryExists(id))
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

        // POST: api/LocalesHistories
        [ResponseType(typeof(LocalesHistory))]
        public async Task<IHttpActionResult> PostLocalesHistory(LocalesHistory localesHistory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.LocalesHistories.Add(localesHistory);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (LocalesHistoryExists(localesHistory.CreateDate))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = localesHistory.CreateDate }, localesHistory);
        }

        // DELETE: api/LocalesHistories/5
        [ResponseType(typeof(LocalesHistory))]
        public async Task<IHttpActionResult> DeleteLocalesHistory(DateTime id)
        {
            LocalesHistory localesHistory = await db.LocalesHistories.FindAsync(id);
            if (localesHistory == null)
            {
                return NotFound();
            }

            db.LocalesHistories.Remove(localesHistory);
            await db.SaveChangesAsync();

            return Ok(localesHistory);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LocalesHistoryExists(DateTime id)
        {
            return db.LocalesHistories.Count(e => e.CreateDate == id) > 0;
        }
    }
}
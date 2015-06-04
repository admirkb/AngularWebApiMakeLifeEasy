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
    public class BandsController : ApiController
    {
        private AngularWebApiMakeLifeEasyEntities db = new AngularWebApiMakeLifeEasyEntities();

        // GET: api/Bands
        [EnableQueryAttribute]
        public IQueryable<Band> GetBands()
        {
            return db.Bands;
        }

        // GET: api/Bands/5
        [ResponseType(typeof(Band))]
        public async Task<IHttpActionResult> GetBand(int id)
        {
            Band band = await db.Bands.FindAsync(id);
            if (band == null)
            {
                return NotFound();
            }

            return Ok(band);
        }

        // PUT: api/Bands/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutBand(int id, Band band)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != band.Id)
            {
                return BadRequest();
            }

            db.Entry(band).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BandExists(id))
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

        // POST: api/Bands
        [ResponseType(typeof(Band))]
        public async Task<IHttpActionResult> PostBand(Band band)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Bands.Add(band);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (BandExists(band.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = band.Id }, band);
        }

        // DELETE: api/Bands/5
        [ResponseType(typeof(Band))]
        public async Task<IHttpActionResult> DeleteBand(int id)
        {
            Band band = await db.Bands.FindAsync(id);
            if (band == null)
            {
                return NotFound();
            }

            db.Bands.Remove(band);
            await db.SaveChangesAsync();

            return Ok(band);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BandExists(int id)
        {
            return db.Bands.Count(e => e.Id == id) > 0;
        }
    }
}
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
using System.Web.Http.ModelBinding;
using System.Web.Http.OData;
using System.Web.Http.OData.Routing;
using AngularWebApiMakeLifeEasyModel.Model;

namespace AngularWebApiMakeLifeEasy.Controllers
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using AngularWebApiMakeLifeEasyModel.Model;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<Band>("oDataBands");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class oDataBandsController : ODataController
    {
        private AngularWebApiMakeLifeEasyEntities db = new AngularWebApiMakeLifeEasyEntities();

        // GET: odata/oDataBands
        [EnableQuery]
        public IQueryable<Band> GetoDataBands()
        {
            return db.Bands;
        }

        // GET: odata/oDataBands(5)
        [EnableQuery]
        public SingleResult<Band> GetBand([FromODataUri] int key)
        {
            return SingleResult.Create(db.Bands.Where(band => band.Id == key));
        }

        // PUT: odata/oDataBands(5)
        public async Task<IHttpActionResult> Put([FromODataUri] int key, Delta<Band> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Band band = await db.Bands.FindAsync(key);
            if (band == null)
            {
                return NotFound();
            }

            patch.Put(band);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BandExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(band);
        }

        // POST: odata/oDataBands
        public async Task<IHttpActionResult> Post(Band band)
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

            return Created(band);
        }

        // PATCH: odata/oDataBands(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> Patch([FromODataUri] int key, Delta<Band> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Band band = await db.Bands.FindAsync(key);
            if (band == null)
            {
                return NotFound();
            }

            patch.Patch(band);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BandExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(band);
        }

        // DELETE: odata/oDataBands(5)
        public async Task<IHttpActionResult> Delete([FromODataUri] int key)
        {
            Band band = await db.Bands.FindAsync(key);
            if (band == null)
            {
                return NotFound();
            }

            db.Bands.Remove(band);
            await db.SaveChangesAsync();

            return StatusCode(HttpStatusCode.NoContent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BandExists(int key)
        {
            return db.Bands.Count(e => e.Id == key) > 0;
        }
    }
}

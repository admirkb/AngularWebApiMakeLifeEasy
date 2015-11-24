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
    builder.EntitySet<ProductFile>("oDataProductFiles");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class oDataProductFilesController : ODataController
    {
        private AngularWebApiMakeLifeEasyEntities db = new AngularWebApiMakeLifeEasyEntities();

        // GET: odata/oDataProductFiles
        [EnableQuery]
        public IQueryable<ProductFile> GetoDataProductFiles()
        {
            return db.ProductFiles;
        }

        // GET: odata/oDataProductFiles(5)
        [EnableQuery]
        public SingleResult<ProductFile> GetProductFile([FromODataUri] string key)
        {
            return SingleResult.Create(db.ProductFiles.Where(productFile => productFile.CustomerId == key));
        }

        // PUT: odata/oDataProductFiles(5)
        public async Task<IHttpActionResult> Put([FromODataUri] string key, Delta<ProductFile> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ProductFile productFile = await db.ProductFiles.FindAsync(key);
            if (productFile == null)
            {
                return NotFound();
            }

            patch.Put(productFile);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductFileExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(productFile);
        }

        // POST: odata/oDataProductFiles
        public async Task<IHttpActionResult> Post(ProductFile productFile)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ProductFiles.Add(productFile);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ProductFileExists(productFile.CustomerId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Created(productFile);
        }

        // PATCH: odata/oDataProductFiles(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> Patch([FromODataUri] string key, Delta<ProductFile> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ProductFile productFile = await db.ProductFiles.FindAsync(key);
            if (productFile == null)
            {
                return NotFound();
            }

            patch.Patch(productFile);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductFileExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(productFile);
        }

        // DELETE: odata/oDataProductFiles(5)
        public async Task<IHttpActionResult> Delete([FromODataUri] string key)
        {
            ProductFile productFile = await db.ProductFiles.FindAsync(key);
            if (productFile == null)
            {
                return NotFound();
            }

            db.ProductFiles.Remove(productFile);
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

        private bool ProductFileExists(string key)
        {
            return db.ProductFiles.Count(e => e.CustomerId == key) > 0;
        }
    }
}

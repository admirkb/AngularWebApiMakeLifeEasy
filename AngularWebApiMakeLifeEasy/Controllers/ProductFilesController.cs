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
    public class ProductFilesController : ApiController
    {
        private AngularWebApiMakeLifeEasyEntities db = new AngularWebApiMakeLifeEasyEntities();

        // GET: api/ProductFiles
        [EnableQueryAttribute]
        public IQueryable<ProductFile> GetProductFiles()
        {
            return db.ProductFiles;
        }

        // GET: api/ProductFiles/5
        [ResponseType(typeof(ProductFile))]
        public async Task<IHttpActionResult> GetProductFile(string id)
        {
            ProductFile productFile = await db.ProductFiles.FindAsync(id);
            if (productFile == null)
            {
                return NotFound();
            }

            return Ok(productFile);
        }

        // PUT: api/ProductFiles/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutProductFile(string id, ProductFile productFile)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != productFile.CustomerId)
            {
                return BadRequest();
            }

            db.Entry(productFile).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductFileExists(id))
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

        // POST: api/ProductFiles
        [ResponseType(typeof(ProductFile))]
        public async Task<IHttpActionResult> PostProductFile(ProductFile productFile)
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

            return CreatedAtRoute("DefaultApi", new { id = productFile.CustomerId }, productFile);
        }

        // DELETE: api/ProductFiles/5
        [ResponseType(typeof(ProductFile))]
        public async Task<IHttpActionResult> DeleteProductFile(string id)
        {
            ProductFile productFile = await db.ProductFiles.FindAsync(id);
            if (productFile == null)
            {
                return NotFound();
            }

            db.ProductFiles.Remove(productFile);
            await db.SaveChangesAsync();

            return Ok(productFile);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProductFileExists(string id)
        {
            return db.ProductFiles.Count(e => e.CustomerId == id) > 0;
        }
    }
}
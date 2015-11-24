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
    builder.EntitySet<Staff>("oDataStaffs");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class oDataStaffsController : ODataController
    {
        private AngularWebApiMakeLifeEasyEntities db = new AngularWebApiMakeLifeEasyEntities();

        // GET: odata/oDataStaffs
        [EnableQuery]
        public IQueryable<Staff> GetoDataStaffs()
        {
            return db.Staffs;
        }

        // GET: odata/oDataStaffs(5)
        [EnableQuery]
        public SingleResult<Staff> GetStaff([FromODataUri] string key)
        {
            return SingleResult.Create(db.Staffs.Where(staff => staff.CustomerId == key));
        }

        // PUT: odata/oDataStaffs(5)
        public async Task<IHttpActionResult> Put([FromODataUri] string key, Delta<Staff> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Staff staff = await db.Staffs.FindAsync(key);
            if (staff == null)
            {
                return NotFound();
            }

            patch.Put(staff);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StaffExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(staff);
        }

        // POST: odata/oDataStaffs
        public async Task<IHttpActionResult> Post(Staff staff)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Staffs.Add(staff);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (StaffExists(staff.CustomerId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Created(staff);
        }

        // PATCH: odata/oDataStaffs(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> Patch([FromODataUri] string key, Delta<Staff> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Staff staff = await db.Staffs.FindAsync(key);
            if (staff == null)
            {
                return NotFound();
            }

            patch.Patch(staff);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StaffExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(staff);
        }

        // DELETE: odata/oDataStaffs(5)
        public async Task<IHttpActionResult> Delete([FromODataUri] string key)
        {
            Staff staff = await db.Staffs.FindAsync(key);
            if (staff == null)
            {
                return NotFound();
            }

            db.Staffs.Remove(staff);
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

        private bool StaffExists(string key)
        {
            return db.Staffs.Count(e => e.CustomerId == key) > 0;
        }
    }
}

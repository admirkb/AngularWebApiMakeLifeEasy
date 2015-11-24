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
    public class StaffsController : ApiController
    {
        private AngularWebApiMakeLifeEasyEntities db = new AngularWebApiMakeLifeEasyEntities();

        // GET: api/Staffs
        [EnableQueryAttribute]
        public IQueryable<Staff> GetStaffs()
        {
            return db.Staffs;
        }

        // GET: api/Staffs/5
        [ResponseType(typeof(Staff))]
        public async Task<IHttpActionResult> GetStaff(string id)
        {
            Staff staff = await db.Staffs.FindAsync(id);
            if (staff == null)
            {
                return NotFound();
            }

            return Ok(staff);
        }

        // PUT: api/Staffs/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutStaff(string customerId, int id, Staff staff)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (customerId != staff.CustomerId && id != staff.StaffId)
            {
                return BadRequest();
            }

            db.Entry(staff).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StaffExists(staff.CustomerId, id))
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

        // POST: api/Staffs
        [ResponseType(typeof(Staff))]
        public async Task<IHttpActionResult> PostStaff(Staff staff)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            int staffCount = db.Staffs.Where(m => m.CustomerId == staff.CustomerId).Max(m => m.StaffId);
            staff.StaffId = staffCount + 1;

            db.Staffs.Add(staff);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = staff.StaffId }, staff);
        }

        // DELETE: api/Staffs/5
        [ResponseType(typeof(Staff))]
        public async Task<IHttpActionResult> DeleteStaff(string customerId, int id)
        {

            try
            {

                Staff staff = db.Staffs.Where(m => m.CustomerId == customerId && m.StaffId == id).First();
                if (staff == null)
                {
                    return NotFound();
                }

   

                db.Staffs.Remove(staff);
                await db.SaveChangesAsync();

                return Ok(staff);

                //return null;
            }
            catch (Exception ex)
            {
                return null;
            }



        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool StaffExists(string customerId, int id)
        {
            return db.Staffs.Count(e => e.CustomerId == customerId && e.StaffId == id) > 0;

        }
    }
}
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
    public class LocalesController : ApiController
    {
        private AngularWebApiMakeLifeEasyEntities db = new AngularWebApiMakeLifeEasyEntities();

        // GET: api/Locales
        [EnableQueryAttribute]
        public IQueryable<Locale> GetLocales()
        {
            return db.Locales;
        }

        // GET: api/Locales/5
        [ResponseType(typeof(Locale))]
        public async Task<IHttpActionResult> GetLocale(int id)
        {
            Locale locale = await db.Locales.FindAsync(id);
            if (locale == null)
            {
                return NotFound();
            }

            return Ok(locale);
        }

        // PUT: api/Locales/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutLocale(int id, Locale locale)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != locale.LocalesId)
            {
                return BadRequest();
            }

            db.Entry(locale).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LocaleExists(id))
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

        // POST: api/Locales
        [ResponseType(typeof(Locale))]
        public async Task<IHttpActionResult> PostLocale(Locale locale)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Locales.Add(locale);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = locale.LocalesId }, locale);
        }

        // DELETE: api/Locales/5
        [ResponseType(typeof(Locale))]
        public async Task<IHttpActionResult> DeleteLocale(int id)
        {
            Locale locale = await db.Locales.FindAsync(id);
            if (locale == null)
            {
                return NotFound();
            }

            db.Locales.Remove(locale);
            await db.SaveChangesAsync();

            return Ok(locale);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LocaleExists(int id)
        {
            return db.Locales.Count(e => e.LocalesId == id) > 0;
        }
    }
}
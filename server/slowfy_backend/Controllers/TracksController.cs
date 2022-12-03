using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Serialization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using slowfy_backend.Data;
using slowfy_backend.Models;
using slowfy_backend.Services;

namespace slowfy_backend.Controllers
{
    public class TracksController : Controller
    {
        private readonly slowfy_backendContext _context;

        public TracksController(slowfy_backendContext context)
        {
            _context = context;
        }

        // GET: Tracks
        public async Task<IActionResult> Index()
        {
            return Json(await _context.Tracks.ToListAsync());
        }
        
        [HttpPost]
        public async Task<IActionResult> Create([Bind("Author,Title,Duration,Source")] Tracks tracks)
        {
            if (ModelState.IsValid)
            {
                _context.Add(tracks);
                await _context.SaveChangesAsync();
                return Json(tracks);
            }
            else return BadRequest("error");
        }

        private bool TracksExists(int id)
        {
            return (_context.Tracks?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        [HttpGet]
        public async Task<IActionResult> GetMostPopularTracks(int count = 10)
        {
            return Json(SortByPopular(await _context.Tracks.ToListAsync(), count).Select(g => g.Track));
        }

        private List<SBP_dto> SortByPopular(List<Tracks>? initial, int max = 10)
        {
            var idsTracks = initial.Select(p => p.Id);
            var auds = idsTracks.Select(p =>
            {
                var aud = _context.Auditions.Count(g => g.Track.Id == p);
                return new SBP_dto()
                {
                    Auds = aud,
                    Track = _context.Tracks.FirstOrDefault(b => b.Id == p) ?? null
                };
            });
            auds = auds.OrderByDescending(p => p.Auds);
            return auds.Take(max).ToList();
        }

        // tracks/search?q=NAME&count=10
        public IActionResult Search(string q = "", int count = 10)
        {
            Console.WriteLine("q" + q);
            if (String.IsNullOrEmpty(q) || String.IsNullOrWhiteSpace(q)) return Json(new {});
            List<Tracks> allResults = new List<Tracks>();
            var res = _context.Tracks.Where(p => p.Title.ToLower().Contains(q.ToLower())).ToList();
            var res2 = _context.Tracks.Where(p => p.Author.ToLower().Contains(q.ToLower())).ToList();
            allResults = allResults.Concat(res).ToList();
            allResults = allResults.Concat(res2).ToList();
            
            var sorted = SortByPopular(allResults, count);
            return Json(sorted.Select(p => p.Track).ToList());
        }

        [HttpGet]
        public async Task<IActionResult> GetRandomTracks(int count = 10)
        {
            Random rnd = new Random();
            var s = _context.Tracks.Skip(rnd.Next(1,
                (int)Math.Round((double)await _context.Tracks.CountAsync() / 1.5)));

            var res = await s.Take(count).ToListAsync();
            return count > res.Count() ? Json(await _context.Tracks.ToListAsync()) : Json(res);
        }

        [HttpGet]
        public async Task<IActionResult> GetTracksByAuthor(string author)
        {
            return Json(await _context.Tracks.Where(p => p.Author == author).ToListAsync());
        }

        [HttpGet]
        public async Task<IActionResult> GetTrackById(int id)
        {
            var tracks = await _context.Tracks.FirstOrDefaultAsync(p => p.Id == id);
            return tracks != null ? Json(tracks) : BadRequest("none");
        }
    }
    
    public sealed class Utf8StringWriter : StringWriter
    {
        public override Encoding Encoding => Encoding.UTF8;
    }
}

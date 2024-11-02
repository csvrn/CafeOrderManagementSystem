using CafeOrderManagement.DataAccess.Repository.IRepository;
using CafeOrderManagement.Models;
using Microsoft.AspNetCore.Mvc;

namespace CafeOrderManagement.Controllers
{
	[Route("[Controller]/[action]")]
	[ApiController]
	public class CategoryController :ControllerBase
	{
		private readonly ICategoryRepository _categoryRepo;
        public CategoryController(ICategoryRepository categoryRepo)
        {
            _categoryRepo = categoryRepo;
        }

		[HttpGet]
		public IActionResult GetAll()
		{
			List<Category> categories = _categoryRepo.GetAll().ToList();
			return Ok(categories);
		}
		[HttpGet("{id:int}")]
		public IActionResult Get(int id)
		{
			if (id != 0)
			{
				Category category = _categoryRepo.Get(u => u.Id == id);
				return Ok(category);
			}
			else
			{
				return NotFound();
			}
		}
		[HttpPost]
		public IActionResult Create([FromBody] Category cat)
		{
			if (ModelState.IsValid)
			{
				try
				{
					_categoryRepo.Add(cat);
					_categoryRepo.Save();
					return Ok(new { success = true, message = "Category created successfully." });
				}
				catch (Exception exception)
				{
					return StatusCode(500, $"Internal server error: {exception.Message}");
				}

			}
			else
			{
				return BadRequest(ModelState);
			}

		}

		[HttpPut]
		public IActionResult Update([FromBody] Category cat)
		{
			if (ModelState.IsValid)
			{
				try
				{
					_categoryRepo.Update(cat);
					_categoryRepo.Save();
					return Ok(new { success = true, message = "Category updated successfully." });
				}
				catch (Exception exception)
				{
					return StatusCode(500, $"Internal server error: {exception.Message}");
				}

			}
			else
			{
				return BadRequest(ModelState);
			}

		}
		[HttpDelete("{id:int}")]
		public IActionResult Delete(int id)
		{
			try
			{
				Category cat = _categoryRepo.Get(u => u.Id == id);
				_categoryRepo.Remove(cat);
				_categoryRepo.Save();
				return Ok(new { success = true, message = "Category deleted successfully" });
			}
			catch (Exception exception)
			{
				return StatusCode(500, $"Internal server error: {exception.Message}.");
			}

		}

	}
}

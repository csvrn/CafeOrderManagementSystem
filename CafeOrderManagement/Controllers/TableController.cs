using CafeOrderManagement.DataAccess.Repository.IRepository;
using CafeOrderManagement.Models;
using Microsoft.AspNetCore.Mvc;

namespace CafeOrderManagement.Controllers
{
	[Route("[Controller]/[action]")]
	[ApiController]
	public class TableController : ControllerBase
	{
		private readonly ITableRepository _tableRepo;
        public TableController(ITableRepository tableRepo)
        {
            _tableRepo = tableRepo;
        }
		[HttpGet]
		public IActionResult GetAll()
		{
			List<Table> tables = _tableRepo.GetAll().ToList();
			return Ok(tables);
		}
		[HttpGet("{id:int}")]
		public IActionResult Get(int id)
		{
			if (id != 0)
			{
				Table table = _tableRepo.Get(u => u.Id == id);
				return Ok(table);
			}
			else
			{
				return NotFound();
			}
		}
		[HttpPost]
		public IActionResult Create([FromBody] Table table)
		{
			if (ModelState.IsValid)
			{
				try
				{
					_tableRepo.Add(table);
					_tableRepo.Save();
					return Ok(new { success = true, message = "Table created successfully." });
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
		public IActionResult Update([FromBody] Table table)
		{
			if (ModelState.IsValid)
			{
				try
				{
					_tableRepo.Update(table);
					_tableRepo.Save();
					return Ok(new { success = true, message = "Table updated successfully." });
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
				Table table = _tableRepo.Get(u => u.Id == id);
				_tableRepo.Remove(table);
				_tableRepo.Save();
				return Ok(new { success = true, message = "Table deleted successfully" });
			}
			catch (Exception exception)
			{
				return StatusCode(500, $"Internal server error: {exception.Message}.");
			}

		}


	}
}

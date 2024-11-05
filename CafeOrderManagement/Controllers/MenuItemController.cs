using CafeOrderManagement.DataAccess.Repository;
using CafeOrderManagement.DataAccess.Repository.IRepository;
using CafeOrderManagement.Models;
using Microsoft.AspNetCore.Mvc;

namespace CafeOrderManagement.Controllers
{
	[Route("[Controller]/[action]")]
	[ApiController]
	public class MenuItemController : ControllerBase
	{
		private readonly IMenuItemRepository _menuItemRepo;
		public MenuItemController(IMenuItemRepository menuItemRepo)
		{
			_menuItemRepo = menuItemRepo;
		}

		#region API CALLS
		[HttpGet]
		public IActionResult GetAll()
		{
			List<MenuItem> menuItems = _menuItemRepo.GetAll(includeProperties: "Category").ToList();
			return Ok(menuItems);
		}
		[HttpGet("{id:int}")]
		public IActionResult Get(int id)
		{
			if (id!=0)
			{
				MenuItem menuItem = _menuItemRepo.Get(u => u.Id == id, includeProperties: "Category");
				return Ok(menuItem );
			}
			else
			{
				return NotFound();
			}
		}
		[HttpPost]
		public IActionResult Create([FromBody] MenuItem item)
		{
			if (ModelState.IsValid)
			{
				try
				{
					_menuItemRepo.Add(item);
					_menuItemRepo.Save();
					return Ok(new { success = true, message = "Menu item created successfully." });
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
		public IActionResult Update([FromBody] MenuItem item)
		{
			if (ModelState.IsValid)
			{
				try
				{
					_menuItemRepo.Update(item);
					_menuItemRepo.Save();
					return Ok(new { success = true, message = "Menu item updated successfully." });
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
				MenuItem item = _menuItemRepo.Get(u => u.Id == id);
				_menuItemRepo.Remove(item);
				_menuItemRepo.Save();
				return Ok(new { success = true, message = "Menu item deleted successfully" });
			}
			catch (Exception exception)
			{
				return StatusCode(500, $"Internal server error: {exception.Message}.");
			}

		}
		#endregion
	}
}

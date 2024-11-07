using CafeOrderManagement.DataAccess.Repository.IRepository;
using CafeOrderManagement.Models;
using Microsoft.AspNetCore.Mvc;

namespace CafeOrderManagement.Controllers
{
	[Route("[Controller]/[action]")]
	[ApiController]
	public class OrderController : ControllerBase
	{
		private readonly IOrderRepository _orderRepo;
		private readonly ITableRepository _tableRepository;
		public OrderController(IOrderRepository orderRepo, ITableRepository tableRepository)
		{
			_orderRepo = orderRepo;
			_tableRepository = tableRepository;
		}
		[HttpGet]
		public IActionResult GetAll()
		{
			List<Order> orders = _orderRepo.GetAll(includeProperties: "Table").ToList();
			return Ok(orders);
		}
		[HttpGet("{id:int}")]
		public IActionResult Get(int id)
		{
			if (id != 0)
			{
				Order order = _orderRepo.Get(u => u.Id == id, includeProperties: "Table");
				return Ok(order);
			}
			else
			{
				return NotFound();
			}
		}
		[HttpPost]
		public IActionResult Create([FromBody] Order order)
		{
			if (ModelState.IsValid)
			{
				try
				{
					_orderRepo.Add(order);
					_orderRepo.Save();

					Table table = _tableRepository.Get(u=>u.Id == order.TableId);
					table.Status = Table.TableStatus.Occupied;
					_tableRepository.Update(table);
					_tableRepository.Save();

					return Ok(new { success = true, message = "Order created successfully.", orderId = order.Id });
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
		public IActionResult Update([FromBody] Order order)
		{
			if (ModelState.IsValid)
			{
				try
				{
					_orderRepo.Update(order);
					_orderRepo.Save();
					return Ok(new { success = true, message = "Order updated successfully." });
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
				Order order = _orderRepo.Get(u => u.Id == id);
				if (order.Status!=Order.OrderStatus.Pending)
				{
					return BadRequest("Rejected or completed orders cannot be deleted.");
				}
				else
				{
					_orderRepo.Remove(order);
					_orderRepo.Save();
					return Ok(new { success = true, message = "Order deleted successfully" });
				}
			}
			catch (Exception exception)
			{
				return StatusCode(500, $"Internal server error: {exception.Message}.");
			}

		}
	}
}

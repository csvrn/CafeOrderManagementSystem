using CafeOrderManagement.DataAccess.Repository.IRepository;
using CafeOrderManagement.Models;
using Microsoft.AspNetCore.Mvc;

namespace CafeOrderManagement.Controllers
{
	[Route("[Controller]/[action]")]
	[ApiController]
	public class OrderDetailController:ControllerBase
	{
		private readonly IOrderDetailRepository _orderDetailRepo;
        public OrderDetailController(IOrderDetailRepository orderDetailRepo)
        {
			_orderDetailRepo = orderDetailRepo;   
        }
		[HttpGet]
		public IActionResult GetAll()
		{
			List<OrderDetail> orderDetail =_orderDetailRepo.GetAll(includeProperties:"Order,MenuItem").ToList();
			return Ok(orderDetail);
		}
		[HttpGet("{id:int}")]
		public IActionResult Get(int id)
		{
			if (id != 0)
			{
				OrderDetail orderDetail = _orderDetailRepo.Get(u => u.Id == id, includeProperties: "Order,MenuItem");
				return Ok(orderDetail);
			}
			else
			{
				return NotFound();
			}
		}
		[HttpPost]
		public IActionResult Create([FromBody] OrderDetail orderDetail)
		{
			if (ModelState.IsValid)
			{
				try
				{
					_orderDetailRepo.Add(orderDetail);
					_orderDetailRepo.Save();
					return Ok(new { success = true, message = "Order detail created successfully." });
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
		public IActionResult Update([FromBody] OrderDetail orderDetail)
		{
			if (ModelState.IsValid)
			{
				try
				{
					_orderDetailRepo.Update(orderDetail);
					_orderDetailRepo.Save();
					return Ok(new { success = true, message = "Order detail updated successfully." });
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
				OrderDetail table = _orderDetailRepo.Get(u => u.Id == id);
				_orderDetailRepo.Remove(table);
				_orderDetailRepo.Save();
				return Ok(new { success = true, message = "Order detail deleted successfully" });
			}
			catch (Exception exception)
			{
				return StatusCode(500, $"Internal server error: {exception.Message}.");
			}

		}


	}
}

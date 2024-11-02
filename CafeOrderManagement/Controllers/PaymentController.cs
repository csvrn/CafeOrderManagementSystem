using System.Text.Json.Serialization;
using CafeOrderManagement.DataAccess.Repository.IRepository;
using CafeOrderManagement.Models;
using Microsoft.AspNetCore.Mvc;

namespace CafeOrderManagement.Controllers
{
	[Route("[Controller]/[action]")]
	[ApiController]
	public class PaymentController:ControllerBase
	{
		private readonly IPaymentRepository _paymentRepo;
		private readonly IOrderRepository _orderRepo;
		private readonly ITableRepository _tableRepo;

        public PaymentController(IPaymentRepository paymentRepo,IOrderRepository orderRepo,ITableRepository tableRepo)
        {
            _paymentRepo = paymentRepo;
			_orderRepo= orderRepo;
			_tableRepo = tableRepo;
        }

		[HttpGet]
		public IActionResult GetAll()
		{
			List<Payment> payments = _paymentRepo.GetAll(includeProperties: "Order").ToList();
			return Ok(payments);
		}

		[HttpGet("{id:int}")]
		public IActionResult Get(int id)
		{
			if (id != 0)
			{
				Payment payment = _paymentRepo.Get(u => u.Id == id, includeProperties: "Order");
				return Ok(payment);
			}
			else
			{
				return NotFound();
			}
		}
		[HttpPost]
		public IActionResult Create([FromBody] Payment payment)
		{
			if (ModelState.IsValid)
			{
				try
				{
					
					_paymentRepo.Add(payment);
					_paymentRepo.Save();
					
					Order order = _orderRepo.Get(u => u.Id == payment.OrderId);
					order.Status = Order.OrderStatus.Completed;
					_orderRepo.Update(order);
					_orderRepo.Save();

					Table table = _tableRepo.Get(u => u.Id == order.TableId);
					table.Status=Table.TableStatus.Empty;
					_tableRepo.Update(table);
					_tableRepo.Save();
					
					return Ok(new { success = true, message = "Payment created successfully." });
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
		public IActionResult Update([FromBody] Payment payment)
		{
			if (ModelState.IsValid)
			{
				try
				{
					_paymentRepo.Update(payment);
					_paymentRepo.Save();
					return Ok(new { success = true, message = "Payment updated successfully." });
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
				Payment payment = _paymentRepo.Get(u => u.Id == id);
				_paymentRepo.Remove(payment);
				_paymentRepo.Save();
				return Ok(new { success = true, message = "Payment deleted successfully" });
			}
			catch (Exception exception)
			{
				return StatusCode(500, $"Internal server error: {exception.Message}.");
			}

		}

	}
}

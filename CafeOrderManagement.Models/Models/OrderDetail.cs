using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace CafeOrderManagement.Models
{
	public class OrderDetail
	{
		public int Id { get; set; }
		[Required]
		public int Quantity { get; set; }
		[Required]
		public double Price { get; set; }
		[Required]
		public int OrderId { get; set; }
		[ForeignKey(nameof(OrderId))]
		[ValidateNever]
		public Order Order { get; set; }
		[Required]
		public int MenuItemId { get; set; }
		[ForeignKey(nameof(MenuItemId))]
		[ValidateNever]
		public MenuItem MenuItem { get; set; }
	}
}

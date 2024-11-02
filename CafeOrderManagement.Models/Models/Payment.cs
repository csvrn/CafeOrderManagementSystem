using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace CafeOrderManagement.Models
{
	public class Payment
	{
		public int Id { get; set; }
		[Required]
		public double Amount { get; set; }
		[Required]
		public DateTime PaymentDate { get; set; }
		[Required]
		public int OrderId { get; set; }
		[ForeignKey(nameof(OrderId))]
		[ValidateNever]
		public Order Order { get; set; }


	}
}

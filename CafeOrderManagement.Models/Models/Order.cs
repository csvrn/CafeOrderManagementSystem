using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace CafeOrderManagement.Models
{
	public class Order
	{
		public enum OrderStatus
		{
			Pending,
			Completed,
			Rejected
		}

		public int Id { get; set; }
		[Required]
		[JsonConverter(typeof(JsonStringEnumConverter))]

		public OrderStatus Status { get; set; }
		[Required]
		public int TableId { get; set; }
		[ForeignKey(nameof(TableId))]
		[ValidateNever]
		public Table Table { get; set; }
		
	}
}

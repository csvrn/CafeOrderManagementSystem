using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CafeOrderManagement.Models
{
	public class Table
	{
		public enum TableStatus
		{
			Empty,
			Occupied,
			Reserved
		}
		public int Id { get; set; }
		[Required]
		public int Number { get; set; }
		[Required]
		[JsonConverter(typeof(JsonStringEnumConverter))]
		public TableStatus Status { get; set; }
	}
}

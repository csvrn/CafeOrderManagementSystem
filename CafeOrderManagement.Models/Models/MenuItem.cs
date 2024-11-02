using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace CafeOrderManagement.Models
{
	public class MenuItem
	{
		public int Id { get; set; }
		[Required]
		public string Name { get; set; }
		[Required]
		public double Price { get; set; }	
		
		public int? Stock { get; set; }
		[Required]
 		public int CategoryId { get; set; }
		[ForeignKey(nameof(CategoryId))]
		[ValidateNever]
		public Category Category { get; set; }


	}
}

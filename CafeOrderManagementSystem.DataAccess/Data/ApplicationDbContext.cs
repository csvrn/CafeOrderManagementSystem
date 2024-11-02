using CafeOrderManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace CafeOrderManagement.DataAccess.Data
{
	public class ApplicationDbContext : DbContext
	{
		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
		{

		}

		public DbSet<MenuItem> MenuItems { get; set; }
		public DbSet<Category> Categories { get; set; }	
		public DbSet<Order> Orders { get; set; }
		public DbSet<OrderDetail> OrderDetails { get; set; }	
		public DbSet<Payment> Payments { get; set; }	
		public DbSet<Table> Tables { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
			modelBuilder.Entity<Table>().Property(u => u.Status).HasConversion<string>();
			modelBuilder.Entity<Order>().Property(u => u.Status).HasConversion<string>();

		}
	}
}

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
			modelBuilder.Entity<Category>().Property(u => u.Name).HasColumnType("nvarchar(255)");
			modelBuilder.Entity<Category>().HasIndex(u => u.Name).IsUnique();

			modelBuilder.Entity<MenuItem>().Property(u => u.Name).HasColumnType("nvarchar(255)");
			modelBuilder.Entity<MenuItem>().HasIndex(u => u.Name).IsUnique();
			modelBuilder.Entity<MenuItem>().HasIndex(u => u.CategoryId);
			modelBuilder.Entity<MenuItem>().HasIndex(u => new { u.CategoryId, u.Price });

			modelBuilder.Entity<OrderDetail>().HasIndex(u => u.OrderId);
			modelBuilder.Entity<OrderDetail>().HasIndex(u => u.MenuItemId);
			modelBuilder.Entity<OrderDetail>().HasIndex(u => new {u.OrderId,u.MenuItemId});

			modelBuilder.Entity<Order>().HasIndex(u => u.TableId);
			modelBuilder.Entity<Order>().Property(u => u.Status).HasConversion<string>();
			modelBuilder.Entity<Order>().HasIndex(u => u.Status);
			modelBuilder.Entity<Order>().HasIndex(u => new { u.Status, u.TableId });

			modelBuilder.Entity<Payment>().HasIndex(u => u.OrderId).IsUnique();
			modelBuilder.Entity<Payment>().HasIndex(u => u.PaymentDate);

			modelBuilder.Entity<Table>().HasIndex(u => u.Number).IsUnique();
			modelBuilder.Entity<Table>().Property(u => u.Status).HasConversion<string>();
			modelBuilder.Entity<Table>().HasIndex(u => u.Status);
			modelBuilder.Entity<Table>().HasIndex(u => new { u.Number, u.Status });


		
	}
}
}

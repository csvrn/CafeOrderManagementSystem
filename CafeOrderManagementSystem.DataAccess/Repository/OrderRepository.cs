using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CafeOrderManagement.DataAccess.Data;
using CafeOrderManagement.DataAccess.Repository.IRepository;
using CafeOrderManagement.Models;

namespace CafeOrderManagement.DataAccess.Repository
{
	public class OrderRepository : Repository<Order>, IOrderRepository
	{
		private readonly ApplicationDbContext _context;
		public OrderRepository(ApplicationDbContext context) : base(context)
		{
			_context = context;
		}

		public void Update(Order order)
		{
			if (order != null)
			{
				_context.Orders.Update(order);
			}
		}
	}
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CafeOrderManagement.DataAccess.Data;
using CafeOrderManagement.DataAccess.Repository.IRepository;
using CafeOrderManagement.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CafeOrderManagement.DataAccess.Repository
{
	public class OrderDetailRepository : Repository<OrderDetail>, IOrderDetailRepository
	{
		private readonly ApplicationDbContext _context;
		public OrderDetailRepository(ApplicationDbContext context) : base(context)
		{
			_context = context;
		}

		public void Update(OrderDetail orderDetail)
		{
			if (orderDetail != null)
			{
				IEnumerable<OrderDetail> containingDetail = _context.OrderDetails.Where(o => o.Id!=orderDetail.Id && o.Order.Id == orderDetail.OrderId && o.MenuItemId == orderDetail.MenuItemId);
				if (containingDetail.Count() == 1)
				{
					var detail = containingDetail.FirstOrDefault();
					detail.Quantity += orderDetail.Quantity;
					_context.OrderDetails.Update(detail);
					_context.OrderDetails.Remove(orderDetail);
				}
				else
				{
					_context.OrderDetails.Update(orderDetail);
				}
			}
		}

		public IEnumerable<OrderDetail> GetAllNested()
		{
			IQueryable<OrderDetail> orderDetails = _context.OrderDetails.Include(u => u.Order)
				.ThenInclude(v => v.Table)
				.Include(y => y.MenuItem)
				.ThenInclude(z => z.Category);
			return orderDetails.AsEnumerable();
		}

		public OrderDetail GetNested(int id)
		{
			OrderDetail orderDetail = _context.OrderDetails.Where(u => u.Id == id)
				.Include(y => y.MenuItem)
				.ThenInclude(z => z.Category).FirstOrDefault();
			return orderDetail;
		}

		public void Add(OrderDetail orderDetail)
		{
			IEnumerable<OrderDetail> containingDetail = _context.OrderDetails.Where(o => o.Order.Id == orderDetail.OrderId && o.MenuItemId == orderDetail.MenuItemId);
			if (containingDetail.Count() == 1)
			{
				var detail = containingDetail.FirstOrDefault();
				detail.Quantity += orderDetail.Quantity;
				_context.SaveChanges();

			}
			else
			{
				_context.OrderDetails.Add(orderDetail);
			}
		}
	}
}

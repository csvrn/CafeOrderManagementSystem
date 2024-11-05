using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CafeOrderManagement.Models;
using Microsoft.AspNetCore.Mvc;

namespace CafeOrderManagement.DataAccess.Repository.IRepository
{
	public interface IOrderDetailRepository:IRepository<OrderDetail>
	{
		IEnumerable<OrderDetail> GetAllNested();
		OrderDetail GetNested(int id);
		void Update(OrderDetail orderDetail);
		new void Add(OrderDetail orderDetail);
	}
}

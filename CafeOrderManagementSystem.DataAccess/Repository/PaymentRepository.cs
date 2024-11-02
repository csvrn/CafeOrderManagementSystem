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
	public class PaymentRepository : Repository<Payment>, IPaymentRepository
	{
		private readonly ApplicationDbContext _context;
		public PaymentRepository(ApplicationDbContext context) : base(context)
		{
			_context = context;
		}

		public void Update(Payment payment)
		{
			if (payment != null)
			{
				_context.Payments.Update(payment);
			}
		}
	}
}

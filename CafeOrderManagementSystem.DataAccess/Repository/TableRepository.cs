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
	public class TableRepository : Repository<Table>, ITableRepository
	{
		private readonly ApplicationDbContext _context;

		public TableRepository(ApplicationDbContext context) : base(context)
		{
			_context = context;
		}

		public void Update(Table table)
		{
			if (table != null)
			{
				_context.Tables.Update(table);
			}
		}
	}
}

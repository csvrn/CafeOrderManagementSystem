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
	public class MenuItemRepository : Repository<MenuItem>, IMenuItemRepository
	{
		private readonly ApplicationDbContext _context;

		public MenuItemRepository(ApplicationDbContext context) : base(context)
		{
			_context= context;
		}


		public void Update(MenuItem item)
		{
			if (item != null)
			{
				_context.MenuItems.Update(item);
			}
		}
	}
}

﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CafeOrderManagement.Models;

namespace CafeOrderManagement.DataAccess.Repository.IRepository
{
	public interface IMenuItemRepository:IRepository<MenuItem>
	{
		void Update(MenuItem item);
	}
}
USE [CafeOrderManagement]
GO

/****** Object:  Index [IX_OrderDetails_OrderId_MenuItemId]    Script Date: 7.11.2024 01:02:47 ******/
CREATE NONCLUSTERED INDEX [IX_OrderDetails_OrderId_MenuItemId] ON [dbo].[OrderDetails]
(
	[OrderId] ASC,
	[MenuItemId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO


USE [CafeOrderManagement]
GO

/****** Object:  Index [IX_MenuItems_CategoryId_Price]    Script Date: 7.11.2024 00:57:12 ******/
CREATE NONCLUSTERED INDEX [IX_MenuItems_CategoryId_Price] ON [dbo].[MenuItems]
(
	[CategoryId] ASC,
	[Price] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO

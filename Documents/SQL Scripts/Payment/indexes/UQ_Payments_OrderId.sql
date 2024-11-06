USE [CafeOrderManagement]
GO

/****** Object:  Index [UQ_Payments_OrderId]    Script Date: 7.11.2024 01:09:42 ******/
ALTER TABLE [dbo].[Payments] ADD  CONSTRAINT [UQ_Payments_OrderId] UNIQUE NONCLUSTERED 
(
	[OrderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO


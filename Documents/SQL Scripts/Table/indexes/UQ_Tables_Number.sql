USE [CafeOrderManagement]
GO

/****** Object:  Index [UQ_Tables_Number]    Script Date: 7.11.2024 01:13:31 ******/
ALTER TABLE [dbo].[Tables] ADD  CONSTRAINT [UQ_Tables_Number] UNIQUE NONCLUSTERED 
(
	[Number] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO


USE [CafeOrderManagement]
GO

SET ANSI_PADDING ON
GO

/****** Object:  Index [IX_Tables_Number_Status]    Script Date: 7.11.2024 01:12:12 ******/
CREATE NONCLUSTERED INDEX [IX_Tables_Number_Status] ON [dbo].[Tables]
(
	[Number] ASC,
	[Status] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO


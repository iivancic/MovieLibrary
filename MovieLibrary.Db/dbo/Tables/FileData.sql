﻿CREATE TABLE [dbo].[FileData]
(
	[FileDataId] INT IDENTITY(1,1) NOT NULL,
	[Data] VARBINARY(MAX) NOT NULL,
	
	CONSTRAINT [PK_FileData] PRIMARY KEY ([FileDataId])
);
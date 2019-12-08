CREATE TABLE [dbo].[FileInfo]
(
	[FileInfoId] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	[FileDataId] INT NOT NULL,
	[FileName] VARCHAR(30),
	[Extension] VARCHAR(30),
	[Size] INT,
	CONSTRAINT [FK_FileData] FOREIGN KEY ([FileDataId]) REFERENCES [dbo].[FileData] ([FileDataId])

)

CREATE TABLE [dbo].[FileInfo]
(
	[FileInfoId] INT IDENTITY(1,1) NOT NULL,
	[FileDataId] INT NOT NULL,
	[FileName] NVARCHAR(50) NOT NULL,
	[Extension] NVARCHAR(10) NOT NULL,
	[Size] INT NOT NULL,

	CONSTRAINT [PK_FileInfo] PRIMARY KEY ([FileInfoId]),
	CONSTRAINT [FK_FileInfo_FileData] FOREIGN KEY ([FileDataId]) REFERENCES [dbo].[FileData] ([FileDataId])
);

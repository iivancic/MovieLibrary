CREATE TABLE [dbo].[MovieImage]
(
	[MovieId] INT,
	[FileInfoId] INT,
	[ImageTypeId] INT,
	CONSTRAINT [FK_MovieImageMovie] FOREIGN KEY ([MovieId]) REFERENCES [dbo].[Movie] ([MovieId]),
	CONSTRAINT [FK_MovieImageInfo] FOREIGN KEY ([FileInfoId]) REFERENCES [dbo].[FileInfo] ([FileInfoId]),
	CONSTRAINT [FK_MovieImageType] FOREIGN KEY ([ImageTypeId]) REFERENCES [dbo].[ImageDescription] ([ImageTypeId]),
	PRIMARY KEY (MovieId, FileInfoId, ImageTypeId)
)

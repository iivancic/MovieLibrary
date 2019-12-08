CREATE TABLE [dbo].[MovieImage]
(
	[MovieId] INT NOT NULL,
	[FileInfoId] INT NOT NULL,
	[ImageTypeId] INT NOT NULL,

	CONSTRAINT [PK_MovieImage] PRIMARY KEY (MovieId, FileInfoId, ImageTypeId),
	CONSTRAINT [FK_MovieImage_Movie] FOREIGN KEY ([MovieId]) REFERENCES [dbo].[Movie] ([MovieId]) ON DELETE CASCADE,
	CONSTRAINT [FK_MovieImage_FileInfo] FOREIGN KEY ([FileInfoId]) REFERENCES [dbo].[FileInfo] ([FileInfoId]) ON DELETE CASCADE,
	CONSTRAINT [FK_MovieImage_ImageType] FOREIGN KEY ([ImageTypeId]) REFERENCES [dbo].[ImageType] ([ImageTypeId]) ON DELETE CASCADE
);

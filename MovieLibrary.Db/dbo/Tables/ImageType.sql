CREATE TABLE [dbo].[ImageType]
(
	[ImageTypeId] INT IDENTITY(1,1) NOT NULL,
	[TypeName] NVARCHAR(50) NOT NULL,

	CONSTRAINT [PK_ImageType] PRIMARY KEY ([ImageTypeId]),
	CONSTRAINT [UQ_ImageType_TypeName] UNIQUE ([TypeName])
);

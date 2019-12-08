CREATE TABLE [dbo].[Genres] (
    [GenreId]   INT          IDENTITY (1, 1) NOT NULL,
    [GenreName] VARCHAR (50) NULL,
    CONSTRAINT [PK__Genres__3214EC07B0C48D5B] PRIMARY KEY CLUSTERED ([GenreId] ASC)
);


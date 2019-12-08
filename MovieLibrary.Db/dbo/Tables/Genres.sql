CREATE TABLE [dbo].[Genres] (
    [GenreId]   INT IDENTITY (1, 1) NOT NULL,
    [GenreName] NVARCHAR (50) NOT NULL,

    CONSTRAINT [PK_Genres] PRIMARY KEY ([GenreId]),
    CONSTRAINT [UQ_Genre_GenreName] UNIQUE ([GenreName])
);

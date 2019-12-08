CREATE TABLE [dbo].[MovieGenre] (
    [MovieId] INT NOT NULL,
    [GenreId] INT NOT NULL,

    CONSTRAINT [PK_MovieGenre] PRIMARY KEY ([MovieId], [GenreId]),
    CONSTRAINT [FK_MovieGenre_Movie] FOREIGN KEY ([MovieId]) REFERENCES [dbo].[Movie] ([MovieId]) ON DELETE CASCADE,
    CONSTRAINT [FK_MovieGenre_Genre] FOREIGN KEY ([GenreId]) REFERENCES [dbo].[Genres] ([GenreId]) ON DELETE CASCADE
);

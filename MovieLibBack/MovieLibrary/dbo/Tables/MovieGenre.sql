CREATE TABLE [dbo].[MovieGenre] (
    [MovieId]    INT NOT NULL,
    [GenreId]    INT NOT NULL,
    CONSTRAINT [PK__MovieGenre] PRIMARY KEY CLUSTERED ([MovieId] ASC, [GenreId] ASC),
    CONSTRAINT [FK__MovieGenre__Movie] FOREIGN KEY ([MovieId]) REFERENCES [dbo].[Movie] ([MovieId]) ON DELETE CASCADE,
    CONSTRAINT [FK__MovieGenre__Genre] FOREIGN KEY ([GenreId]) REFERENCES [dbo].[Genres] ([GenreId]) ON DELETE CASCADE
);


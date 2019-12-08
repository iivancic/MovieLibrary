DECLARE @TempData TABLE (
    [Id] INT NOT NULL,
    [Name] INT NOT NULL
);

INSERT INTO @TempData ([Id], [Name])
VALUES  (1, 'Action'),
        (2, 'Romance'),
        (3, 'Thriller');

SET IDENTITY_INSERT [Genres] OFF;

INSERT INTO [Genres] (
    [GenreId],
    [GenreName]
)
SELECT *
FROM @TempData td
     LEFT JOIN [Genres] g ON td.[Name] = g.[GenreName]
WHERE g.[GenreId] IS NULL

SET IDENTITY_INSERT [Genres] ON;
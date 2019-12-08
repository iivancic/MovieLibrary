DECLARE @TempData TABLE (
    [Id] INT NOT NULL,
    [Name] NVARCHAR(50) NOT NULL
);

INSERT INTO @TempData ([Id], [Name])
VALUES  (1, 'Action'),
        (2, 'Romance'),
        (3, 'Thriller');

SET IDENTITY_INSERT [Genres] ON;

INSERT INTO [Genres] (
    [GenreId],
    [GenreName]
)
SELECT [GenreId] = td.[Id],
       [GenreName] = td.[Name]
FROM @TempData td
     LEFT JOIN [Genres] g ON td.[Id] = g.[GenreId] AND 
                             td.[Name] = g.[GenreName]
WHERE g.[GenreId] IS NULL

SET IDENTITY_INSERT [Genres] OFF;
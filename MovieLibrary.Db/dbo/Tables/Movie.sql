CREATE TABLE [dbo].[Movie] (
    [MovieId] INT IDENTITY (1, 1) NOT NULL,
    [MovieName] NVARCHAR (50) NOT NULL,
    [MovieLength] INT NOT NULL,
    [Language] NVARCHAR (20) NULL,
    [Year] INT NULL,
    [ShortDescription] NVARCHAR (1000) NULL,
    [LongDescription] NVARCHAR (MAX)  NULL,
    [Trivia] NVARCHAR (MAX)  NULL,

    CONSTRAINT [PK_MainInfo] PRIMARY KEY ([MovieId])
);

CREATE TABLE [dbo].[Movie] (
    [MovieId]     INT          IDENTITY (1, 1) NOT NULL,
    [MovieName]   VARCHAR (50) NULL,
    [MovieLength] INT          NULL,
    [Language]    VARCHAR (20) NULL,
    [Year]        INT          NULL,
    CONSTRAINT [PK__MainInfo__3214EC07D0828E71] PRIMARY KEY CLUSTERED ([MovieId] ASC)
);


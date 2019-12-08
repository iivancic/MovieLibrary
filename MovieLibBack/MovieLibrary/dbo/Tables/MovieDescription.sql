CREATE TABLE [dbo].[MovieDescription] (
    [DescriptionId]    INT            IDENTITY (1, 1) NOT NULL,
    [ShortDescription] VARCHAR (1000) NULL,
    [LongDescription]  VARCHAR (MAX)  NULL,
    [Trivia]           VARCHAR (MAX)  NULL,
    CONSTRAINT [PK__MovieDes__A58A9F8B74DBA03C] PRIMARY KEY CLUSTERED ([DescriptionId] ASC)
);


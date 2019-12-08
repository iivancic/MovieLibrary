CREATE TABLE [MainInfo] (
	[Id] INT NOT NULL,
	[Name] VARCHAR(50),
	[Length] INT,
	[Language] VARCHAR(20),
	PRIMARY KEY ([Id])
	);

INSERT INTO MainInfo ([Name], [Length], [Language])
VALUES ('Die Hard', 132, 'EN')

INSERT INTO MainInfo ([Name], [Length], [Language])
VALUES ('Indiana Jones and the Last Crusade', 127, 'EN')

ALTER TABLE [MainInfo]
ADD [Year] INT

SELECT * FROM MainMovieInfo

UPDATE MainInfo
SET MainInfo.Year= 1989
WHERE MainInfo.Id=2


CREATE TABLE [Genres] (
	[Id] INT NOT NULL,
	[Name] VARCHAR(50),
	[MovieId] INT NOT NULL
	PRIMARY KEY ([Id])
	FOREIGN KEY (MovieID) REFERENCES MainInfo(Id)
	);

ALTER TABLE Genres DROP COLUMN MovieId

SELECT * FROM Genres

INSERT INTO Genres([Name])
VALUES 
('Action' ),
('Thriller'),
('Adventure')

CREATE TABLE MovieGenreRelation(
	MovieId INT NOT NULL,
	GenreId	INT NOT NULL
	FOREIGN KEY (MovieId) REFERENCES MainInfo(Id), 
    FOREIGN KEY (GenreId) REFERENCES Genres(Id)
)

INSERT INTO MovieGenreRelation ([MovieId], [GenreId])
VALUES 
(1,1),
(1,2),
(2,1),
(2,3)

SELECT [MovieName], [GenreName] 
FROM  MainMovieInfo as M
INNER JOIN MovieGenreRelation as R
	ON M.MovieId = R.MovieId
INNER JOIN Genres as G
	on G.GenreId = R.GenreId

SELECT * FROM MovieGenreRelation

ALTER TABLE MovieGenreRelation ADD  RelationId INT

SELECT * FROM MovieGenreRelation

DROP TABLE MovieGenreRelation

CREATE TABLE MovieGenreRelation(
	RelationId INT NOT NULL, 
	MovieId INT NOT NULL,
	GenreId	INT NOT NULL
	FOREIGN KEY (MovieId) REFERENCES MainMovieInfo(MovieId), 
    FOREIGN KEY (GenreId) REFERENCES Genres(GenreId),
	PRIMARY KEY ([RelationId])
)

CREATE TABLE [MovieDescription]	(
	[DescriptionId] INT NOT NULL, 
	[ShortDescription] VARCHAR(1000),
	[LongDescription]	VARCHAR(MAX),
	[Trivia]	VARCHAR(MAX)
	PRIMARY KEY ([DescriptionId])
)

INSERT INTO [MovieDescription] ([ShortDescription],[LongDescription],[Trivia])
VALUES ('An NYPD officer tries to save his wife and several others
		 taken hostage by German terrorists during a Christmas
		  party at the Nakatomi Plaza in Los Angeles.',
		'On Christmas Eve, NYPD detective John McClane arrives in Los Angeles, 
		intending to reconcile with his estranged wife, Holly, at the Christmas party of her employer, 
		the Nakatomi Corporation. McClane is driven to the party by Argyle, an airport limousine driver. 
		While McClane changes clothes, the party is disrupted by the arrival of a German terrorist, Hans Gruber, 
		and his heavily armed team: computer hacker Theo, Karl and Tony Vreski, Franco, Alexander, Marco, Kristoff, 
		Eddie, Uli, Heinrich, Fritz, and James. The group seizes the tower and secures those inside as hostages
		 except for McClane, who slips away, and Argyle, who gets stranded in the garage.Made for $28 million,
		  Die Hard grossed over $141 million theatrically worldwide. Turning Willis into an action star, 
		  the film became a metonym for an action film in which a lone hero fights overwhelming odds.
		  The films success created the Die Hard franchise, which includes four sequels, 
		  a number of video games, and a comic book. In 2017, it was selected for preservation 
		  in the United States National Film Registry. Die Hard has been named one of the best 
		  action and Christmas-themed films ever made.[3][4][5] The film also ranks No. 20 on 
		  Empires 2017 list of the 100 greatest movies of all time.[6] ',
		  'Bruce Willis received a then-unheard of $5 million fee, which was approved by Fox President Rupert Murdoch. The fictional Nakatomi Plaza is the headquarters of 20th Century Fox. 
		  The company charged itself rent for the use of the then-unfinished building.'

)

SELECT * FROM MovieDescription

CREATE TABLE [MovieImages]	(
	[ImageId] INT NOT NULL, 
	[ImageName] VARCHAR(50),
	[Image] VARBINARY(MAX)
	PRIMARY KEY ([ImageId])
)


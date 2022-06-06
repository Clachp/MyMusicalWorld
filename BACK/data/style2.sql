CREATE VIEW userWithArtistsId AS 
SELECT "USER".pseudo, USER_LIKES_ARTIST.api_id AS artist_id
FROM "USER"
JOIN USER_LIKES_ARTIST ON "USER".id=USER_LIKES_ARTIST.user_id;


CREATE VIEW userWithAlbumsId AS 
SELECT "USER".pseudo, USER_LIKES_ALBUM.api_id AS album_id
FROM "USER"
JOIN USER_LIKES_ALBUM ON "USER".id=USER_LIKES_ALBUM.user_id;

CREATE VIEW userWithTracksId AS 
SELECT "USER".pseudo, USER_LIKES_TRACK.api_id AS track_id
FROM "USER"
JOIN USER_LIKES_TRACK ON "USER".id=USER_LIKES_TRACK.user_id;

CREATE VIEW userWithTracksAndAlbumAndArtists AS 
SELECT "USER".*, userWithTracksId AS tracks,
userWithAlbumsId AS albums,
userWithArtistsId AS artists
FROM "USER"
FULL JOIN userWithTracksId ON "USER".pseudo=userWithTracksId.pseudo
FULL JOIN userWithAlbumsId ON "USER".pseudo=userWithAlbumsId.pseudo
FULL JOIN userWithArtistsId ON "USER".pseudo=userWithArtistsId.pseudo;



CREATE VIEW userTracksAlbumsArtists AS
SELECT id, pseudo,
ARRAY_AGG (tracks) AS tracks,
ARRAY_AGG (artists) AS artists,
ARRAY_AGG (albums) AS albums
FROM userWithTracksAndAlbumAndArtists
GROUP BY id, pseudo
;


SELECT * FROM userWithArtistsId;
SELECT * FROM userWithAlbumsId;
SELECT * FROM userWithTracksId;
SELECT * FROM userWithTracksAndAlbumAndArtists;
SELECT * FROM userTracksAlbumsArtists;




DROP VIEW userTracksAlbumsArtists;
DROP VIEW userWithTracksAndAlbumAndArtists;
DROP VIEW userWithArtistsId;
DROP VIEW userWithAlbumsId;
DROP VIEW userWithTracksId;





-- pour la suite prendre exemple sur orangeraie-jointures, dans docs, le fichier requetes.sql
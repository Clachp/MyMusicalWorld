-- A retirer avant de merger sur master ---

CREATE VIEW albumWithUserId AS 
SELECT pseudo,
ARRAY_AGG (ALBUM) AS albums
FROM "USER"
LEFT JOIN USER_LIKES_ALBUM ON "USER".id=USER_LIKES_ALBUM.user_id
LEFT JOIN ALBUM ON USER_LIKES_ALBUM.api_id=ALBUM.api_id
GROUP BY pseudo
;

CREATE VIEW trackWithUserId AS 
SELECT pseudo,
ARRAY_AGG (TRACK) AS tracks
FROM "USER"
LEFT JOIN USER_LIKES_TRACK ON "USER".id=USER_LIKES_TRACK.user_id
LEFT JOIN TRACK ON USER_LIKES_TRACK.api_id=TRACK.api_id
GROUP BY pseudo
;

CREATE VIEW artistWithUserId AS 
SELECT pseudo,
ARRAY_AGG (ARTIST) AS artists
FROM "USER"
LEFT JOIN USER_LIKES_ARTIST ON "USER".id=USER_LIKES_ARTIST.user_id
LEFT JOIN ARTIST ON USER_LIKES_ARTIST.api_id=ARTIST.api_id
GROUP BY pseudo
;

CREATE VIEW userWithTracksAndAlbumAndArtists AS
SELECT artistWithUserId.pseudo AS pseudo, artistWithUserId.artists AS artists, trackWithUserId.tracks AS tracks, albumWithUserId.albums AS albums
FROM artistWithUserId
JOIN trackWithUserId ON artistWithUserId.pseudo=trackWithUserId.pseudo
JOIN albumWithUserId ON artistWithUserId.pseudo=albumWithUserId.pseudo
;


SELECT * FROM albumWithUserId;
SELECT * FROM trackWithUserId;
SELECT * FROM artistWithUserId;
SELECT * FROM userWithTracksAndAlbumAndArtists WHERE pseudo='claire';


DROP VIEW userWithTracksAndAlbumAndArtists;
DROP VIEW albumWithUserId;
DROP VIEW trackWithUserId;
DROP VIEW artistWithUserId;
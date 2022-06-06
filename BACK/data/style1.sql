-- on créée 3 vues avec des aggregate qu'on appelle dans la fonction get


CREATE VIEW albumWithUserId AS 
SELECT ARRAY_AGG(ALBUM) AS albums, "USER".pseudo AS user_pseudo
FROM ALBUM
JOIN USER_LIKES_ALBUM ON ALBUM.api_id=USER_LIKES_ALBUM.api_id
JOIN "USER" ON "USER".id=USER_LIKES_ALBUM.user_id
GROUP BY user_pseudo
;

SELECT * FROM ALBUM;

CREATE VIEW trackWithUserId AS 
SELECT ARRAY_AGG(TRACK) AS tracks, "USER".pseudo AS user_pseudo
FROM TRACK
JOIN USER_LIKES_TRACK ON TRACK.api_id=USER_LIKES_TRACK.api_id
JOIN "USER" ON "USER".id=USER_LIKES_TRACK.user_id
GROUP BY user_pseudo
;

CREATE VIEW artistWithUserId AS 
SELECT ARRAY_AGG(ARTIST) AS artists, "USER".pseudo AS user_pseudo
FROM ARTIST
JOIN USER_LIKES_ARTIST ON ARTIST.api_id=USER_LIKES_ARTIST.api_id
JOIN "USER" ON "USER".id=USER_LIKES_ARTIST.user_id
GROUP BY user_pseudo
;

CREATE VIEW userWithTracksAndAlbumAndArtists AS 
SELECT "USER".pseudo AS pseudo, trackWithUserId.tracks AS tracks,
albumWithUserId.albums AS albums,
artistWithUserId.artists AS artists
FROM "USER"
JOIN trackWithUserId ON "USER".pseudo=trackWithUserId.user_pseudo
JOIN albumWithUserId ON "USER".pseudo=albumWithUserId.user_pseudo
JOIN artistWithUserId ON "USER".pseudo=artistWithUserId.user_pseudo
GROUP BY "USER".pseudo
;




SELECT * FROM albumWithUserId;
SELECT * FROM artistWithUserId;
SELECT * FROM trackWithUserId;
SELECT * FROM userWithTracksAndAlbumAndArtists;

SELECT * FROM TRACK;



DROP VIEW userWithTracksAndAlbumAndArtists;
DROP VIEW artistWithUserId;
DROP VIEW trackWithUserId CASCADE;
DROP VIEW albumWithUserId CASCADE;

SELECT id,
ARRAY_AGG(artists) AS artists
FROM userWithArtistsId
GROUP BY id;






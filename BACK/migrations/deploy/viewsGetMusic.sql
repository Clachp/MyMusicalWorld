-- Deploy MyMusicalWorld:viewsGetMusic to pg

BEGIN;

CREATE VIEW user_albums AS 
SELECT pseudo,
ARRAY_TO_JSON(ARRAY_AGG (ALBUM)) AS albums
FROM "USER"
LEFT JOIN USER_LIKES_ALBUM ON "USER".id=USER_LIKES_ALBUM.user_id
LEFT JOIN ALBUM ON USER_LIKES_ALBUM.api_id=ALBUM.api_id
GROUP BY pseudo
;

CREATE VIEW user_tracks AS 
SELECT pseudo,
ARRAY_TO_JSON(ARRAY_AGG (TRACK)) AS tracks
FROM "USER"
LEFT JOIN USER_LIKES_TRACK ON "USER".id=USER_LIKES_TRACK.user_id
LEFT JOIN TRACK ON USER_LIKES_TRACK.api_id=TRACK.api_id
GROUP BY pseudo
;

CREATE VIEW user_artists AS 
SELECT pseudo,
ARRAY_TO_JSON(ARRAY_AGG(ARTIST)) AS artists
FROM "USER"
LEFT JOIN USER_LIKES_ARTIST ON "USER".id=USER_LIKES_ARTIST.user_id
LEFT JOIN ARTIST ON USER_LIKES_ARTIST.api_id=ARTIST.api_id
GROUP BY pseudo
;

CREATE VIEW user_music AS
SELECT user_artists.pseudo AS pseudo, user_artists.artists AS artists, user_tracks.tracks AS tracks, user_albums.albums AS albums
FROM user_artists
JOIN user_tracks ON user_artists.pseudo=user_tracks.pseudo
JOIN user_albums ON user_artists.pseudo=user_albums.pseudo
;

COMMIT;

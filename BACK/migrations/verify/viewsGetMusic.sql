-- Verify MyMusicalWorld:viewsGetMusic on pg

BEGIN;

SELECT * FROM user_music WHERE FALSE; 
SELECT * FROM user_albums WHERE FALSE; 
SELECT * FROM user_artists WHERE FALSE; 
SELECT * FROM user_tracks WHERE FALSE; 

ROLLBACK;

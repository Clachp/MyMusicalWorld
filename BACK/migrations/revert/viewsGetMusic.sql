-- Revert MyMusicalWorld:viewsGetMusic from pg

BEGIN;


DROP VIEW user_music;
DROP VIEW user_albums;
DROP VIEW user_tracks;
DROP VIEW user_artists;

COMMIT;

-- Revert MyMusicalWorld:functions from pg

BEGIN;

DROP FUNCTION add_user(json) CASCADE;

DROP FUNCTION update_user(json) CASCADE;

COMMIT;

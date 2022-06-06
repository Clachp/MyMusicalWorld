-- Deploy MyMusicalWorld:functions to pg

BEGIN;

CREATE FUNCTION add_user(json) RETURNS "USER" AS $$
INSERT INTO "USER" (mail, lastname, firstname, pseudo, "password")
VALUES ($1 ->> 'mail', 
		$1 ->> 'lastanme', 
		$1 ->> 'firstanme', 
		$1 ->> 'pseudo', 
		$1 ->> 'password'
) RETURNING *;
$$ LANGUAGE SQL STRICT; 


CREATE FUNCTION update_user(myJsonData json) RETURNS "USER" AS $$
	UPDATE "USER" SET
		mail=myJsonData->>'mail',
		lastname=myJsonData->>'lastname',
		firstname=myJsonData->>'firstname',
		pseudo=myJsonData->>'pseudo',
		password= COALESCE (myJsonData->>'password', password)	
	WHERE id=(myJsonData->>'id')::int
	RETURNING *;
$$ LANGUAGE SQL STRICT;
COMMIT;

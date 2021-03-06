-- Deploy MMWO:init to pg

BEGIN;


CREATE TABLE "USER" (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  mail TEXT NOT NULL UNIQUE,
  lastname TEXT NOT NULL,
  firstname TEXT NOT NULL,
  pseudo  TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL UNIQUE
);



CREATE TABLE ALBUM (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  genre TEXT,
  artist TEXT NOT NULL,
  "year" INT,
  url_image TEXT,
  api_id INT NOT NULL UNIQUE
);



CREATE TABLE ARTIST (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  url_image TEXT,
  api_id INT NOT NULL UNIQUE
);

CREATE TABLE TRACK (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  genre TEXT,
  artist TEXT NOT NULL,
  "year" INT,
  album TEXT NOT NULL,
  url_image TEXT,
  api_id INT NOT NULL UNIQUE,
  url_sample TEXT
  
);

CREATE TABLE USER_LIKES_ALBUM (
  album_id INT NOT NULL REFERENCES ALBUM(id),
  user_id INT NOT NULL REFERENCES "USER"(id)
);

CREATE TABLE USER_LIKES_TRACK (
  track_id INT NOT NULL REFERENCES TRACK(id),
  user_id INT NOT NULL REFERENCES "USER"(id)
);

CREATE TABLE USER_LIKES_ARTIST (
  artist_id INT NOT NULL REFERENCES ARTIST(id),
  user_id INT NOT NULL REFERENCES "USER"(id)
);


COMMIT;

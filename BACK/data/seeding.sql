SELECT * FROM ARTIST;

SELECT * FROM ALBUM;

SELECT * FROM TRACK;

SELECT * FROM "USER";

INSERT INTO "USER"(mail, lastname, firstname, pseudo, 'password') VALUES
('Monroe.Kshlerin14@gmail.com','Wehrsen', 'Salome','Ephraim18','5NPET4JC3AKCEHCA2'),
('Lamar_Kuphal@gmail.com','Hache','Loris','Alex_Treutel','1FDFS24LXXCGK0D4M'), 
('Green_Howe@yahoo.com','Steinert','Arvid','Antonietta.Schuster88','3G5DB03E55B5UEEX3'),
('Emmitt.Marvin19@gmail.com','Schirmer','Alisha','Melissa0','5XYKT3A18B0X1DTGN');

INSERT INTO ALBUM (name, genre, artist, year, url_image, api_id) VALUES
('abbey road', 'rock', 'beatles', 1969, 'balbal', 1),
('sticky fingers', 'rock', 'rolling stones',  1971, 'balbal', 2),
('animals', 'rock', 'pink floyd', 1977, 'balbal', 3),
('Goodbye yellow brick road', 'rock', 'elton john', 1973, 'balbal', 4),
('rocks', 'rock', 'aerosmith', 1976, 'balbal', 5),
('jazz', 'rock', 'queen', 1978, 'balbal', 6);

INSERT INTO ARTIST (name, url_image, api_id) VALUES
('beatles', 'balbal', 7),
('rolling stones', 'balbal', 8),
('pink floyd','balbal', 9),
('elton john', 'balbal', 10),
('aerosmith', 'balbal', 11),
('queen', 'balbal', 12);

INSERT INTO TRACK (name, genre, artist, year, album, url_image, api_id) VALUES
('Octopus s Garden', 'rock', 'beatles', 1969, 'abbey road','balbal', 13),
('sister morphine', 'rock', 'rolling stones',  1971,'sticky fingers', 'balbal', 14),
('pigs on the wing', 'rock', 'pink floyd', 1977,'animals', 'balbal', 15),
('candle in the wind', 'rock', 'elton john', 1973,'Goodbye yellow brick road', 'balbal', 16),
('back in the saddle', 'rock', 'aerosmith', 1976,'rocks', 'balbal', 17),
('fat bootomed girls','rock', 'queen', 1978,'jazz',  'balbal', 18),
('one','metal','metallica', 1988,'and justice for all','dsfSDF',19),
('these arms of mine','soul','otis redding', 1969,'single','sdfqf',20 ),
('here i go again','metal','whitesnake', 1987,'whitesnake','qSFG', 21),
('let it bleed','rock','rolling stones', 1969,'let it bleed','SDGFZRG', 22),
('break on through','rock','the doors', 1967,'the doors','sqfdzg', 23);

INSERT INTO USER_LIKES_ARTIST (api_id, user_id) VALUES
(7, 1),
(8, 3),
(8, 3),
(9, 4),
(10, 2),
(10, 1),
(12, 2),
(11, 1);

INSERT INTO USER_LIKES_ALBUM (api_id, user_id) VALUES
(1, 1),
(1, 3),
(3, 3),
(3, 4),
(6, 2),
(2, 1),
(2, 2),
(4, 1);

INSERT INTO USER_LIKES_TRACK (api_id, user_id) VALUES
(13,1),
(13, 2),
(14, 2),
(15, 3),
(15, 3),
(16, 4),
(16, 4),
(16, 1),
(334, 2),
(18, 2),
(18, 3),
(18, 1),
(19, 4),
(20, 5),
(23334, 5);

TRUNCATE TABLE USER_LIKES_ARTIST;
TRUNCATE TABLE USER_LIKES_ALBUM;
TRUNCATE TABLE USER_LIKES_TRACK;

TRUNCATE TABLE ALBUM;
TRUNCATE TABLE TRACK;
TRUNCATE TABLE ARTIST;
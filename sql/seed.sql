BEGIN;

INSERT INTO organization (name)
VALUES ('R88'),
       ('Mothman Inc.'),
       ('Loch Ness LLC');

INSERT INTO user_ (email, role, password, pilot_license, organization_id)
VALUES
  ('admin@example.com', 'ADMIN',
   '$argon2id$v=19$m=65536,t=3,p=4$J/QUa5xHKtMf75GXZrl76Q$RiXbKNwiwiakPO0VvVRIXv1KVtqmgh//aT0gMvTtszw',
    'xxx1', 1),
  ('test@example.com', 'USER',
    '$argon2id$v=19$m=65536,t=3,p=4$9eCDarw+9/Mbi01unk2D+Q$bMjA0nGFKA0xA7xmX6/9FrfTRZmJYiiuJm8GO+72pB0',
    'xxx2', 1),
  ('second@example.com',   '1234', 'xxx3', 1, 'USER'),
  ('mothman@example.com',  '1234', 'xxx4', 2, 'USER'),
  ('nessie@example.com',   '1234', 'xxx5', 3, 'USER');


INSERT INTO decco (name, password, is_virtual, callsign, organization_id)
VALUES
       ('rosy-maple',           '1234', true, 'abcd1',  1),
       ('feathered-gothic',     '1234', true, 'abcd4',  2),
       ('chimney-sweeper',      '1234', true, 'abcd5',  3);

INSERT INTO burn_unit (name, created_by_id, organization_id)
VALUES
  ('first burn',  1, 1),
  ('second burn', 1, 1),
  ('third burn',  2, 1);

INSERT INTO survey (type, burn_unit_id)
VALUES
  ('PRE', 1),
  ('PRE', 1),
  ('PERI', 1),
  ('POST', 1),
  ('PRE', 2);

INSERT INTO flight (decco_id, pilot_id, survey_id)
VALUES
  (1, 1, 1),
  (1, 1, 1),
  (1, 1, 1),
  (1, 1, 2);


COMMIT;

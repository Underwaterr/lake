BEGIN;

INSERT INTO organization (name)
VALUES ('R88'),
       ('Mothman Inc.'),
       ('Loch Ness LLC');

INSERT INTO person (email, password, pilot_license, organization_id)
VALUES ('admin@example.com',    '1234', 'A234512345', 1),
       ('example@example.com',  '1234', 'B234512345', 1),
       ('mothman@example.com',  '1234', 'XXX',        2),
       ('nessie@example.com',   '1234', 'ZZZ',        3);

INSERT INTO decco (name, password, is_virtual, remote_id, organization_id)
VALUES
  ('rosy-maple',       '1234', true, 'x', 1),
  ('old-lady',         '1234', true, 'y', 1),
  ('small-emerald',    '1234', true, 'z', 1),
  ('feathered-gothic', '1234', true, 'a', 2),
  ('chimney-sweeper',  '1234', true, 'b', 3);


COMMIT;

BEGIN;

INSERT INTO organization (name)
VALUES ('R88'),
       ('Mothman Inc.'),
       ('Loch Ness LLC');

INSERT INTO human (pilot_license)
VALUES ('ABC123'),
       ('XYZ321'),
       ('XXX666'),
       ('42069Z'),
       ('BLORPP');

INSERT INTO decco (is_virtual, callsign)
VALUES
  (true, 'xxxx1'),
  (true, 'xxxx2'),
  (true, 'xxxx3'),
  (true, 'xxxx4'),
  (true, 'xxxx5');


INSERT INTO account (username, password, account_type, human_id, decco_id, organization_id)
VALUES ('admin@example.com',    '1234', 'HUMAN', 1,     null, 1),
       ('example@example.com',  '1234', 'HUMAN', 2,     null, 1),
       ('example@example.com',  '1234', 'HUMAN', 3,     null, 1),
       ('rosy-maple',           '1234', 'DECCO', null,  1,    1),
       ('feathered-gothic',     '1234', 'DECCO', null,  2,    1),
       ('feathered-gothic',     '1234', 'DECCO', null,  3,    1),
       ('mothman@example.com',  '1234', 'HUMAN', 4,     null, 2),
       ('feathered-gothic',     '1234', 'DECCO', null,  4,    2),
       ('nessie@example.com',   '1234', 'HUMAN', 5,     null, 3),
       ('chimney-sweeper',      '1234', 'DECCO', null,  5,    3);


COMMIT;

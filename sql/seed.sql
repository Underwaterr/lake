BEGIN;

INSERT INTO "Organization" (name)
VALUES ('R88');

INSERT INTO "User" (email, name, role, "pilotLicense", "organizationId") VALUES
('admin@example.com', 'Tyler Lane',  'ADMIN', 'admin000', 1),
('test@example.com',  'Alex McAlex', 'USER',  'test999',  1);

INSERT INTO "UserAuthentication" ("userId", password) VALUES
(1, '$argon2id$v=19$m=65536,t=3,p=4$J/QUa5xHKtMf75GXZrl76Q$RiXbKNwiwiakPO0VvVRIXv1KVtqmgh//aT0gMvTtszw'),
(2, '$argon2id$v=19$m=65536,t=3,p=4$J/QUa5xHKtMf75GXZrl76Q$RiXbKNwiwiakPO0VvVRIXv1KVtqmgh//aT0gMvTtszw');

INSERT INTO "Decco" (name, "isVirtual", callsign, "organizationId") VALUES
('rosy-maple', true, '#6FD6FF', 1);

INSERT INTO "DeccoAuthentication" ("deccoId", password) VALUES
(1, '$argon2id$v=19$m=65536,t=3,p=4$w8UGwlBJcvyoOtLmh4eEeQ$pUDLDkGqXiG1PSfY4gGdk5BKMfhkTcO4YTZ32bhihYE');


-- Need: burn unit, survey, flight
INSERT INTO "BurnUnit" (name, "organizationId", "createdById", polygon, subpolygons)
VALUES
  ('first burn', 1, 1,
    ST_GeomFromGeoJSON('{
      "type":"Polygon",
      "coordinates": [[
        [ -71.110369302750115, 47.798430466372736 ],
        [ -70.902563128560018, 47.983211774835986 ],
        [ -70.699274479895777, 47.789325849015306 ],
        [ -71.110369302750115, 47.798430466372736 ]
      ]]
    }'),
    ST_GeomFromGeoJSON('{
      "type":"Polygon",
      "coordinates": [
        [ [0, 0], [3, 3], [3, 0], [0, 0] ],
        [ [4, 4], [14, 14], [14, 4], [4, 4] ]
      ]
    }')
  );

INSERT INTO "Survey" (type, "burnUnitId")
VALUES ('PRE', 1), ('PERI', 1), ('POST', 1);

INSERT INTO "Flight" ("deccoId", "pilotId", "surveyId")
VALUES (1, 1, 1), (1, 1, 2), (1, 1, 3);

-- todo:
--INSERT INTO "ElevationModel" ("boundingBox")
--VALUES (ST_MakeEnvelope(-75.20673660397696, 39.94400676583064, -75.19913627239221, 39.949583428148095, 4326))

COMMIT;

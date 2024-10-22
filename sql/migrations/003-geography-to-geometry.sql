BEGIN;

ALTER TABLE "Flight"
ALTER COLUMN "path"
TYPE geometry(LineStringM)
USING path::geometry(LineStringM);

ALTER TABLE "Flight"
ALTER COLUMN "subpolygon"
TYPE geometry(polygon)
USING subpolygon::geometry(Polygon);

ALTER TABLE "BurnUnit"
ALTER COLUMN "polygon"
TYPE geometry(polygon)
USING polygon::geometry(Polygon);

ALTER TABLE "BurnUnit"
ALTER COLUMN "subpolygons"
TYPE geometry(polygon)
USING subpolygons::geometry(Polygon);

ALTER TABLE "FlightEvent"
ALTER COLUMN "location"
TYPE geometry(point)
USING location::geometry(Point);

INSERT INTO "Migration" (description)
VALUES ('Change `geography` column types to `geometry`');

COMMIT;

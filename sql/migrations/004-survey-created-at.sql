
BEGIN;

ALTER TABLE "Survey"
ADD COLUMN "createdAt" timestamp with time zone default current_timestamp;

INSERT INTO "Migration" (description)
VALUES ('Add `createdAt` column to `Survey` table');

COMMIT;

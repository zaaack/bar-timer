-- CreateTable
CREATE TABLE "Alarm" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "ahead" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "notify" BOOLEAN NOT NULL DEFAULT true,
    "alert" BOOLEAN NOT NULL DEFAULT false,
    "duration" INTEGER NOT NULL DEFAULT 0,
    "timeout" INTEGER NOT NULL DEFAULT 0,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "sort" INTEGER NOT NULL DEFAULT 0,
    "uid" TEXT NOT NULL DEFAULT ''
);

-- CreateIndex
CREATE INDEX "Alarm.sort_index" ON "Alarm"("sort");

-- CreateIndex
CREATE INDEX "Alarm.uid_index" ON "Alarm"("uid");

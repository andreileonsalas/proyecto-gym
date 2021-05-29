-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Room" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "maxCapacity" INTEGER NOT NULL,
    "maxCapacityAllowed" REAL NOT NULL,
    "adminId" INTEGER NOT NULL,
    FOREIGN KEY ("adminId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Room" ("id", "createdAt", "updatedAt", "name", "maxCapacity", "maxCapacityAllowed", "adminId") SELECT "id", "createdAt", "updatedAt", "name", "maxCapacity", "maxCapacityAllowed", "adminId" FROM "Room";
DROP TABLE "Room";
ALTER TABLE "new_Room" RENAME TO "Room";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT,
    "role" TEXT NOT NULL DEFAULT 'CLIENT'
);
INSERT INTO "new_User" ("id", "createdAt", "updatedAt", "name", "email", "hashedPassword", "role") SELECT "id", "createdAt", "updatedAt", "name", "email", "hashedPassword", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

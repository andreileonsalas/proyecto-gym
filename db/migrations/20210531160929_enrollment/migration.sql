-- CreateTable
CREATE TABLE "Enrollment" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_card" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "defaulter" BOOLEAN NOT NULL DEFAULT false,
    "diseases" TEXT NOT NULL,
    "medications" TEXT NOT NULL,
    "contacts" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

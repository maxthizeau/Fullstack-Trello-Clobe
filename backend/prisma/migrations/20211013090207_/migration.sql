/*
  Warnings:

  - You are about to drop the `_admins` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_members` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_admins" DROP CONSTRAINT "_admins_A_fkey";

-- DropForeignKey
ALTER TABLE "_admins" DROP CONSTRAINT "_admins_B_fkey";

-- DropForeignKey
ALTER TABLE "_members" DROP CONSTRAINT "_members_A_fkey";

-- DropForeignKey
ALTER TABLE "_members" DROP CONSTRAINT "_members_B_fkey";

-- DropTable
DROP TABLE "_admins";

-- DropTable
DROP TABLE "_members";

-- CreateTable
CREATE TABLE "UsersOnTeam" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "isAdmin" BOOLEAN NOT NULL,

    CONSTRAINT "UsersOnTeam_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UsersOnTeam" ADD CONSTRAINT "UsersOnTeam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnTeam" ADD CONSTRAINT "UsersOnTeam_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

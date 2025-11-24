/*
  Warnings:

  - A unique constraint covering the columns `[userId,title]` on the table `List` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[teamId,title]` on the table `List` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "List_userId_title_key" ON "List"("userId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "List_teamId_title_key" ON "List"("teamId", "title");

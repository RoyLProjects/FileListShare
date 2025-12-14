/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `List` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "List_teamId_title_key";

-- DropIndex
DROP INDEX "List_userId_title_key";

-- CreateIndex
CREATE UNIQUE INDEX "List_title_key" ON "List"("title");

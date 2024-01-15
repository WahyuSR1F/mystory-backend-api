/*
  Warnings:

  - Added the required column `updateAt` to the `Capter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `capter` ADD COLUMN `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL;

/*
  Warnings:

  - Made the column `users_id` on table `tasks` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_users_id_fkey";

-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "users_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

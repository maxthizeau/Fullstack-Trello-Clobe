-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_taskGroupId_fkey";

-- DropForeignKey
ALTER TABLE "TaskGroup" DROP CONSTRAINT "TaskGroup_boardId_fkey";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_taskGroupId_fkey" FOREIGN KEY ("taskGroupId") REFERENCES "TaskGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskGroup" ADD CONSTRAINT "TaskGroup_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

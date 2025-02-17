/*
  Warnings:

  - The primary key for the `SessionDetails` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "SessionDetails" DROP CONSTRAINT "SessionDetails_pkey",
ADD CONSTRAINT "SessionDetails_pkey" PRIMARY KEY ("question_id", "choices_id", "sessionHeader_id");

-- CreateIndex
CREATE INDEX "Choices_question_id_idx" ON "Choices"("question_id");

-- CreateIndex
CREATE INDEX "Question_exam_id_idx" ON "Question"("exam_id");

-- CreateIndex
CREATE INDEX "SessionHeader_examinee_id_exam_id_idx" ON "SessionHeader"("examinee_id", "exam_id");

-- CreateIndex
CREATE INDEX "Answers_choices_id_idx" ON "Answers"("choices_id");

-- CreateIndex
CREATE INDEX "Answers_examinee_id_idx" ON "Answers"("examinee_id");

-- CreateIndex
CREATE INDEX "Answers_exam_id_idx" ON "Answers"("exam_id");

-- CreateIndex
CREATE INDEX "Answers_question_id_idx" ON "Answers"("question_id");

-- CreateIndex
CREATE INDEX "Choices_status_idx" ON "Choices"("status");

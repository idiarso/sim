const db = require("../models");
const ExamSchedule = db.ExamSchedule;
const StudentProfile = db.StudentProfile;
const ExamDuration = db.ExamDuration;
const Question = db.Question;
const StudentQuestion = db.StudentQuestion;
const QuestionBank = db.QuestionBank;
const { Op } = require("sequelize");

/**
 * Start an exam for a student
 */
const startExam = async (studentId, scheduleId) => {
  try {
    // Validate student and schedule exist
    const student = await StudentProfile.findByPk(studentId);
    if (!student) throw new Error("Student not found");
    const schedule = await ExamSchedule.findByPk(scheduleId, {
      include: [{ model: QuestionBank }]
    });
    if (!schedule) throw new Error("Exam schedule not found");
    if (!schedule.QuestionBank) throw new Error("Question bank not found for this schedule");

    // Check if student is already taking/finished this exam
    let duration = await ExamDuration.findOne({
      where: { id_siswa: studentId, id_jadwal: scheduleId }
    });

    const now = new Date();

    if (duration) {
      // Check if already finished or reset is not allowed
      if (duration.status === 2 && schedule.ulang === 0) {
        throw new Error("Exam already completed and cannot be retaken");
      }
      // Handle reset logic if needed (based on duration.reset and schedule.ulang)
      if (duration.status === 2 && schedule.ulang === 1) {
        // Resetting: Clear previous answers and duration details
        await StudentQuestion.destroy({ where: { id_siswa: studentId, id_jadwal: scheduleId } });
        await duration.update({ 
          status: 0, 
          lama_ujian: null, 
          mulai: null, 
          selesai: null, 
          reset: 0 
        });
      } else if (duration.status === 1) {
        // Already started, return existing duration
        return { duration, questions: await getStudentExamQuestions(studentId, scheduleId) };
      }
    } else {
      // Create new duration record
      duration = await ExamDuration.create({
        id_siswa: studentId,
        id_jadwal: scheduleId,
        status: 0, // Not started yet
      });
    }

    // Check exam time window
    const startTime = new Date(schedule.tgl_mulai);
    const endTime = new Date(schedule.tgl_selesai);
    if (now < startTime || now > endTime) {
      throw new Error("Exam is not available at this time");
    }

    // Generate student-specific questions if not already generated
    let studentQuestions = await StudentQuestion.findAll({ 
      where: { id_siswa: studentId, id_jadwal: scheduleId },
      order: [["no_soal_alias", "ASC"]]
    });

    if (studentQuestions.length === 0) {
      studentQuestions = await generateStudentQuestions(studentId, scheduleId, schedule);
    }

    // Update duration status to "in progress" and set start time
    await duration.update({
      status: 1,
      mulai: now
    });

    return { duration, questions: studentQuestions };

  } catch (error) {
    console.error("Error starting exam:", error);
    throw error;
  }
};

// Helper to generate randomized questions for a student
const generateStudentQuestions = async (studentId, scheduleId, schedule) => {
  const bank = schedule.QuestionBank;
  const questionsToFetch = [];
  
  // Determine number of questions per type based on schedule/bank settings
  if (bank.tampil_pg > 0) questionsToFetch.push({ type: 1, count: bank.tampil_pg });
  if (bank.tampil_kompleks > 0) questionsToFetch.push({ type: 2, count: bank.tampil_kompleks });
  if (bank.tampil_jodohkan > 0) questionsToFetch.push({ type: 3, count: bank.tampil_jodohkan });
  if (bank.tampil_isian > 0) questionsToFetch.push({ type: 4, count: bank.tampil_isian });
  if (bank.tampil_esai > 0) questionsToFetch.push({ type: 5, count: bank.tampil_esai });

  const generatedQuestions = [];
  let questionNumberAlias = 1;

  for (const item of questionsToFetch) {
    const questions = await Question.findAll({
      where: { bank_id: bank.id_bank, jenis: item.type },
      order: schedule.acak_soal ? db.sequelize.random() : [["nomor_soal", "ASC"]],
      limit: item.count
    });

    for (const q of questions) {
      const studentQuestionData = {
        id_soal_siswa: `${scheduleId}-${studentId}-${q.id_soal}`,
        id_bank: bank.id_bank,
        id_jadwal: scheduleId,
        id_soal: q.id_soal,
        id_siswa: studentId,
        jenis_soal: q.jenis,
        no_soal_alias: questionNumberAlias++,
        jawaban_benar: q.jawaban, // Store correct answer for auto-grading
        point_soal: calculateQuestionPoints(q.jenis, bank) // Calculate points based on type/bank settings
      };
      
      // Alias options if needed (for multiple choice)
      if (q.jenis === 1 && schedule.acak_opsi) {
        const options = ["A", "B", "C", "D", "E"].slice(0, bank.opsi);
        shuffleArray(options);
        studentQuestionData.opsi_alias_a = options[0];
        studentQuestionData.opsi_alias_b = options[1];
        studentQuestionData.opsi_alias_c = options[2];
        if (bank.opsi > 3) studentQuestionData.opsi_alias_d = options[3];
        if (bank.opsi > 4) studentQuestionData.opsi_alias_e = options[4];
      } else if (q.jenis === 1) {
        studentQuestionData.opsi_alias_a = "A";
        studentQuestionData.opsi_alias_b = "B";
        studentQuestionData.opsi_alias_c = "C";
        if (bank.opsi > 3) studentQuestionData.opsi_alias_d = "D";
        if (bank.opsi > 4) studentQuestionData.opsi_alias_e = "E";
      }

      generatedQuestions.push(studentQuestionData);
    }
  }

  // Bulk create student questions
  await StudentQuestion.bulkCreate(generatedQuestions);
  
  return await StudentQuestion.findAll({ 
      where: { id_siswa: studentId, id_jadwal: scheduleId },
      order: [["no_soal_alias", "ASC"]]
  });
};

// Helper to calculate points (simplified)
const calculateQuestionPoints = (type, bank) => {
    switch (type) {
        case 1: return bank.bobot_pg / bank.tampil_pg || 1;
        case 2: return bank.bobot_kompleks / bank.tampil_kompleks || 1;
        case 3: return bank.bobot_jodohkan / bank.tampil_jodohkan || 1;
        case 4: return bank.bobot_isian / bank.tampil_isian || 1;
        case 5: return bank.bobot_esai / bank.tampil_esai || 1;
        default: return 1;
    }
}

// Helper to shuffle array (Fisher-Yates)
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

/**
 * Get student questions for an ongoing exam
 */
const getStudentExamQuestions = async (studentId, scheduleId) => {
  return await StudentQuestion.findAll({
    where: { id_siswa: studentId, id_jadwal: scheduleId },
    include: [{ model: Question }], // Include question details
    order: [["no_soal_alias", "ASC"]]
  });
};

/**
 * Save a student's answer
 */
const saveAnswer = async (studentId, scheduleId, questionId, answer) => {
  try {
    const studentQuestion = await StudentQuestion.findOne({
      where: {
        id_siswa: studentId,
        id_jadwal: scheduleId,
        id_soal: questionId
      }
    });

    if (!studentQuestion) {
      throw new Error("Student question record not found");
    }

    // Check if exam is still ongoing
    const duration = await ExamDuration.findOne({ where: { id_siswa: studentId, id_jadwal: scheduleId } });
    if (!duration || duration.status !== 1) {
      throw new Error("Exam is not currently in progress");
    }

    // Update the answer
    await studentQuestion.update({ jawaban_siswa: answer });

    return { success: true, message: "Answer saved" };

  } catch (error) {
    console.error("Error saving answer:", error);
    throw error;
  }
};

/**
 * Finish an exam for a student
 */
const finishExam = async (studentId, scheduleId) => {
  try {
    const duration = await ExamDuration.findOne({
      where: { id_siswa: studentId, id_jadwal: scheduleId }
    });

    if (!duration || duration.status !== 1) {
      throw new Error("Exam not started or already finished");
    }

    const endTime = new Date();
    const startTime = duration.mulai;
    const timeTakenMs = endTime.getTime() - startTime.getTime();
    const timeTakenSec = Math.floor(timeTakenMs / 1000);
    const timeTakenFormatted = new Date(timeTakenMs).toISOString().substr(11, 8); // HH:MM:SS

    await duration.update({
      status: 2, // Finished
      selesai: endTime,
      lama_ujian: timeTakenFormatted
    });

    // Trigger auto-grading for non-essay questions
    await autoGradeExam(studentId, scheduleId);

    return { success: true, message: "Exam finished" };

  } catch (error) {
    console.error("Error finishing exam:", error);
    throw error;
  }
};

/**
 * Auto-grade non-essay questions for a finished exam
 */
const autoGradeExam = async (studentId, scheduleId) => {
  try {
    const studentQuestions = await StudentQuestion.findAll({
      where: {
        id_siswa: studentId,
        id_jadwal: scheduleId,
        jenis_soal: { [Op.ne]: 5 } // Exclude essay questions (type 5)
      }
    });

    let pgScore = 0;
    let complexScore = 0;
    let matchingScore = 0;
    let fillInScore = 0;
    let pgCorrect = 0;

    for (const sq of studentQuestions) {
      let isCorrect = false;
      // Simple comparison for multiple choice, matching, fill-in
      // TODO: Add more robust comparison logic if needed (case-insensitivity, trimming)
      if (sq.jawaban_siswa && sq.jawaban_benar && sq.jawaban_siswa.toString().trim() === sq.jawaban_benar.toString().trim()) {
          isCorrect = true;
      }
      // TODO: Handle complex choice grading (multiple answers)
      
      if (isCorrect) {
        const points = parseFloat(sq.point_soal) || 0;
        switch (sq.jenis_soal) {
          case 1: // PG
            pgScore += points;
            pgCorrect++;
            break;
          case 2: // Kompleks
            complexScore += points;
            break;
          case 3: // Jodohkan
            matchingScore += points;
            break;
          case 4: // Isian
            fillInScore += points;
            break;
        }
        // Mark as automatically graded and correct
        await sq.update({ nilai_otomatis: 0, nilai_koreksi: sq.point_soal }); 
      } else {
        // Mark as automatically graded and incorrect
        await sq.update({ nilai_otomatis: 0, nilai_koreksi: "0" }); 
      }
    }

    // Save the calculated scores to the cbt_nilai table
    const [result, created] = await db.ExamResult.findOrCreate({
      where: { id_siswa: studentId, id_jadwal: scheduleId },
      defaults: {
        id_siswa: studentId,
        id_jadwal: scheduleId,
        pg_benar: pgCorrect,
        pg_nilai: pgScore,
        kompleks_nilai: complexScore,
        jodohkan_nilai: matchingScore,
        isian_nilai: fillInScore,
        essai_nilai: 0, // Essay score needs manual grading
        dikoreksi: 0 // Mark as not fully graded if essays exist
      }
    });

    if (!created) {
      await result.update({
        pg_benar: pgCorrect,
        pg_nilai: pgScore,
        kompleks_nilai: complexScore,
        jodohkan_nilai: matchingScore,
        isian_nilai: fillInScore,
        // Keep existing essai_nilai if manually graded later
        dikoreksi: result.essai_nilai > 0 ? 1 : 0 // Update graded status
      });
    }

  } catch (error) {
    console.error(`Error auto-grading exam for student ${studentId}, schedule ${scheduleId}:`, error);
  }
};


module.exports = {
  startExam,
  getStudentExamQuestions,
  saveAnswer,
  finishExam,
  autoGradeExam // Exported for potential manual trigger/re-grading
};

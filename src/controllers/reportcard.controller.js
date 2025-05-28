const db = require('../models');
const ReportCard = db.ReportCard;
const ReportCardSubject = db.ReportCardSubject;
const ExtracurricularReport = db.ExtracurricularReport;
const StudentAchievement = db.StudentAchievement;
const StudentProfile = db.StudentProfile;
const TeacherProfile = db.TeacherProfile;
const Class = db.Class;
const Subject = db.Subject;
const AcademicYear = db.AcademicYear;
const Semester = db.Semester;
const { Op } = require('sequelize');

// Generate report cards for a class
exports.generateClassReportCards = async (req, res) => {
  try {
    const { class_id, academic_year_id, semester_id } = req.body;
    
    if (!class_id || !academic_year_id || !semester_id) {
      return res.status(400).json({
        success: false,
        message: 'Class ID, academic year ID, and semester ID are required'
      });
    }
    
    // Get class data and students
    const classData = await Class.findByPk(class_id, {
      include: [
        {
          model: StudentProfile,
          through: {
            where: {
              academic_year_id,
              semester_id,
              status: 'active'
            }
          }
        },
        {
          model: TeacherProfile,
          as: 'HomeroomTeacher'
        }
      ]
    });
    
    if (!classData) {
      return res.status(404).json({
        success: false,
        message: `Class with id ${class_id} not found`
      });
    }
    
    if (!classData.HomeroomTeacher) {
      return res.status(400).json({
        success: false,
        message: 'Class has no assigned homeroom teacher'
      });
    }
    
    const students = classData.StudentProfiles;
    const createdReportCards = [];
    
    // Create report cards for each student
    for (const student of students) {
      // Check if report card already exists
      const existingReportCard = await ReportCard.findOne({
        where: {
          student_id: student.id,
          class_id,
          academic_year_id,
          semester_id
        }
      });
      
      if (existingReportCard) {
        createdReportCards.push(existingReportCard);
        continue;
      }
      
      // Get attendance data
      const attendanceData = await db.ClassAttendance.findAll({
        where: {
          student_id: student.id,
          date: {
            [Op.between]: [
              db.sequelize.literal(`(SELECT start_date FROM semesters WHERE id = ${semester_id})`),
              db.sequelize.literal(`(SELECT end_date FROM semesters WHERE id = ${semester_id})`)
            ]
          }
        },
        attributes: [
          'status',
          [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'count']
        ],
        group: ['status']
      });
      
      const attendance = {
        present: 0,
        sick: 0,
        absent: 0,
        permission: 0
      };
      
      attendanceData.forEach(item => {
        attendance[item.status] = parseInt(item.dataValues.count);
      });
      
      // Create report card
      const reportCard = await ReportCard.create({
        student_id: student.id,
        class_id,
        academic_year_id,
        semester_id,
        homeroom_teacher_id: classData.HomeroomTeacher.id,
        attendance_present: attendance.present,
        attendance_sick: attendance.sick,
        attendance_absent: attendance.absent,
        attendance_permission: attendance.permission,
        is_final: false
      });
      
      createdReportCards.push(reportCard);
    }
    
    return res.status(201).json({
      success: true,
      message: 'Report cards generated successfully',
      data: {
        class_name: classData.name,
        homeroom_teacher: classData.HomeroomTeacher.name,
        total_students: students.length,
        report_cards: createdReportCards
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to generate report cards',
      error: error.message
    });
  }
};

// Get all report cards with filtering and pagination
exports.findAll = async (req, res) => {
  try {
    const { 
      student_id, class_id, academic_year_id, 
      semester_id, is_final, page = 1, limit = 10 
    } = req.query;
    
    // Build filter condition
    const condition = {};
    if (student_id) condition.student_id = student_id;
    if (class_id) condition.class_id = class_id;
    if (academic_year_id) condition.academic_year_id = academic_year_id;
    if (semester_id) condition.semester_id = semester_id;
    if (is_final !== undefined) condition.is_final = is_final === 'true';
    
    const offset = (page - 1) * limit;
    
    const { count, rows } = await ReportCard.findAndCountAll({
      where: condition,
      limit: parseInt(limit),
      offset: offset,
      include: [
        { model: StudentProfile },
        { model: Class },
        { model: AcademicYear },
        { model: Semester },
        { model: TeacherProfile, as: 'HomeroomTeacher' }
      ],
      order: [['id', 'DESC']]
    });
    
    return res.status(200).json({
      success: true,
      message: 'Report cards retrieved successfully',
      data: rows,
      meta: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        total_pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve report cards',
      error: error.message
    });
  }
};

// Get a single report card by ID with all related data
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const reportCard = await ReportCard.findByPk(id, {
      include: [
        { model: StudentProfile },
        { model: Class },
        { model: AcademicYear },
        { model: Semester },
        { model: TeacherProfile, as: 'HomeroomTeacher' },
        { 
          model: ReportCardSubject,
          include: [
            { model: Subject },
            { model: TeacherProfile }
          ]
        },
        { 
          model: ExtracurricularReport,
          include: [{ model: db.Extracurricular }]
        },
        { model: StudentAchievement }
      ]
    });
    
    if (!reportCard) {
      return res.status(404).json({
        success: false,
        message: `Report card with id ${id} not found`
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Report card retrieved successfully',
      data: reportCard
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve report card',
      error: error.message
    });
  }
};

// Update report card data
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await ReportCard.update(req.body, {
      where: { id: id }
    });
    
    if (updated === 0) {
      return res.status(404).json({
        success: false,
        message: `Report card with id ${id} not found`
      });
    }
    
    const updatedReportCard = await ReportCard.findByPk(id);
    
    return res.status(200).json({
      success: true,
      message: 'Report card updated successfully',
      data: updatedReportCard
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update report card',
      error: error.message
    });
  }
};

// Set report card as final
exports.setFinal = async (req, res) => {
  try {
    const id = req.params.id;
    const reportCard = await ReportCard.findByPk(id);
    
    if (!reportCard) {
      return res.status(404).json({
        success: false,
        message: `Report card with id ${id} not found`
      });
    }
    
    // Check if all subject grades are entered
    const subjects = await ReportCardSubject.findAll({
      where: { report_card_id: id }
    });
    
    if (subjects.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot finalize report card with no subject grades'
      });
    }
    
    // Set report card as final
    await ReportCard.update(
      {
        is_final: true,
        report_date: new Date()
      },
      {
        where: { id: id }
      }
    );
    
    return res.status(200).json({
      success: true,
      message: 'Report card set as final successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to set report card as final',
      error: error.message
    });
  }
};

// Calculate class rankings
exports.calculateRankings = async (req, res) => {
  try {
    const { class_id, academic_year_id, semester_id } = req.query;
    
    if (!class_id || !academic_year_id || !semester_id) {
      return res.status(400).json({
        success: false,
        message: 'Class ID, academic year ID, and semester ID are required'
      });
    }
    
    // Get all report cards for the class
    const reportCards = await ReportCard.findAll({
      where: {
        class_id,
        academic_year_id,
        semester_id
      },
      include: [
        { model: StudentProfile },
        { 
          model: ReportCardSubject,
          attributes: ['final_grade']
        }
      ]
    });
    
    if (reportCards.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No report cards found for the specified class and semester'
      });
    }
    
    // Calculate average grade for each student
    const rankings = reportCards.map(reportCard => {
      const subjects = reportCard.ReportCardSubjects;
      let totalGrade = 0;
      let validSubjects = 0;
      
      subjects.forEach(subject => {
        if (subject.final_grade !== null) {
          totalGrade += subject.final_grade;
          validSubjects++;
        }
      });
      
      const averageGrade = validSubjects > 0 ? totalGrade / validSubjects : 0;
      
      return {
        report_card_id: reportCard.id,
        student_id: reportCard.student_id,
        student_name: reportCard.StudentProfile.name,
        average_grade: averageGrade
      };
    });
    
    // Sort by average grade (descending)
    rankings.sort((a, b) => b.average_grade - a.average_grade);
    
    // Assign ranks
    const totalStudents = rankings.length;
    for (let i = 0; i < rankings.length; i++) {
      const rank = i + 1;
      await ReportCard.update(
        {
          rank_in_class: rank,
          total_students: totalStudents
        },
        {
          where: { id: rankings[i].report_card_id }
        }
      );
      
      // Add rank to the ranking object
      rankings[i].rank = rank;
    }
    
    return res.status(200).json({
      success: true,
      message: 'Class rankings calculated successfully',
      data: {
        total_students: totalStudents,
        rankings: rankings
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to calculate class rankings',
      error: error.message
    });
  }
};

// Add subject grade to report card
exports.addSubjectGrade = async (req, res) => {
  try {
    const { report_card_id } = req.params;
    const reportCard = await ReportCard.findByPk(report_card_id);
    
    if (!reportCard) {
      return res.status(404).json({
        success: false,
        message: `Report card with id ${report_card_id} not found`
      });
    }
    
    // Check if subject grade already exists
    const existingSubject = await ReportCardSubject.findOne({
      where: {
        report_card_id,
        subject_id: req.body.subject_id
      }
    });
    
    if (existingSubject) {
      return res.status(400).json({
        success: false,
        message: 'Subject grade already exists for this report card'
      });
    }
    
    // Add subject grade
    const subjectGrade = await ReportCardSubject.create({
      report_card_id,
      ...req.body
    });
    
    return res.status(201).json({
      success: true,
      message: 'Subject grade added successfully',
      data: subjectGrade
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to add subject grade',
      error: error.message
    });
  }
};

// Update subject grade
exports.updateSubjectGrade = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await ReportCardSubject.update(req.body, {
      where: { id: id }
    });
    
    if (updated === 0) {
      return res.status(404).json({
        success: false,
        message: `Subject grade with id ${id} not found`
      });
    }
    
    const updatedSubjectGrade = await ReportCardSubject.findByPk(id);
    
    return res.status(200).json({
      success: true,
      message: 'Subject grade updated successfully',
      data: updatedSubjectGrade
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update subject grade',
      error: error.message
    });
  }
};

// Get a student's complete academic record (for student book/buku induk)
exports.getStudentRecord = async (req, res) => {
  try {
    const { student_id } = req.params;
    
    // Get student data
    const student = await StudentProfile.findByPk(student_id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student with id ${student_id} not found`
      });
    }
    
    // Get all report cards for the student
    const reportCards = await ReportCard.findAll({
      where: {
        student_id,
        is_final: true
      },
      include: [
        { model: Class },
        { model: AcademicYear },
        { model: Semester },
        { 
          model: ReportCardSubject,
          include: [{ model: Subject }]
        },
        { 
          model: ExtracurricularReport,
          include: [{ model: db.Extracurricular }]
        },
        { model: StudentAchievement }
      ],
      order: [
        [{ model: AcademicYear }, 'year', 'ASC'],
        [{ model: Semester }, 'semester', 'ASC']
      ]
    });
    
    return res.status(200).json({
      success: true,
      message: 'Student academic record retrieved successfully',
      data: {
        student,
        academic_record: reportCards
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve student academic record',
      error: error.message
    });
  }
};

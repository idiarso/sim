'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create teacher_journals table
    await queryInterface.createTable('teacher_journals', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      teacher_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'teacher_profiles',
          key: 'id'
        }
      },
      class_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'classes',
          key: 'id'
        }
      },
      subject_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'subjects',
          key: 'id'
        }
      },
      academic_year_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'academic_years',
          key: 'id'
        }
      },
      semester_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'semesters',
          key: 'id'
        }
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      start_time: {
        type: Sequelize.TIME,
        allowNull: false
      },
      end_time: {
        type: Sequelize.TIME,
        allowNull: false
      },
      material_topic: {
        type: Sequelize.STRING,
        allowNull: false
      },
      activity_description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      learning_methods: {
        type: Sequelize.STRING,
        allowNull: true
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Create class_attendances table
    await queryInterface.createTable('class_attendances', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      class_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'classes',
          key: 'id'
        }
      },
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'student_profiles',
          key: 'id'
        }
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('present', 'absent', 'sick', 'permission'),
        allowNull: false,
        defaultValue: 'present'
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Create extracurriculars table
    await queryInterface.createTable('extracurriculars', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      coach_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'teacher_profiles',
          key: 'id'
        }
      },
      day: {
        type: Sequelize.STRING,
        allowNull: false
      },
      start_time: {
        type: Sequelize.TIME,
        allowNull: false
      },
      end_time: {
        type: Sequelize.TIME,
        allowNull: false
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false
      },
      max_participants: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Create extracurricular_students table
    await queryInterface.createTable('extracurricular_students', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      extracurricular_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'extracurriculars',
          key: 'id'
        }
      },
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'student_profiles',
          key: 'id'
        }
      },
      academic_year_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'academic_years',
          key: 'id'
        }
      },
      semester_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'semesters',
          key: 'id'
        }
      },
      join_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active'
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Create extracurricular_attendances table
    await queryInterface.createTable('extracurricular_attendances', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      extracurricular_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'extracurriculars',
          key: 'id'
        }
      },
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'student_profiles',
          key: 'id'
        }
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('present', 'absent', 'sick', 'permission'),
        allowNull: false,
        defaultValue: 'present'
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Create teacher_duties table
    await queryInterface.createTable('teacher_duties', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      teacher_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'teacher_profiles',
          key: 'id'
        }
      },
      day_of_week: {
        type: Sequelize.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
        allowNull: false
      },
      academic_year_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'academic_years',
          key: 'id'
        }
      },
      semester_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'semesters',
          key: 'id'
        }
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Create student_permissions table
    await queryInterface.createTable('student_permissions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'student_profiles',
          key: 'id'
        }
      },
      permission_type: {
        type: Sequelize.ENUM('leave_early', 'late_arrival', 'sick_leave', 'absence_permission', 'other'),
        allowNull: false
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      start_time: {
        type: Sequelize.TIME,
        allowNull: false
      },
      end_time: {
        type: Sequelize.TIME,
        allowNull: true
      },
      reason: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      is_approved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      approved_by_duty_teacher: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'teacher_profiles',
          key: 'id'
        }
      },
      parent_confirmation: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      parent_confirmation_method: {
        type: Sequelize.ENUM('phone', 'written_note', 'in_person', 'sms', 'other'),
        allowNull: true
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('student_permissions');
    await queryInterface.dropTable('teacher_duties');
    await queryInterface.dropTable('extracurricular_attendances');
    await queryInterface.dropTable('extracurricular_students');
    await queryInterface.dropTable('extracurriculars');
    await queryInterface.dropTable('class_attendances');
    await queryInterface.dropTable('teacher_journals');
  }
};

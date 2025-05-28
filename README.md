# Garuda CBT Application

A comprehensive Computer-Based Test (CBT) and School Management System built with Node.js and Express.

## About

Garuda CBT is a complete school management system with integrated computer-based testing capabilities. This application has been migrated from PHP (CodeIgniter) to Node.js (Express) to improve performance, scalability, and maintainability.

## Core Features

### User Management
- Multi-level user management (Admin, Teachers, Students)
- Secure authentication and authorization
- User profiles and settings

### Academic Management
- Class and student management
- Subject and curriculum management
- Academic year and semester management
- Teacher management

### Computer-Based Testing (CBT)
- Question bank management
- Various question types (multiple choice, essay, etc.)
- Exam scheduling and configuration
- Automatic grading
- Test result analysis and reporting

### Attendance System
- Daily class attendance tracking
- Extracurricular attendance tracking
- Attendance reports and analytics

### Teacher Features
- Daily teaching journals
- Class management
- Grade management
- Teaching schedule

### Administrative Features
- Teacher duty scheduling (Piket)
- Student permission management
- Student absence management
- Report generation

### Additional Features
- Extracurricular activities management
- Student performance analytics
- Parent communication tools

## Technical Stack

### Backend
- **Framework**: Express.js (Node.js)
- **Database**: MySQL/MariaDB with Sequelize ORM
- **Authentication**: JWT with Passport.js
- **API**: RESTful architecture

### Frontend (Not included in this repo)
- To be developed separately with a modern frontend framework

## Application Structure

```
garuda-cbt-node/
├── config/                 # Configuration files
├── migrations/             # Database migrations
├── models/                 # Sequelize models
│   ├── academicyear.js
│   ├── class.js
│   ├── classattendance.js
│   ├── classstudent.js
│   ├── examduration.js
│   ├── examresult.js
│   ├── examschedule.js
│   ├── extracurricular.js
│   ├── extracurricularattendance.js
│   ├── extracurricularstudent.js
│   ├── finalgrade.js
│   ├── group.js
│   ├── index.js
│   ├── question.js
│   ├── questionbank.js
│   ├── semester.js
│   ├── setting.js
│   ├── studentpermission.js
│   ├── studentprofile.js
│   ├── studentquestion.js
│   ├── subject.js
│   ├── teacherduty.js
│   ├── teacherjournal.js
│   ├── teacherprofile.js
│   ├── user.js
│   └── usergroup.js
├── seeders/                # Database seeders
├── src/                    # Source code
│   ├── controllers/        # API controllers
│   │   ├── auth.controller.js
│   │   ├── class.controller.js
│   │   ├── classattendance.controller.js
│   │   ├── classroom.controller.js
│   │   ├── examresult.controller.js
│   │   ├── examschedule.controller.js
│   │   ├── examtaking.controller.js
│   │   ├── extracurricular.controller.js
│   │   ├── question.controller.js
│   │   ├── questionbank.controller.js
│   │   ├── report.controller.js
│   │   ├── setting.controller.js
│   │   ├── student.controller.js
│   │   ├── studentpermission.controller.js
│   │   ├── subject.controller.js
│   │   ├── teacher.controller.js
│   │   ├── teacherduty.controller.js
│   │   ├── teacherjournal.controller.js
│   │   └── user.controller.js
│   ├── middlewares/        # Custom middleware
│   ├── public/             # Static files
│   ├── routes/             # API routes
│   │   ├── auth.routes.js
│   │   ├── cbt.routes.js
│   │   ├── classattendance.routes.js
│   │   ├── classroom.routes.js
│   │   ├── extracurricular.routes.js
│   │   ├── master.routes.js
│   │   ├── report.routes.js
│   │   ├── setting.routes.js
│   │   ├── studentpermission.routes.js
│   │   ├── teacherduty.routes.js
│   │   ├── teacherjournal.routes.js
│   │   └── user.routes.js
│   └── utils/              # Utility functions
├── tests/                  # Test files
├── .env                    # Environment variables
├── .sequelizerc            # Sequelize configuration
├── package.json            # Project dependencies
└── server.js               # Entry point
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/token` - Refresh token

### User Management
- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get user by ID
- `POST /api/v1/users` - Create user
- `PUT /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user

### Master Data
- Various endpoints for managing master data (classes, subjects, etc.)

### CBT (Computer-Based Test)
- Question bank management
- Exam scheduling
- Test taking
- Result management

### Teacher Journals
- `POST /api/v1/teacher-journals` - Create journal entry
- `GET /api/v1/teacher-journals` - Get all journal entries
- `GET /api/v1/teacher-journals/:id` - Get journal by ID
- `PUT /api/v1/teacher-journals/:id` - Update journal
- `DELETE /api/v1/teacher-journals/:id` - Delete journal
- `GET /api/v1/teacher-journals/summary/report` - Get journal summary

### Class Attendance
- `POST /api/v1/class-attendance/bulk` - Create attendance records
- `GET /api/v1/class-attendance` - Get attendance records
- `GET /api/v1/class-attendance/class/:class_id/date/:date` - Get class attendance
- `PUT /api/v1/class-attendance/:id` - Update attendance
- `GET /api/v1/class-attendance/student/summary` - Get student attendance summary

### Extracurricular
- `POST /api/v1/extracurricular` - Create extracurricular
- `GET /api/v1/extracurricular` - Get all extracurriculars
- `GET /api/v1/extracurricular/:id` - Get extracurricular by ID
- `PUT /api/v1/extracurricular/:id` - Update extracurricular
- `DELETE /api/v1/extracurricular/:id` - Delete extracurricular
- `POST /api/v1/extracurricular/enroll` - Enroll students
- `POST /api/v1/extracurricular/attendance` - Record attendance
- `GET /api/v1/extracurricular/:id/attendance/:date` - Get attendance
- `GET /api/v1/extracurricular/enrolled-students` - Get enrolled students

### Teacher Duty (Piket)
- `POST /api/v1/teacher-duty` - Create duty schedule
- `GET /api/v1/teacher-duty` - Get all duty schedules
- `GET /api/v1/teacher-duty/day` - Get duty teachers for a day
- `PUT /api/v1/teacher-duty/:id` - Update duty schedule
- `DELETE /api/v1/teacher-duty/:id` - Delete duty schedule
- `POST /api/v1/teacher-duty/week-schedule` - Create weekly schedule

### Student Permission
- `POST /api/v1/student-permission` - Create permission
- `GET /api/v1/student-permission` - Get all permissions
- `GET /api/v1/student-permission/:id` - Get permission by ID
- `PUT /api/v1/student-permission/:id` - Update permission
- `DELETE /api/v1/student-permission/:id` - Delete permission
- `PUT /api/v1/student-permission/:id/approve` - Approve permission
- `PUT /api/v1/student-permission/:id/parent-confirmation` - Update parent confirmation
- `GET /api/v1/student-permission/pending/today` - Get today's pending permissions

## Installation and Setup

1. Clone the repository
   ```
   git clone https://github.com/your-username/garuda-cbt-node.git
   cd garuda-cbt-node
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Configure environment variables
   ```
   cp .env.example .env
   ```
   Then edit the `.env` file with your database credentials and other settings.

4. Run database migrations
   ```
   npx sequelize-cli db:migrate
   ```

5. (Optional) Seed the database with initial data
   ```
   npx sequelize-cli db:seed:all
   ```

6. Start the server
   ```
   npm start
   ```

## Development

For development with auto-restart on file changes:
```
npm run dev
```

## License

This project is open-source software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Acknowledgements

This project is a Node.js migration of the original [Garuda CBT](https://github.com/garudacbt/cbt) PHP application.

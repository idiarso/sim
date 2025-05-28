const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const morgan = require('morgan');
const { expressjwt: expressJwt } = require('express-jwt');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes (to be created)
const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const masterRoutes = require('./src/routes/master.routes');
const cbtRoutes = require('./src/routes/cbt.routes');
const studentRoutes = require('./src/routes/student.routes');
const reportRoutes = require('./src/routes/report.routes');

// Import new feature routes
const teacherJournalRoutes = require('./src/routes/teacherjournal.routes');
const classAttendanceRoutes = require('./src/routes/classattendance.routes');
const extracurricularRoutes = require('./src/routes/extracurricular.routes');
const teacherDutyRoutes = require('./src/routes/teacherduty.routes');
const studentPermissionRoutes = require('./src/routes/studentpermission.routes');
const learningMaterialRoutes = require('./src/routes/learningmaterial.routes');
const assignmentRoutes = require('./src/routes/assignment.routes');
const examTypeRoutes = require('./src/routes/examtype.routes');
const reportCardRoutes = require('./src/routes/reportcard.routes');
const reportCardSettingRoutes = require('./src/routes/reportcardsetting.routes');
const schoolProfileRoutes = require('./src/routes/schoolprofile.routes');
const databaseRoutes = require('./src/routes/database.routes');

// Import models
const db = require('./src/models');
const User = db.User;

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Passport configuration
passport.use(new LocalStrategy(
  { usernameField: 'username', passwordField: 'password' },
  async (username, password, done) => {
    try {
      // Find user by username
      const user = await User.findOne({ 
        where: { username: username },
        include: [{ model: db.Group }]
      });
      
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      
      // Update last login time
      user.last_login = Math.floor(Date.now() / 1000);
      await user.save();
      
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// JWT middleware
const jwtMiddleware = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  requestProperty: 'auth'
}).unless({
  path: [
    '/api/v1/auth/login',
    '/api/v1/auth/token'
  ]
});

app.use(jwtMiddleware);

// Error handler for JWT authentication
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Invalid token' });
  }
  next(err);
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/master', masterRoutes);
app.use('/api/v1/cbt', cbtRoutes);
app.use('/api/v1/student', studentRoutes);
app.use('/api/v1/reports', reportRoutes);

// New feature routes
app.use('/api/v1/teacher-journals', teacherJournalRoutes);
app.use('/api/v1/class-attendance', classAttendanceRoutes);
app.use('/api/v1/extracurricular', extracurricularRoutes);
app.use('/api/v1/teacher-duty', teacherDutyRoutes);
app.use('/api/v1/student-permission', studentPermissionRoutes);

// E-Learning routes
app.use('/api/v1/learning-materials', learningMaterialRoutes);
app.use('/api/v1/assignments', assignmentRoutes);

// Exam system routes
app.use('/api/v1/exam-types', examTypeRoutes);

// Report card system routes
app.use('/api/v1/report-cards', reportCardRoutes);
app.use('/api/v1/report-card-settings', reportCardSettingRoutes);

// School management routes
app.use('/api/v1/school-profile', schoolProfileRoutes);

// Database management routes
app.use('/api/v1/database', databaseRoutes);

// Static files
app.use(express.static('src/public'));

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Garuda CBT API' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Sync database
db.sequelize.sync({ alter: false }).then(() => {
  console.log('Database synchronized');
}).catch(err => {
  console.error('Failed to sync database:', err);
});

module.exports = app;

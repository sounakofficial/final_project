require('./api/config/passportConfig');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');

// const QuestionRoutes = require('./api/routes/questions')
// const SubjectRoutes = require('./api/routes/subjects')
const AdminRoutes = require('./api/routes/admins');
const StudentRoutes = require('./api/routes/students');

mongoose.connect(
  'mongodb+srv://examAdmin:' +
    process.env.MONGO_ATLAS_PW +
    '@examcluster-hrzdj.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true, useCreateIndex: true }
);

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

// app.use('/', (req, res, next) => {
//   res.status(200).json({
//     messege: 'works'
//   });
// });
// app.use('/questions',QuestionRoutes);
// app.use('/subjects',SubjectRoutes);
app.use('/admin', AdminRoutes);
app.use('/student', StudentRoutes);

module.exports = app;

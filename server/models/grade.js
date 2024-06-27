const mongoose = require('mongoose');

//MONGO MODEL TO POST INTO DATABASE
const gradeSchema = new mongoose.Schema({
    course: String,
    grade: String,
    creditHours: Number
});

module.exports = mongoose.model('Grade', gradeSchema);

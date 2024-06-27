const Grade = require('../models/grade');

// Map letter grades to GPA points
const gradeToPoints = {
    'A': 4.0,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0,
    'C-': 1.7,
    'D+': 1.3,
    'D': 1.0,
    'F': 0.0
};

// Calculate GPA
const calculateGPA = async (req, res) => {
    try {
        const grades = req.body.grades;
        let totalPoints = 0;
        let totalCreditHours = 0;
        
        //loop through grades, multiply by creditHours, adds together
        grades.forEach(({ grade, creditHours }) => {
            totalPoints += gradeToPoints[grade] * creditHours;
            //add to sum total 
            totalCreditHours += creditHours;
        });
        
        //gpa math, returns valid 200 status
        const gpa = totalPoints / totalCreditHours;
        res.status(200).json({ gpa: gpa.toFixed(2) });
    } catch (err) {
        //gpa calculation failed
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    calculateGPA
};

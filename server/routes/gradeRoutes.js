const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/gradeController');

router.post('/gpa', gradeController.calculateGPA);

router.get('/',(req, res)=>{
    res.render('index');
})

// Show form to create a new GPA entry
router.get('/gpa/new', (req, res) => {
    console.log('created')
    res.render('new');
});

//New GPA entry 
router.post('/gpa', async (req, res) => {
    const { course, grade, credits } = req.body;
    const newGpa = new GPA({ course, grade, credits });
    try {
        const newGPa = await newGpa.save();
        //document returned here
        res.status(201).json(newGPa);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update an existing GPA entry
router.post('/gpa/edit/:id', async (req, res) => {
    const { course, grade, credits } = req.body;
    try {
        await GPA.findByIdAndUpdate(req.params.id, { course, grade, credits });
        res.redirect('/');
        console.log('updated')
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Delete a GPA entry
router.post('/gpa/delete/:id', async (req, res) => {
    try {
        await GPA.findByIdAndDelete(req.params.id);
        res.redirect('/');
        console.log('deleted')
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;

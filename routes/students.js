const express = require('express')
const router = express.Router();
const Student = require('../models/Students');

// Get All Students
router.get('/', async (req, res) => {
    try {
        const data = await Student.find();
        res.json(data);
    } catch (error) {
        res.json({ message: error })
    }
})

// Get specific Student
router.get('/:id', async (req, res) => {
   try {
       const student = await Student.findById(req.params.postId);
       res.json(student);
   } catch (error) {
       res.json({message: error});
   }
})

// POST Student
router.post('/', async (req, res) => {
    const student = new Student({
        fullName: req.body.fullName,
        tokenBase64: req.body.tokenBase64,
        rNumber: req.body.rNumber
    });

    try {
        const savedStudents = await student.save();
        res.json(data);
    } catch (error) {
        console.log("errorr", err);
        res.json({ message: error });
    }

})


module.exports = router;
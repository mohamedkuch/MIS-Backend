const express = require('express')
const router = express.Router();
const Student = require('../models/Students');

// Get All Students
router.get('/', (req, res) => {
    Student.find()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
})

// Get specific Student
router.get('/:postId', (req, res) => {
    Student.findById(req.params.postId)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

})

// POST Student
router.post('/', (req, res) => {
    const student = new Student({
        fullName: req.body.fullName,
        tokenBase64: req.body.tokenBase64,
        rNumber: req.body.rNumber
    });

    student
        .save()
        .then(result => {
            res.status(201).json({
                message: "Student created!",
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

})


module.exports = router;
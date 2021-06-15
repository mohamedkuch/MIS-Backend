const express = require('express');
const Certificate = require('../models/Certificate');
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
router.get('/:id', (req, res) => {
    Student.findOne({"tokenBase64": req.params.id})
    .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

})
router.get('/:id/certificates', (req, res) => {

    Student.findOne({"tokenBase64": req.params.id})
        .then(data => {

            if (data.certificates.length > 0) {
                Certificate.find(
                    {
                        '_id': {
                            $in: data.certificates
                        }
                    }, function (err, docs) {
                        res.status(201).json(docs);
                    });

            }
            return res.status(201).json("No certificates Found")
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
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        tokenBase64: req.body.tokenBase64,
        rNumber: req.body.rNumber,
        certificates: req.body.certificates
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
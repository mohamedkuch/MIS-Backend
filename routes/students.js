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

    Student.findOne({ "rNumber": req.params.id })
        .then(result => {
            if (result)
                return res.status(201).json(result);

            return res.status(500).json({
                result: "No student found !"
            });
        })
        .catch(err => {

            return res.status(500).json({
                result: "No student found !"
            });
        });

})
router.get('/:id/certificates', (req, res) => {
    if (!req.query.token) {
        return res.status(500).json({
            result: "Token is missing"
        });
    }

    Student.findOne({ "rNumber": req.params.id, "tokenBase64": req.query.token })
        .then(data => {
            if (data.certificates.length > 0) {
                Certificate.find(
                    {
                        '_id': {
                            $in: data.certificates
                        }
                    }, function (err, docs) {
                        return res.status(201).json(docs);
                    }).catch(err => {
                        return res.status(500).json({
                            error: err
                        });
                    });

            } else {
                return res.status(201).json("No certificates found !")
            }
        })
        .catch(err => {
            return res.status(500).json({
                result: "No certificates found !"
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
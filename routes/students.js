const express = require('express');
const Certificate = require('../models/Certificate');
const router = express.Router();
const Student = require('../models/Students');

/**
 * @swagger
 * /students:
 *   get:
 *    summary: Get all students
 *    description: Get all students
 *      
 *    responses:
 *      '201':
 *        description: Students are fetched successfully
 *      '500':
 *        description: Error fetching Students
 * 
 */
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



/**
 * @swagger
 * /students:
 *   post:
 *    summary: Save new student
 *    description: Save new workplace
 *    parameters:
 *      - name: firstName
 *        in: body
 *        required: true
 *        description: student firstname
 *        schema:
 *          type : string
 * 
 *      - name: lastName
 *        in: body
 *        required: true
 *        description: student lastname
 *        schema:
 *          type: string
 * 
 *      - name: tokenBase64
 *        in: body
 *        required: true
 *        description: token base 64 for authentication
 *        schema:
 *          type : string
 * 
 *      - name: rNumber
 *        in: body
 *        required: true
 *        description: student rNumber must be unique
 *        schema:
 *          type : string
 * 
 *      - name: certificates
 *        in: body
 *        description: List of certificates available of the student
 *        schema:
 *          type : array
 *          items: 
 *            type: string
 *              
 * 
 *    responses:
 *      '201':
 *        description: student created successfully
 *      '500':
 *        description: error creating student
 * 
 */
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


/**
 * @swagger
 * /students/{studentNumber}:
 *   get:
 *    summary: Get specific student by studentNumber 
 *    description: Get specific workplaces
 *    parameters:
 *      - name: rNumber
 *        in: params
 *        required: true
 *        description: student rNumber
 *        schema:
 *          type : string
 * 
 *    responses:
 *      '201':
 *        description: Student is fetched successfully
 *      '500':
 *        description: Error fetching Student
 * 
 */
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


/**
 * @swagger
 * /students/{studentNumber}/certificate?token:
 *   get:
 *    summary: Get certificate list of the student by studentNumber 
 *    description: Get certificate list of the student by studentNumber 
 *    parameters:
 *      - name: rNumber
 *        in: params
 *        required: true
 *        description: student rNumber
 *        schema:
 *          type : string
 * 
 *    responses:
 *      '200':
 *        description: Certificate list of the student is fetched successfully
 *      '500':
 *        description: Error fetching certificate list
 * 
 */
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
                        return res.status(200).json(docs);
                    }).catch(err => {
                        return res.status(500).json({
                            error: err
                        });
                    });

            } else {
                return res.status(200).json("No certificates found !")
            }
        })
        .catch(err => {
            return res.status(500).json({
                result: "No certificates found !"
            });
        });
})



module.exports = router;
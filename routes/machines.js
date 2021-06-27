const express = require('express')
const router = express.Router();
const Machine = require('../models/Machine');
const MachineUse = require('../models/MachineUse');
const Student = require('../models/Students');


/**
 * @swagger
 * /machines:
 *   get:
 *    summary: Get all machines
 *    description: Get all machines
 *      
 *    responses:
 *      '201':
 *        description: Machines are fetched successfully
 *      '500':
 *        description: Error fetching machines
 * 
 */
router.get('/', (req, res) => {
    Machine.find()
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
 * /machines/{machineId}:
 *   get:
 *    summary: Get specific machine by {machineId} 
 *    description: Get specific machine by {machineId} 
 *    parameters:
 *      - name: machineId
 *        in: params
 *        required: true
 *        description: machine id
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
    Machine.findById(req.params.id)
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
 * /machines:
 *   post:
 *    summary: Create new machine
 *    description: Create new machine
 *    parameters:
 *      - name: name
 *        in: body
 *        required: true
 *        description: machine name
 *        schema:
 *          type : string
 * 
 *      - name: certificateKey
 *        in: body
 *        required: true
 *        description: certificate id associated with machine
 *        schema:
 *          type: string
 * 
 *      - name: safetyCardURL
 *        in: body
 *        required: true
 *        description: safety card url string
 *        schema:
 *          type : string
 * 
 *    responses:
 *      '201':
 *        description: machine created successfully
 *      '500':
 *        description: error creating machine
 * 
 */
router.post('/', (req, res) => {
    const machine = new Machine({
        name: req.body.name,
        certificateKey: req.body.certificateKey,
        safetyCardURL: req.body.safetyCardURL
    });

    machine
        .save()
        .then(result => {
            res.status(201).json({
                message: "Machine created!",
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
 * /machines/{machineid}/use/{studentNumber}?token:
 *   post:
 *    summary: User use machine
 *    description: User use machine
 *    parameters:
 *      - name: machineid
 *        in: params
 *        required: true
 *        description: machine id
 *        schema:
 *          type : string
 * 
 *      - name: studentNumber
 *        in: params
 *        required: true
 *        description: student Number
 *        schema:
 *          type: string
 * 
 *      - name: token
 *        in: params
 *        required: true
 *        description: token to identify user must be valid for the selected rNumber
 *        schema:
 *          type : string
 * 
 * 
 *    responses:
 *      '201':
 *        description: User is using machine successfully
 *      '500':
 *        description: error user using machine
 * 
 */
router.post('/:machineid/use/:rNumber', (req, res) => {
    if (!req.query.token) {
        return res.status(500).json({
            result: "Token is missing"
        });
    }

    Student.findOne({
        "rNumber": req.params.rNumber,
        "tokenBase64": req.query.token,
    }).then(data => {
        if (data == null) {
            res.status(500).json({
                error: "invalid token"
            });
        }
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });


    const machineUse = new MachineUse({
        machineKey: req.params.machineid,
        studentKey: req.params.rNumber
    });

    machineUse
        .save()
        .then(result => {
            res.status(201).json({
                message: "Machine use is posted successfully!",
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

});

module.exports = router;
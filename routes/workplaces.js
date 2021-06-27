const express = require('express');
const Machine = require('../models/Machine');
const Student = require('../models/Students');

const router = express.Router();
const Workplace = require('../models/Workplace');
const WorkplaceEnter = require('../models/WorkplaceEnter');

/**
 * @swagger
 * /workplace:
 *   get:
 *    summary: Get all workplaces
 *    description: Get all workplaces
 *      
 *    responses:
 *      '201':
 *        description: Workplaces are fetched successfully
 *      '500':
 *        description: error fetching Workplaces
 * 
 */
 router.get('/', (req, res) => {
    Workplace.find()
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
 * /workplace/{workplaceNumber}:
 *   get:
 *    summary: Get specific workplaces by {workplaceNumber} 
 *    description: Get specific workplaces by {workplaceNumber} 
 *    parameters:
 *      - name: workplaceNumber
 *        in: params
 *        required: true
 *        description: workplace number
 *        schema:
 *          type : string
 * 
 *    responses:
 *      '201':
 *        description: Workplace is fetched successfully
 *      '500':
 *        description: error fetching Workplace
 * 
 */
router.get('/:id', (req, res) => {

    Workplace.findOne({ "workplaceNumber": req.params.id })
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
 * /workplace/{workplaceNumber}/machines:
 *   get:
 *    summary: Get machines list from specific workplace with {workplaceNumber}
 *    description: Get machines list from specific workplace with {workplaceNumber}
 *    parameters:
 *      - name: workplaceNumber
 *        in: params
 *        required: true
 *        description: workplace Number
 *        schema:
 *          type : string
 * 
 *    responses:
 *      '200':
 *        description: machine list of the workplace fetched successfully
 *      '500':
 *        description: error fetching machine list of the workplace
 * 
 */
router.get('/:workplaceId/machines', (req, res) => {

    Workplace.findOne({ "workplaceNumber": req.params.workplaceId })
        .then(result => {
            if (result.machines.length == 0) {
                res.status(201).json({
                    message: "no machines in this Workplace !",
                    result: []
                });
            }

            Machine.find({
                '_id': { $in: result.machines }
            }, function (err, docs) {
                res.status(200).json(docs);
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

});


/**
 * @swagger
 * /workplace:
 *   post:
 *    summary: Create new workplace
 *    description: Create new workplace
 *    parameters:
 *      - name: name
 *        in: body
 *        required: true
 *        description: workplace name
 *        schema:
 *          type : string
 * 
 *      - name: machines
 *        in: body
 *        required: true
 *        description: list of the machine's Id of the workplace
 *        schema:
 *          type: array
 *          items: 
 *            type: string
 * 
 *      - name: workplaceNumber
 *        in: body
 *        required: true
 *        schema:
 *          type : string
 * 
 * 
 *    responses:
 *      '201':
 *        description: Workplace saved successfully
 *      '500':
 *        description: error saving Workplace
 * 
 */
router.post('/', (req, res) => {
    const workplace = new Workplace({
        name: req.body.name,
        machines: req.body.machines,
        workplaceNumber: req.body.workplaceNumber
    });


    workplace
        .save()
        .then(result => {
            res.status(201).json({
                message: "Workplace created!",
                result: result
            });
        })
        .catch(err => {
            console.log("error", err)
            res.status(500).json({
                error: err
            });
        });

})
/**
 * @swagger
 * /workplace/{workplaceNumber}/enter/{studentNumber}?token:
 *   post:
 *    summary: User Enter workplace
 *    description: User Enter workplace
 *    parameters:
 *      - name: workplaceKey
 *        in: params
 *        required: true
 *        description: workplace Number
 *        schema:
 *          type : string
 * 
 *      - name: studentKey
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
 *        description: Workplace entered by user successfully
 *      '500':
 *        description: error entering workplace
 * 
 */
router.post('/:workplaceId/enter/:rNumber', (req, res) => {

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

    const workplaceEnter = new WorkplaceEnter({
        workplaceKey: req.params.workplaceId,
        studentKey: req.params.rNumber,
    });

    workplaceEnter
        .save()
        .then(result => {
            res.status(201).json({
                message: "Workplace enter is posted successfully!",
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
const express = require('express');
const Machine = require('../models/Machine');
const Student = require('../models/Students');

const router = express.Router();
const Workplace = require('../models/Workplace');
const WorkplaceEnter = require('../models/WorkplaceEnter');

// Get all Workplaces
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


// Get specific Workplace
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



// POST Workplace
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

// POST Workplace Enter 
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

// Get Workplace machines
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

module.exports = router;
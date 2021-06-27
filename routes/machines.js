const express = require('express')
const router = express.Router();
const Machine = require('../models/Machine');
const MachineUse = require('../models/MachineUse');
const Student = require('../models/Students');

// Get all machines
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


// Get specific Machine
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



// POST Machine
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


// POST Machine Use 
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
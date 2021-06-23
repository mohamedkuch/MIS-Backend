const express = require('express')
const router = express.Router();
const Machine = require('../models/Machine');

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
        name : req.body.name,
        certificateKey : req.body.certificateKey,
        safetyCardURL : req.body.safetyCardURL
    });

    Machine
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


module.exports = router;
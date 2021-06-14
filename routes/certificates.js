const express = require('express')
const router = express.Router();
const Certificate = require('../models/Certificate');

// Get all certificates
router.get('/', (req, res) => {
    Certificate.find()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
})


// Get specific Certificate
router.get('/:id', (req, res) => {
    Certificate.findById(req.params.id)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

})



// POST Certificate
router.post('/', (req, res) => {
    const certificate = new Certificate({
        name : req.body.name,
        machineKey : req.body.machineKey,
        body : req.body.body,
        date : req.body.date
    });

    certificate
        .save()
        .then(result => {
            res.status(201).json({
                message: "Certificate created!",
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
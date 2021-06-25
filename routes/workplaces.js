const express = require('express')
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
    Workplace.findById(req.params.id)
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
        name : req.body.name,
        machines : req.body.machines,
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
router.post('/:workplaceId/enter/:rNumber', (req,res)=> {
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
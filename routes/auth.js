const express = require('express');
const router = express.Router();
const Student = require('../models/Students');


// Login 
router.post('/login', (req, res) => {
    let fetchedUser;
    Student.findOne({ "rNumber": req.body.rNumber, "lastName": req.body.lastName })
        .then((result) => {
            fetchedUser = result;

            if (!fetchedUser) {
                return res.status(401).json("No student found matching this credentials");
            } else {
                return res.status(200).json(result)
            }
        })
        .catch((error) => {
            res.status(401).json("Auth failed");
        });
})

module.exports = router;

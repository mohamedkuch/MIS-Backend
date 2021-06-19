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
                return res.status(401).json({
                    result: "No student found matching this credentials"
                });
            } else {
                return res.status(200).json({
                    message: "Login successful",
                    data : fetchedUser
                })
            }
        })
        .catch((error) => {
            res.status(401).json({
                message: "Auth failed"
            });
        });
})

module.exports = router;

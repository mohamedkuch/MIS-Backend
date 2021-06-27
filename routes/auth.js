const express = require('express');
const router = express.Router();
const Student = require('../models/Students');


/**
 * @swagger
 * /login:
 *   post:
 *    summary: User Login using credentials (rNumber,Last Name)
 *    description: User Login using credentials (rNumber,Last Name)
 *      
 *    parameters:
 *      - name: rNumber
 *        in: body
 *        required: true
 *        description: rNumber of the user
 *        schema:
 *          type : string
 * 
 *      - name: Last Name
 *        in: body
 *        required: true
 *        description: Last Name of the user
 *        schema:
 *          type : string
 * 
 *    responses:
 *      '200':
 *        description: User Logged in succeussfully
 *      '401':
 *        description: Authentication failed
 * 
 */
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

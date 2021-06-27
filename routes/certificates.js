const express = require('express')
const router = express.Router();
const Certificate = require('../models/Certificate');


/**
 * @swagger
 * /certificates:
 *   get:
 *    summary: Get all certificates
 *    description: Get all certificates
 *      
 *    responses:
 *      '201':
 *        description: Certificates are fetched successfully
 *      '500':
 *        description: Error fetching Certificates
 * 
 */
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

/**
 * @swagger
 * /certificate/{certificateId}:
 *   get:
 *    summary: Get specific certificate by certificateId 
 *    description: Get specific workplaces
 *    parameters:
 *      - name: certificateId
 *        in: params
 *        required: true
 *        description: certificate id
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




/**
 * @swagger
 * /certificates/:
 *   post:
 *    summary: Create new certificate
 *    description: Create new certificate
 *    parameters:
 *      - name: name
 *        in: body
 *        required: true
 *        description: certificate name
 *        schema:
 *          type : string
 * 
 *      - name: body
 *        in: body
 *        required: true
 *        description: certificate body
 *        schema:
 *          type: string
 * 
 *      - name: date
 *        in: body
 *        description: certificate date
 *        schema:
 *          type : date
 * 
 * 
 *    responses:
 *      '201':
 *        description: certificate created successfully
 *      '500':
 *        description: error creating certificate
 * 
 */
router.post('/', (req, res) => {
    const certificate = new Certificate({
        name : req.body.name,
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
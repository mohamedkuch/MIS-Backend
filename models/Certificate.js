const mongoose = require('mongoose')

const CertificateSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    body: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Certificates', CertificateSchema)
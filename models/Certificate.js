const mongoose = require('mongoose')

const CertificateSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    machineKey: {
        type: String,
        default: ""
    },
    body: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Certificate', CertificateSchema)
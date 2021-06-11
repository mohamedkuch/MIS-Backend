const mongoose = require('mongoose')

const CertificateSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    machineKey: {
        type: String,
        require: true,
    },
})

module.exports = mongoose.model('Certificate', CertificateSchema)
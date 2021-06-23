const mongoose = require('mongoose')

const MachineSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    certificateKey: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Certificates'
    },
    safetyCardURL: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Machines', MachineSchema)
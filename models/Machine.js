const mongoose = require('mongoose')

const MachineSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    certificateKey: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Certificates'
    }
})

module.exports = mongoose.model('Machines', MachineSchema)
const mongoose = require('mongoose')

const MachineUseSchema = mongoose.Schema({
    machineKey: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Machines',
        require: true
    },
    studentKey: {
        type: String,
        ref: 'Students',
        require: true,
        populate: { select: 'rNumber' }
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('MachineUse', MachineUseSchema)
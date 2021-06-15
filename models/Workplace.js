const mongoose = require('mongoose')

const WorkplaceSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    machines: [{
        machineId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Machines'
        }
    }]
})

module.exports = mongoose.model('Workplaces', WorkplaceSchema)
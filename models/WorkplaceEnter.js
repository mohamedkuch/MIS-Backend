const mongoose = require('mongoose')

const WorkplaceEnterSchema = mongoose.Schema({
    workplaceKey: {
        type: String,
        ref: 'Workplaces',
        require: true,
        populate: { select: 'workplaceNumber' }
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

module.exports = mongoose.model('WorkplaceEnter', WorkplaceEnterSchema)
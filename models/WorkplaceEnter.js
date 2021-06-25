const mongoose = require('mongoose')

const WorkplaceEnterSchema = mongoose.Schema({
    workplaceKey: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workplaces',
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

module.exports = mongoose.model('WorkplaceEnter', WorkplaceEnterSchema)
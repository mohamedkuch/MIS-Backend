const mongoose = require('mongoose')

const StudentSchema = mongoose.Schema({
    fullName: {
        type: String,
        require: true
    },
    tokenBase64: {
        type: String,
        require: true,
    },
    rNumber: {
        type: String,
        require: true
    },
    certificates: [{
        certId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Certificate'
        }
    }]
})

module.exports = mongoose.model('Students', StudentSchema)
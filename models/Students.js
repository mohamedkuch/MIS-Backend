const mongoose = require('mongoose')

const StudentSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    tokenBase64: {
        type: String,
        require: true,
        unique: true 
    },
    rNumber: {
        type: String,
        require: true,
        unique: true 
    },
    certificates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Certificates'
    }]
})

module.exports = mongoose.model('Students', StudentSchema)
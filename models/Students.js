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
})

module.exports = mongoose.model('Students', StudentSchema)
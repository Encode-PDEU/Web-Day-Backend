const mongoose= require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollNo: {
        type: String,
        required: true
    },
    score:{
        type:Number,
        required:true
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)
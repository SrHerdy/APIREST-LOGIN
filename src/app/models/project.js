const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


// Schema
    const Schema = mongoose.Schema

    const ProjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    task: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
 })

    const Project = mongoose.model('Project', ProjectSchema)

    module.exports = Project

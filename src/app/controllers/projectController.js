const express = require('express')

const router = express.Router()

const authMiddleware = require('../middlewares/auth')

const Projects = require('../models/project')
const Task = require('../models/task')
//rota

    router.use(authMiddleware)

    router.get('/', async (req, res)=> {
        try {
            const projects = await Projects.find().populate('user')
           
            res.send({ projects })

        } catch (err) {
            return res.status(400).send({ error: "Error loading projects"})
        }
    } )

    router.get('/:projectId', async (req, res) => {
        try {
            const project = await Projects.findById(req.params.projectId).populate(['user', 'tasks'])
           
            res.send({ project })

        } catch (err) {
            return res.status(400).send({ error: "Error loading project"})
        }
    })

    router.post('/', async (req, res) => {
       try {
            const { title, description, tasks } = req.body

            const project = await Projects.create({ title, description, user: req.userId })

           await Promise.all(tasks.map ( async task => {
                const projectTask = new Task ({ ...task, project: project._id })

                await projectTask.save() 
                project.task.push( projectTask )
            }))

                await project.save()

                return res.send({ Projects }) 
       
       } catch (err) {
            return res.status(400).send({ error: "Error creating new projects"})
       }
    })

    router.put('/:projectId', async (req, res) => {
        try {
            const { title, description, tasks } = req.body

            const project = await Projects.findByIdAndUpdate( req.params.projectId, {
                title,
                description 
            }, { new: true })

            project.tasks = []

            await Task.remove({ project: project._id })

           await Promise.all(tasks.map ( async task => {
                const projectTask = new Task ({ ...task, project: project._id })

                await projectTask.save() 
                project.tasks.push( projectTask )
            }))

                await project.save()

                return res.send({ Projects }) 
       
       } catch (err) {
            return res.status(400).send({ error: "Error updating projects"})
       }
    })

    router.put('/:projectId', async (req, res) => {
        res.send({ user: req.userId })
    })

    router.delete('/:projectId', async (req, res) => {
        try {
            await Projects.findByIdAndRemove(req.params.projectId)
           
            res.send()

        } catch (err) {
            return res.status(400).send({ error: "Error deleting project"})
        }
    })

module.exports = app => app.use('/projects', router)

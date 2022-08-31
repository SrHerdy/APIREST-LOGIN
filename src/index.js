const express = require('express')
const app = express()
const {mongoose} = require('./database/index')

// Encoder URL
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))

// Controle de Autenticação
    require('./app/controllers/index')(app)

// Hospedar serivor
    const PORT = 7777
    app.listen(PORT, () => {console.log('API rodando!')})
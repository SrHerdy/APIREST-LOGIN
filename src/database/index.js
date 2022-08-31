const mongoose = require('mongoose')

//connect

    mongoose.connect('mongodb://localhost/noderest').then(() =>{console.log('Banco de Dados conectado!')})
    .catch((err) => {console.log('falha ao se conectar com o Mongo: '+ err);})


module.exports = mongoose
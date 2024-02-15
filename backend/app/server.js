const express = require('express');

const cors = require('cors');
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

class Server {

    constructor() {
        this.app = express();
        this.usuariosPath = '/api';

        //Middlewares
        this.middlewares();

        this.conectarMongoose();

        this.routes();
        
    }

    conectarMongoose() {
        mongoose.connect('mongodb://' + process.env.DB_URL + ':' + process.env.DB_PORT + '/' + process.env.DB_DATABASE, { // la ruta de conexión es: mongodb://localhost:27017/ejemplo
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        this.db = mongoose.connection;
        this.db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
        this.db.once('open', () => {console.log('Conexión exitosa a MongoDB');});
    }

    middlewares() {

        this.app.use(cors());

        this.app.use(express.json());

    }

    routes(){
        this.app.use(this.usuariosPath , require('../routes/usuarioRoutes'));
        this.app.use(this.usuariosPath , require('../routes/tareaRoutes'));
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor escuchando en: ${process.env.PORT}`);
        })
    }
}

module.exports = Server;
const express = require('express');

const cors = require('cors');
class Server {

    constructor() {
        this.app = express();
        this.usuariosPath = '/api';

        //Middlewares
        this.middlewares();

        this.routes();
        
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
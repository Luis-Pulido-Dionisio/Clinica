import express, {  Application } from 'express';
import routesPacientes from '../routes/paciente.routes';
import connection from '../db/connection';

class Server {
    private app: Application;
    private port: string;


    constructor(){
        this.app = express();
        this.port = process.env.PORT || '4000';
        this.middlewares();
        this.routes();
        this.conectarDB();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicacion corriendo por el puerto', this.port);
        })
    }

    middlewares(){
        this.app.use(express.json());
    }

    routes(){
        this.app.use('/api/pacientes', routesPacientes);
    }

    conectarDB(){
        connection.connect((err)=> {
            if(err) throw err;
            console.log('Conectado a la base de datos')
        })
    }
}

export default Server;
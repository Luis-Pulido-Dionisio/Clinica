import express, {  Application } from 'express';
import routesPacientes from '../routes/paciente.routes';
import routesDoctores from '../routes/doctores.routes';
import routesConsultas from '../routes/consultas.routes';
import routesLaboratorios from '../routes/laboratorios.routes';
import routesAnalisis from '../routes/analisis.routes';
import connection from '../db/connection';
import cors from 'cors';

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
        //Cors
        this.app.use(cors());
    }

    routes(){
        this.app.use('/api/pacientes', routesPacientes);
        this.app.use('/api/doctores', routesDoctores);
        this.app.use('/api/consultas', routesConsultas);
        this.app.use('/api/laboratorios', routesLaboratorios);
        this.app.use('/api/analisis', routesAnalisis);
    }

    conectarDB(){
        connection.connect((err)=> {
            if(err) throw err;
            console.log('Conectado a la base de datos')
        })
    }
}

export default Server;
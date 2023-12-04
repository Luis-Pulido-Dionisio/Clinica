"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paciente_routes_1 = __importDefault(require("../routes/paciente.routes"));
const doctores_routes_1 = __importDefault(require("../routes/doctores.routes"));
const consultas_routes_1 = __importDefault(require("../routes/consultas.routes"));
const laboratorios_routes_1 = __importDefault(require("../routes/laboratorios.routes"));
const analisis_routes_1 = __importDefault(require("../routes/analisis.routes"));
const connection_1 = __importDefault(require("../db/connection"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '4000';
        this.middlewares();
        this.routes();
        this.conectarDB();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicacion corriendo por el puerto', this.port);
        });
    }
    middlewares() {
        this.app.use(express_1.default.json());
        //Cors
        this.app.use((0, cors_1.default)());
    }
    routes() {
        this.app.use('/api/pacientes', paciente_routes_1.default);
        this.app.use('/api/doctores', doctores_routes_1.default);
        this.app.use('/api/consultas', consultas_routes_1.default);
        this.app.use('/api/laboratorios', laboratorios_routes_1.default);
        this.app.use('/api/analisis', analisis_routes_1.default);
    }
    conectarDB() {
        connection_1.default.connect((err) => {
            if (err)
                throw err;
            console.log('Conectado a la base de datos');
        });
    }
}
exports.default = Server;

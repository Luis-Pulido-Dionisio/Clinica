import Server from "./models/server";
import dotenv from 'dotenv';

//Configuramos
dotenv.config();

const server = new Server();

server.listen();
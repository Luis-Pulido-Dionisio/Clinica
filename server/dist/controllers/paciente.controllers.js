"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putPaciente = exports.postPaciente = exports.deletePaciente = exports.getPaciente = exports.getPacientes = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const getPacientes = (req, res) => {
    connection_1.default.query('SELECT * FROM pacientes', (err, data) => {
        if (err)
            throw err;
        res.json(data);
    });
    /*res.json({
        msg:"getPacientes"
    })*/
};
exports.getPacientes = getPacientes;
const getPaciente = (req, res) => {
    const { idPacientes } = req.params;
    connection_1.default.query('SELECT * FROM pacientes WHERE idPacientes = ?', idPacientes, (err, data) => {
        if (err)
            throw err;
        res.json(data[0]);
    });
    /*res.json({
        msg:"getPaciente",
        id: id
    })*/
};
exports.getPaciente = getPaciente;
const deletePaciente = (req, res) => {
    const { idPacientes } = req.params;
    connection_1.default.query('DELETE FROM pacientes WHERE idPacientes = ?', idPacientes, (err, data) => {
        if (err)
            throw err;
        res.json({
            msg: 'Persona elimina con exito'
        });
    });
    /* res.json({
         msg:"deletePaciente",
         idPacientes: idPacientes
     })*/
};
exports.deletePaciente = deletePaciente;
const postPaciente = (req, res) => {
    //console.log(req.body);
    const { body } = req;
    connection_1.default.query('INSERT INTO pacientes set ?', [body], (err, data) => {
        if (err)
            throw err;
        res.json({
            msg: 'Persona agregada con exito'
        });
    });
    /*res.json({
        msg:"postPaciente",
        body: body
    })*/
};
exports.postPaciente = postPaciente;
const putPaciente = (req, res) => {
    const { body } = req;
    const { idPacientes } = req.params;
    connection_1.default.query('UPDATE pacientes set ? WHERE idPacientes = ?', [body, idPacientes], (err, data) => {
        if (err)
            throw err;
        res.json({
            msg: 'Persona actualizada con exito'
        });
    });
    /*res.json({
        msg:"putPaciente",
        body: body,
        idPacientes : idPacientes
    })*/
};
exports.putPaciente = putPaciente;

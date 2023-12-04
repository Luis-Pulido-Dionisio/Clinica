"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putConsulta = exports.postConsulta = exports.deleteConsulta = exports.getConsulta = exports.getConsultas = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const getConsultas = (req, res) => {
    connection_1.default.query('SELECT * FROM consultas', (err, data) => {
        if (err)
            throw err;
        res.json(data);
    });
};
exports.getConsultas = getConsultas;
const getConsulta = (req, res) => {
    const { idConsultas } = req.params;
    connection_1.default.query('SELECT * FROM consultas WHERE idConsultas = ?', idConsultas, (err, data) => {
        if (err)
            throw err;
        res.json(data[0]);
    });
};
exports.getConsulta = getConsulta;
const deleteConsulta = (req, res) => {
    const { idConsultas } = req.params;
    connection_1.default.query('DELETE FROM consultas WHERE idConsultas = ?', idConsultas, (err, data) => {
        if (err)
            throw err;
        res.json({
            msg: 'Consulta eliminada con exito'
        });
    });
};
exports.deleteConsulta = deleteConsulta;
const postConsulta = (req, res) => {
    //console.log(req.body);
    const { body } = req;
    connection_1.default.query('INSERT INTO consultas set ?', [body], (err, data) => {
        if (err)
            throw err;
        res.json({
            msg: 'Consulta agregada con exito'
        });
    });
};
exports.postConsulta = postConsulta;
const putConsulta = (req, res) => {
    const { body } = req;
    const { idConsultas } = req.params;
    connection_1.default.query('UPDATE consultas set ? WHERE idConsultas = ?', [body, idConsultas], (err, data) => {
        if (err)
            throw err;
        res.json({
            msg: 'Consulta actualizada con exito'
        });
    });
};
exports.putConsulta = putConsulta;

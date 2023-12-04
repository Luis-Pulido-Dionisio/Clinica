"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putAnalisis = exports.postAnalisis = exports.deleteAnalisis = exports.getAnalisis = exports.getAnalisis_Lab = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const getAnalisis_Lab = (req, res) => {
    connection_1.default.query('SELECT * FROM analisis', (err, data) => {
        if (err)
            throw err;
        res.json(data);
    });
};
exports.getAnalisis_Lab = getAnalisis_Lab;
const getAnalisis = (req, res) => {
    const { idAnalisis } = req.params;
    connection_1.default.query('SELECT * FROM analisis WHERE idAnalisis = ?', idAnalisis, (err, data) => {
        if (err)
            throw err;
        res.json(data[0]);
    });
};
exports.getAnalisis = getAnalisis;
const deleteAnalisis = (req, res) => {
    const { idAnalisis } = req.params;
    connection_1.default.query('DELETE FROM analisis WHERE idAnalisis = ?', idAnalisis, (err, data) => {
        if (err)
            throw err;
        res.json({
            msg: 'Analisis eliminado con exito'
        });
    });
};
exports.deleteAnalisis = deleteAnalisis;
const postAnalisis = (req, res) => {
    //console.log(req.body);
    const { body } = req;
    connection_1.default.query('INSERT INTO analisis set ?', [body], (err, data) => {
        if (err)
            throw err;
        res.json({
            msg: 'Analisis agregado con exito'
        });
    });
};
exports.postAnalisis = postAnalisis;
const putAnalisis = (req, res) => {
    const { body } = req;
    const { idAnalisis } = req.params;
    connection_1.default.query('UPDATE analisis set ? WHERE idAnalisis = ?', [body, idAnalisis], (err, data) => {
        if (err)
            throw err;
        res.json({
            msg: 'Analisis actualizado con exito'
        });
    });
};
exports.putAnalisis = putAnalisis;

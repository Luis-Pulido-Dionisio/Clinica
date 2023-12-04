"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putLaboratorio = exports.postLaboratorio = exports.deleteLaboratorio = exports.getLaboratorio = exports.getLaboratorios = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const getLaboratorios = (req, res) => {
    connection_1.default.query('SELECT * FROM laboratorios', (err, data) => {
        if (err)
            throw err;
        res.json(data);
    });
};
exports.getLaboratorios = getLaboratorios;
const getLaboratorio = (req, res) => {
    const { idLaboratorios } = req.params;
    connection_1.default.query('SELECT * FROM laboratorios WHERE idLaboratorios = ?', idLaboratorios, (err, data) => {
        if (err)
            throw err;
        res.json(data[0]);
    });
};
exports.getLaboratorio = getLaboratorio;
const deleteLaboratorio = (req, res) => {
    const { idLaboratorios } = req.params;
    connection_1.default.query('DELETE FROM laboratorios WHERE idLaboratorios = ?', idLaboratorios, (err, data) => {
        if (err)
            throw err;
        res.json({
            msg: 'Laboratorio eliminado con exito'
        });
    });
};
exports.deleteLaboratorio = deleteLaboratorio;
const postLaboratorio = (req, res) => {
    //console.log(req.body);
    const { body } = req;
    connection_1.default.query('INSERT INTO laboratorios set ?', [body], (err, data) => {
        if (err)
            throw err;
        res.json({
            msg: 'Laboratorio agregado con exito'
        });
    });
};
exports.postLaboratorio = postLaboratorio;
const putLaboratorio = (req, res) => {
    const { body } = req;
    const { idLaboratorios } = req.params;
    connection_1.default.query('UPDATE laboratorios set ? WHERE idLaboratorios = ?', [body, idLaboratorios], (err, data) => {
        if (err)
            throw err;
        res.json({
            msg: 'Laboratorio actualizado con exito'
        });
    });
};
exports.putLaboratorio = putLaboratorio;

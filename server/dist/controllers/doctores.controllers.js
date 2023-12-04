"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putDoctor = exports.postDoctor = exports.deleteDoctor = exports.getDoctor = exports.getDoctores = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const getDoctores = (req, res) => {
    connection_1.default.query('SELECT * FROM doctores', (err, data) => {
        if (err)
            throw err;
        res.json(data);
    });
    /*res.json({
        msg:"getDoctores"
    })*/
};
exports.getDoctores = getDoctores;
const getDoctor = (req, res) => {
    const { idDoctores } = req.params;
    connection_1.default.query('SELECT * FROM doctores WHERE idDoctores = ?', idDoctores, (err, data) => {
        if (err)
            throw err;
        res.json(data[0]);
    });
};
exports.getDoctor = getDoctor;
const deleteDoctor = (req, res) => {
    const { idDoctores } = req.params;
    connection_1.default.query('DELETE FROM doctores WHERE idDoctores = ?', idDoctores, (err, data) => {
        if (err)
            throw err;
        res.json({
            msg: 'Doctor eliminado con exito'
        });
    });
};
exports.deleteDoctor = deleteDoctor;
const postDoctor = (req, res) => {
    //console.log(req.body);
    const { body } = req;
    connection_1.default.query('INSERT INTO doctores set ?', [body], (err, data) => {
        if (err)
            throw err;
        res.json({
            msg: 'Doctor agregada con exito'
        });
    });
};
exports.postDoctor = postDoctor;
const putDoctor = (req, res) => {
    const { body } = req;
    const { idDoctores } = req.params;
    connection_1.default.query('UPDATE doctores set ? WHERE idDoctores = ?', [body, idDoctores], (err, data) => {
        if (err)
            throw err;
        res.json({
            msg: 'Doctor actualizada con exito'
        });
    });
};
exports.putDoctor = putDoctor;

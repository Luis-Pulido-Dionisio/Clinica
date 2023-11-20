import { Request, Response } from 'express';
import connection from '../db/connection';

export const getPacientes = ( req:Request, res:Response) => {
    connection.query('SELECT * FROM pacientes', (err, data) => {
        if(err) throw err;
        res.json(data)
    })
    /*res.json({
        msg:"getPacientes"
    })*/
}

export const getPaciente = ( req:Request, res:Response) => {

    const {idPacientes} = req.params;
    connection.query('SELECT * FROM pacientes WHERE idPacientes = ?',idPacientes, (err, data) => {
        if(err) throw err;
        res.json(data[0])
    })
    /*res.json({
        msg:"getPaciente",
        id: id
    })*/
}

export const deletePaciente = ( req:Request, res:Response) => {
    
    const {idPacientes} = req.params;
    connection.query('DELETE FROM pacientes WHERE idPacientes = ?',idPacientes, (err, data) =>{
        if(err) throw err;
        res.json({
            msg: 'Persona elimina con exito'
        })
    })

   /* res.json({
        msg:"deletePaciente",
        idPacientes: idPacientes
    })*/
}


export const postPaciente = ( req:Request, res:Response) => {
    //console.log(req.body);
    const { body } = req;
    connection.query('INSERT INTO pacientes set ?',[body], (err, data) =>{
        if(err) throw err;
        res.json({
            msg: 'Persona agregada con exito'
        })
    })
    /*res.json({
        msg:"postPaciente",
        body: body
    })*/
}

export const putPaciente = ( req:Request, res:Response) => {
    
    const { body } = req;
    const { idPacientes } = req.params;

    connection.query('UPDATE pacientes set ? WHERE idPacientes = ?', [body, idPacientes], (err, data) => {
        if(err) throw err;
        res.json({
            msg: 'Persona actualizada con exito'
        })
    })
    /*res.json({
        msg:"putPaciente",
        body: body,
        idPacientes : idPacientes
    })*/
}
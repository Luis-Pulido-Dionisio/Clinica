import { Request, Response } from 'express';
import connection from '../db/connection';

export const getLaboratorios = ( req:Request, res:Response) => {
    connection.query('SELECT * FROM laboratorios', (err, data) => {
        if(err) throw err;
        res.json(data)
    })
}

export const getLaboratorio = ( req:Request, res:Response) => {

    const {idLaboratorios} = req.params;
    connection.query('SELECT * FROM laboratorios WHERE idLaboratorios = ?',idLaboratorios, (err, data) => {
        if(err) throw err;
        res.json(data[0])
    })

}

export const deleteLaboratorio = ( req:Request, res:Response) => {
    
    const {idLaboratorios} = req.params;
    connection.query('DELETE FROM laboratorios WHERE idLaboratorios = ?',idLaboratorios, (err, data) =>{
        if(err) throw err;
        res.json({
            msg: 'Laboratorio eliminado con exito'
        })
    })

   
}


export const postLaboratorio = ( req:Request, res:Response) => {
    //console.log(req.body);
    const { body } = req;
    connection.query('INSERT INTO laboratorios set ?',[body], (err, data) =>{
        if(err) throw err;
        res.json({
            msg: 'Laboratorio agregado con exito'
        })
    })

}

export const putLaboratorio = ( req:Request, res:Response) => {
    
    const { body } = req;
    const { idLaboratorios } = req.params;

    connection.query('UPDATE laboratorios set ? WHERE idLaboratorios = ?', [body, idLaboratorios], (err, data) => {
        if(err) throw err;
        res.json({
            msg: 'Laboratorio actualizado con exito'
        })
    })
    
}
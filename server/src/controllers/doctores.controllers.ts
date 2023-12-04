import { Request, Response } from 'express';
import connection from '../db/connection';

export const getDoctores = ( req:Request, res:Response) => {
    connection.query('SELECT * FROM doctores', (err, data) => {
        if(err) throw err;
        res.json(data)
    })
    /*res.json({
        msg:"getDoctores"
    })*/
}

export const getDoctor = ( req:Request, res:Response) => {

    const {idDoctores} = req.params;
    connection.query('SELECT * FROM doctores WHERE idDoctores = ?',idDoctores, (err, data) => {
        if(err) throw err;
        res.json(data[0])
    })
}

export const deleteDoctor = ( req:Request, res:Response) => {
    
    const {idDoctores} = req.params;
    connection.query('DELETE FROM doctores WHERE idDoctores = ?',idDoctores, (err, data) =>{
        if(err) throw err;
        res.json({
            msg: 'Doctor eliminado con exito'
        })
    })
}


export const postDoctor = ( req:Request, res:Response) => {
    //console.log(req.body);
    const { body } = req;
    connection.query('INSERT INTO doctores set ?',[body], (err, data) =>{
        if(err) throw err;
        res.json({
            msg: 'Doctor agregada con exito'
        })
    })

}

export const putDoctor = ( req:Request, res:Response) => {
    
    const { body } = req;
    const { idDoctores } = req.params;

    connection.query('UPDATE doctores set ? WHERE idDoctores = ?', [body, idDoctores], (err, data) => {
        if(err) throw err;
        res.json({
            msg: 'Doctor actualizada con exito'
        })
    })
}
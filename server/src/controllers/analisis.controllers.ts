import { Request, Response } from 'express';
import connection from '../db/connection';

export const getAnalisis_Lab = ( req:Request, res:Response) => {
    connection.query('SELECT * FROM analisis', (err, data) => {
        if(err) throw err;
        res.json(data)
    })
}

export const getAnalisis = ( req:Request, res:Response) => {

    const {idAnalisis} = req.params;
    connection.query('SELECT * FROM analisis WHERE idAnalisis = ?',idAnalisis, (err, data) => {
        if(err) throw err;
        res.json(data[0])
    })

}

export const deleteAnalisis = ( req:Request, res:Response) => {
    
    const {idAnalisis} = req.params;
    connection.query('DELETE FROM analisis WHERE idAnalisis = ?',idAnalisis, (err, data) =>{
        if(err) throw err;
        res.json({
            msg: 'Analisis eliminado con exito'
        })
    })

   
}


export const postAnalisis = ( req:Request, res:Response) => {
    //console.log(req.body);
    const { body } = req;
    connection.query('INSERT INTO analisis set ?',[body], (err, data) =>{
        if(err) throw err;
        res.json({
            msg: 'Analisis agregado con exito'
        })
    })

}

export const putAnalisis = ( req:Request, res:Response) => {
    
    const { body } = req;
    const { idAnalisis } = req.params;

    connection.query('UPDATE analisis set ? WHERE idAnalisis = ?', [body, idAnalisis], (err, data) => {
        if(err) throw err;
        res.json({
            msg: 'Analisis actualizado con exito'
        })
    })
    
}
import { Request, Response } from 'express';
import connection from '../db/connection';

export const getConsultas = ( req:Request, res:Response) => {
    connection.query('SELECT * FROM consultas', (err, data) => {
        if(err) throw err;
        res.json(data)
    })
}

export const getConsulta = ( req:Request, res:Response) => {

    const {idConsultas} = req.params;
    connection.query('SELECT * FROM consultas WHERE idConsultas = ?',idConsultas, (err, data) => {
        if(err) throw err;
        res.json(data[0])
    })
}

export const deleteConsulta = ( req:Request, res:Response) => {
    
    const {idConsultas} = req.params;
    connection.query('DELETE FROM consultas WHERE idConsultas = ?',idConsultas, (err, data) =>{
        if(err) throw err;
        res.json({
            msg: 'Consulta eliminada con exito'
        })
    })
}


export const postConsulta = ( req:Request, res:Response) => {
    //console.log(req.body);
    const { body } = req;
    connection.query('INSERT INTO consultas set ?',[body], (err, data) =>{
        if(err) throw err;
        res.json({
            msg: 'Consulta agregada con exito'
        })
    })

}

export const putConsulta = ( req:Request, res:Response) => {
    
    const { body } = req;
    const { idConsultas } = req.params;

    connection.query('UPDATE consultas set ? WHERE idConsultas = ?', [body, idConsultas], (err, data) => {
        if(err) throw err;
        res.json({
            msg: 'Consulta actualizada con exito'
        })
    })

}
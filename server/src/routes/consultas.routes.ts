import { Router } from 'express';
import { getConsultas, getConsulta, deleteConsulta, postConsulta, putConsulta } from '../controllers/consultas.controllers';

const router = Router();

router.get('/', getConsultas);
router.get('/:idConsultas', getConsulta);
router.delete('/:idConsultas',deleteConsulta);
router.post('/',postConsulta);
router.put('/:idConsultas',putConsulta);

export default router;
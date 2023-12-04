import { Router } from 'express';
import { getAnalisis_Lab, getAnalisis, deleteAnalisis, postAnalisis, putAnalisis } from '../controllers/analisis.controllers';

const router = Router();

router.get('/', getAnalisis_Lab);
router.get('/:idAnalisis', getAnalisis);
router.delete('/:idAnalisis',deleteAnalisis);
router.post('/',postAnalisis);
router.put('/:idAnalisis',putAnalisis);

export default router;
import { Router } from 'express';
import { getDoctores, getDoctor, deleteDoctor, postDoctor, putDoctor } from '../controllers/doctores.controllers';

const router = Router();

router.get('/', getDoctores);
router.get('/:idDoctores', getDoctor);
router.delete('/:idDoctores',deleteDoctor);
router.post('/',postDoctor);
router.put('/:idDoctores', putDoctor);


export default router;
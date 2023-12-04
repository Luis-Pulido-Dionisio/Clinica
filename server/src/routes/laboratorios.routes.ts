import { Router } from 'express';
import { deleteLaboratorio, getLaboratorio, getLaboratorios, postLaboratorio, putLaboratorio } from '../controllers/laboratorios.controllers';

const router = Router();

router.get('/', getLaboratorios);
router.get('/:idLaboratorios', getLaboratorio);
router.delete('/:idLaboratorios',deleteLaboratorio);
router.post('/',postLaboratorio);
router.put('/:idLaboratorios',putLaboratorio);

export default router;
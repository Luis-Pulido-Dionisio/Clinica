import { Router } from 'express';
import { getPacientes, getPaciente, deletePaciente, postPaciente, putPaciente } from '../controllers/paciente.controllers';

const router = Router();

router.get('/', getPacientes);
router.get('/:idPacientes', getPaciente);
router.delete('/:idPacientes',deletePaciente);
router.post('/',postPaciente);
router.put('/:idPacientes',putPaciente);

export default router;
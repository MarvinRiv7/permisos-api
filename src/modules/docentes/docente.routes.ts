import { Router } from 'express';
import {
  docentesDelete,
  docentesget,
  docentesPost,
  docentesPut,
} from './docente.controller';

const router = Router();

router.get('/', docentesget);
router.post('/', docentesPost);
router.put('/:id', docentesPut);
router.delete('/:id', docentesDelete);

export default router;

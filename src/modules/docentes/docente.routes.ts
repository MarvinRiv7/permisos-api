import { Router } from 'express';
import {
  docentesDelete,
  docentesget,
  docentesPost,
  docentesPut,
} from './docente.controller';
import { check } from 'express-validator';
import { validarCampos } from '../../middlewares/validar-campos';
import { existeDocentePorId, existeNombre } from '../../utils/db-validators';

const router = Router();

router.get('/', docentesget);
router.post(
  '/',
  [
    check('nombre').custom(existeNombre),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  docentesPost,
);
router.put(
  '/:id',
  [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeDocentePorId),
    validarCampos,
  ],
  docentesPut,
);
router.delete(
  '/:id',
  [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeDocentePorId),
    validarCampos,
  ],
  docentesDelete,
);

export default router;

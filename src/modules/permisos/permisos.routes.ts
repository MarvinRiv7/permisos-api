import { Router } from 'express';
import {
  actualizarPermiso,
  crearPermiso,
  eliminarPermiso,
  getPermiso,
  getPermisos,
  getPermisosPorDocenteYMes,
} from './permisos.controller';
import { validarCampos } from '../../middlewares/validar-campos';
import { check } from 'express-validator';
import {
  existeDocentePorId,
  existePermisoPoId,
} from '../../utils/db-validators';

const router = Router();
//Obtener todos los permisos
router.get('/', getPermisos);
//Obtener permisos por docente
router.get(
  '/:id',
  [
    check('id', 'No es un id valido').custom(existePermisoPoId),
    check('id', 'No es un id valido').isMongoId(),
    validarCampos,
  ],
  getPermiso,
);

router.get(
  '/por-docente/:id',
  [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeDocentePorId),
    validarCampos,
  ],
  getPermisosPorDocenteYMes,
);
//Crear Permiso
router.post(
  '/',
  [
    check('nombreDocente').custom(existeDocentePorId),
    check('turno', 'El turno es obligatorio').not().isEmpty(),
    check('fechaPermiso', 'La fecha del permiso es obligatoria')
      .not()
      .isEmpty(),
    check('CGS', 'El campo CGS es obligatorio').not().isEmpty(),
    check('autoridadConcede', 'La autoridad que concede es obligatoria')
      .not()
      .isEmpty(),
    check('tiempo', 'El tiempo debe ser al menos 1 día').not().isEmpty(),
    check('motivo', 'El motivo del permiso es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  crearPermiso,
);
//Actualizar Permiso
router.put(
  '/:id',
  [
    check('turno', 'El turno es obligatorio').not().isEmpty(),
    check('tiempo', 'El tiempo debe ser al menos 1').isInt({ min: 1 }),
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existePermisoPoId),
    validarCampos,
  ],
  actualizarPermiso
);
//Eliminar Permiso
router.delete(
  '/:id',
  [
    check('id', 'No es un id valido').custom(existePermisoPoId),
    check('id', 'No es un id valido').isMongoId(),
    validarCampos,
  ],
  eliminarPermiso,
);

export default router;

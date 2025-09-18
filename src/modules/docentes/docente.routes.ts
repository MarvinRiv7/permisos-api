import { Router } from 'express';
import {
  docentesDelete,
  docentesget,
  docentesPost,
  docentesPut,
} from './docente.controller';
import { check } from 'express-validator';
import { validarCampos } from '../../middlewares/validar-campos';
import { existeDocentePorId, existeNIP } from '../../utils/db-validators';

const router = Router();

router.get('/', docentesget);
router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('apellido', 'El apellido es obligatorio').notEmpty(),
    check('nivel', 'El nivel es obligatorio y debe de ser 1 o 2')
      .notEmpty()
      .isInt({ min: 1, max: 2 }),
    check(
      'categoria',
      'La categoría es obligatoria y debe de ser numeros mayaores a 0',
    )
      .notEmpty()
      .isInt({ min: 1 }),
    check('nip')
      .notEmpty()
      .matches(/^\d{6,10}$/)
      .withMessage('El NIP debe tener entre 6 y 10 dígitos numéricos')
      .withMessage('El NIP solo debe contener números')
      .custom(existeNIP),

    check('year')
      .notEmpty()
      .withMessage('El año es obligatorio')
      .isInt({ min: 1990 })
      .withMessage('El año debe ser mayor o igual a 1990'),
    check('partidas')
      .notEmpty()
      .withMessage('El número de partidas es obligatorio')
      .matches(/^[0-9,]+$/)
      .withMessage('Solo números y comas permitidas'),

    check('subPartidas')
      .notEmpty()
      .withMessage('El número de subpartidas es obligatorio')
      .matches(/^[0-9,]+$/)
      .withMessage('Solo números y comas permitidas'),

    check('fechaIngreso', 'La fecha de ingreso es obligatoria').not().isEmpty(),
    check('especialidad', 'La especialidad es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  docentesPost,
);
router.put(
  '/:id',
  [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeDocentePorId),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('apellido', 'El apellido es obligatorio').notEmpty(),
    check('nivel', 'El nivel es obligatorio y debe de ser 1 o 2')
      .notEmpty()
      .isInt({ min: 1, max: 2 }),
    check(
      'categoria',
      'La categoría es obligatoria y debe de ser numeros mayores a 0',
    )
      .notEmpty()
      .isInt({ min: 1 }),
    check('nip')
      .notEmpty()
      .matches(/^\d{6,10}$/)
      .withMessage('El NIP debe tener entre 6 y 10 dígitos numéricos'),
    check('year').notEmpty().isInt({ min: 1990 }),
    check('partidas')
      .notEmpty()
      .matches(/^[0-9,]+$/),
    check('subPartidas')
      .notEmpty()
      .matches(/^[0-9,]+$/),
    check('fechaIngreso', 'La fecha de ingreso es obligatoria').notEmpty(),
    check('especialidad', 'La especialidad es obligatoria').notEmpty(),
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

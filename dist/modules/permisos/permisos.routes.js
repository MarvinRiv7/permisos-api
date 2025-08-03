"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const permisos_controller_1 = require("./permisos.controller");
const validar_campos_1 = require("../../middlewares/validar-campos");
const express_validator_1 = require("express-validator");
const db_validators_1 = require("../../utils/db-validators");
const router = (0, express_1.Router)();
//Obtener todos los permisos
router.get('/', permisos_controller_1.getPermisos);
//Obtener permisos por docente
router.get('/:id', [
    (0, express_validator_1.check)('id', 'No es un id valido').custom(db_validators_1.existePermisoPoId),
    (0, express_validator_1.check)('id', 'No es un id valido').isMongoId(),
    validar_campos_1.validarCampos,
], permisos_controller_1.getPermiso);
router.get('/por-docente/:id', [
    (0, express_validator_1.check)('id', 'No es un id válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existeDocentePorId),
    validar_campos_1.validarCampos,
], permisos_controller_1.getPermisosPorDocenteYMes);
//Crear Permiso
router.post('/', [
    (0, express_validator_1.check)('nombreDocente').custom(db_validators_1.existeDocentePorId),
    (0, express_validator_1.check)('turno', 'El turno es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('fechaPermiso', 'La fecha del permiso es obligatoria')
        .not()
        .isEmpty(),
    (0, express_validator_1.check)('CGS', 'El campo CGS es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('autoridadConcede', 'La autoridad que concede es obligatoria')
        .not()
        .isEmpty(),
    (0, express_validator_1.check)('tiempo', 'El tiempo debe ser al menos 1 día').not().isEmpty(),
    (0, express_validator_1.check)('motivo', 'El motivo del permiso es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos,
], permisos_controller_1.crearPermiso);
//Actualizar Permiso
router.put('/:id', [
    (0, express_validator_1.check)('turno', 'El turno es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('tiempo', 'El tiempo debe ser al menos 1').isInt({ min: 1 }),
    (0, express_validator_1.check)('id', 'No es un id válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existePermisoPoId),
    validar_campos_1.validarCampos,
], permisos_controller_1.actualizarPermiso);
//Eliminar Permiso
router.delete('/:id', [
    (0, express_validator_1.check)('id', 'No es un id valido').custom(db_validators_1.existePermisoPoId),
    (0, express_validator_1.check)('id', 'No es un id valido').isMongoId(),
    validar_campos_1.validarCampos,
], permisos_controller_1.eliminarPermiso);
exports.default = router;
//# sourceMappingURL=permisos.routes.js.map
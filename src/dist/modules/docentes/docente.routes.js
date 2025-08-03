"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const docente_controller_1 = require("./docente.controller");
const express_validator_1 = require("express-validator");
const validar_campos_1 = require("../../middlewares/validar-campos");
const db_validators_1 = require("../../utils/db-validators");
const router = (0, express_1.Router)();
router.get('/', docente_controller_1.docentesget);
router.post('/', [
    (0, express_validator_1.check)('nombre').custom(db_validators_1.existeNombre),
    (0, express_validator_1.check)('apellido', 'El apellido es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos,
], docente_controller_1.docentesPost);
router.put('/:id', [
    (0, express_validator_1.check)('id', 'No es un id valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.existeDocentePorId),
    validar_campos_1.validarCampos,
], docente_controller_1.docentesPut);
router.delete('/:id', docente_controller_1.docentesDelete);
exports.default = router;
//# sourceMappingURL=docente.routes.js.map
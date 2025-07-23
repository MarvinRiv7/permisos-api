"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const docente_controller_1 = require("./docente.controller");
const router = (0, express_1.Router)();
router.get('/', docente_controller_1.docentesget);
router.post('/', docente_controller_1.docentesPost);
router.put('/:id', docente_controller_1.docentesPut);
router.delete('/:id', docente_controller_1.docentesDelete);
exports.default = router;
//# sourceMappingURL=docente.routes.js.map
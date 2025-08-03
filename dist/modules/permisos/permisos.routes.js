"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const permisos_controller_1 = require("./permisos.controller");
const router = (0, express_1.Router)();
router.get('/', permisos_controller_1.getPermisos);
exports.default = router;
//# sourceMappingURL=permisos.routes.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const docente_routes_1 = __importDefault(require("./docentes/docente.routes"));
const permisos_routes_1 = __importDefault(require("./permisos/permisos.routes"));
const router = (0, express_1.Router)();
router.use('/docentes', docente_routes_1.default);
router.use('/permisos', permisos_routes_1.default);
exports.default = router;
//# sourceMappingURL=modules.routes.js.map
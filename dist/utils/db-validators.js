"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.existePermisoPoId = exports.existeDocentePorId = exports.existeNombre = void 0;
const docente_models_1 = require("../modules/docentes/docente.models");
const permisos_models_1 = require("../modules/permisos/permisos.models");
const existeNombre = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (nombre = '') {
    const nombreExiste = yield docente_models_1.Docente.findOne({ nombre });
    if (nombreExiste) {
        throw new Error(`El nombre ${nombre} ya está registrado`);
    }
});
exports.existeNombre = existeNombre;
const existeDocentePorId = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (id = '') {
    const existeDocente = yield docente_models_1.Docente.findById(id);
    if (!existeDocente) {
        throw new Error(`El docente con el id: ${id} no existe`);
    }
});
exports.existeDocentePorId = existeDocentePorId;
const existePermisoPoId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existePermiso = yield permisos_models_1.Permiso.findById(id);
    if (!existePermiso) {
        throw new Error(`El id: ${id} no existe`);
    }
});
exports.existePermisoPoId = existePermisoPoId;
//# sourceMappingURL=db-validators.js.map
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPermisosPorDocenteYMes = exports.eliminarPermiso = exports.actualizarPermiso = exports.crearPermiso = exports.getPermiso = exports.getPermisos = void 0;
const permisos_models_1 = require("./permisos.models");
const getPermisos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const permisos = yield permisos_models_1.Permiso.find().populate('nombreDocente');
        res.status(200).json(permisos);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener permisos' });
    }
});
exports.getPermisos = getPermisos;
const getPermiso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const permiso = yield permisos_models_1.Permiso.findById(id)
        .populate('nombreDocente', 'nombre apellido')
        .lean();
    res.json({
        permiso,
    });
});
exports.getPermiso = getPermiso;
const crearPermiso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombreDocente, fechaPermiso } = req.body;
        const [year, month, day] = fechaPermiso.split('-').map(Number);
        const fechaInicio = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
        const fechaFin = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999));
        const cantidadPermisos = yield permisos_models_1.Permiso.countDocuments({
            nombreDocente,
            fechaPermiso: {
                $gte: fechaInicio,
                $lte: fechaFin,
            },
        });
        if (cantidadPermisos >= 2) {
            return res.status(400).json({
                message: 'El docente ya tiene 2 permisos registrados para este día.',
            });
        }
        const permiso = new permisos_models_1.Permiso(Object.assign(Object.assign({}, req.body), { fechaPermiso: fechaInicio }));
        yield permiso.save();
        res.status(201).json({
            message: 'Permiso creado correctamente',
            permiso,
        });
    }
    catch (error) {
        res.status(400).json({
            message: 'Error al crear el permiso',
            error: error.message,
        });
    }
});
exports.crearPermiso = crearPermiso;
const actualizarPermiso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { nombreDocente } = _a, data = __rest(_a, ["nombreDocente"]);
    const permiso = yield permisos_models_1.Permiso.findByIdAndUpdate(id, data, { new: true });
    return res.json({ permiso });
});
exports.actualizarPermiso = actualizarPermiso;
const eliminarPermiso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const eliminarPermiso = yield permisos_models_1.Permiso.findByIdAndDelete(id, { new: true });
    return res.status(200).json({
        eliminarPermiso,
    });
});
exports.eliminarPermiso = eliminarPermiso;
// controllers/permisos.controller.ts
const getPermisosPorDocenteYMes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { mes, anio } = req.query;
        if (!mes || !anio) {
            return res.status(400).json({
                message: 'Debe proporcionar mes y año en la consulta',
            });
        }
        const mesNum = parseInt(mes) - 1;
        const anioNum = parseInt(anio);
        const primerDiaMes = new Date(Date.UTC(anioNum, mesNum, 1, 0, 0, 0));
        const ultimoDiaMes = new Date(Date.UTC(anioNum, mesNum + 1, 0, 23, 59, 59, 999));
        const permisos = yield permisos_models_1.Permiso.find({
            nombreDocente: id,
            fechaPermiso: {
                $gte: primerDiaMes,
                $lte: ultimoDiaMes,
            },
        });
        res.json(permisos);
    }
    catch (error) {
        res.status(500).json({
            message: 'Error al obtener permisos por docente y mes',
            error: error.message,
        });
    }
});
exports.getPermisosPorDocenteYMes = getPermisosPorDocenteYMes;
//# sourceMappingURL=permisos.controller.js.map
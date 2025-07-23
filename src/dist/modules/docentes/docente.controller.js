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
exports.docentesDelete = exports.docentesPut = exports.docentesPost = exports.docentesget = void 0;
const docente_models_1 = require("./docente.models");
const docentesget = (req, res) => {
    const params = req.query;
    res.status(200).json({
        msg: 'Get',
        params,
    });
};
exports.docentesget = docentesget;
const docentesPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, apellido, turno } = req.body;
        const docente = new docente_models_1.Docente({ nombre, apellido, turno });
        yield docente.save();
        res.status(200).json({
            msg: 'POST',
            docente,
        });
    }
    catch (error) {
        res.status(500).json({
            error,
        });
    }
});
exports.docentesPost = docentesPost;
const docentesPut = (req, res) => {
    const id = req.params.id;
    res.status(200).json({
        msg: 'PUT',
        id,
    });
};
exports.docentesPut = docentesPut;
const docentesDelete = (req, res) => {
    const { nombre, apellido, turno } = req.body;
    res.status(200).json({
        msg: 'POST',
        nombre,
        apellido,
        turno,
    });
};
exports.docentesDelete = docentesDelete;
//# sourceMappingURL=docente.controller.js.map
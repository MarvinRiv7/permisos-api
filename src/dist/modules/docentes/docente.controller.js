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
exports.docentesDelete = exports.docentesPut = exports.docentesPost = exports.docentesget = void 0;
const docente_models_1 = require("./docente.models");
const express_validator_1 = require("express-validator");
const docentesget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const params = req.query;
    const { limite = 5, desde = 0 } = req.query;
    const docentes = yield docente_models_1.Docente.find().skip(Number(desde)).limit(Number(limite));
    res.status(200).json({
        msg: 'Get',
        docentes
    });
});
exports.docentesget = docentesget;
const docentesPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, apellido } = req.body;
        const docente = new docente_models_1.Docente({ nombre, apellido });
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
const docentesPut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { _id } = _a, resto = __rest(_a, ["_id"]);
    const docente = yield docente_models_1.Docente.findByIdAndUpdate(id, resto);
    res.status(200).json({
        msg: 'PUT',
        docente
    });
});
exports.docentesPut = docentesPut;
const docentesDelete = (req, res) => {
    const { nombre, apellido, turno } = req.body;
    res.status(200).json({
        msg: 'POST',
        body: express_validator_1.body,
    });
};
exports.docentesDelete = docentesDelete;
//# sourceMappingURL=docente.controller.js.map
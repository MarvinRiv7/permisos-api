"use strict";
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
exports.Docente = exports.docenteSchema = void 0;
const mongoose_1 = require("mongoose");
exports.docenteSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'EL nombre es obligatorio'],
        unique: true
    },
    apellido: {
        type: String,
        required: [true, 'EL apellido es obligatorio']
    }
});
exports.docenteSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v } = _a, docente = __rest(_a, ["__v"]);
    return docente;
};
exports.Docente = (0, mongoose_1.model)('Docente', exports.docenteSchema);
//# sourceMappingURL=docente.models.js.map
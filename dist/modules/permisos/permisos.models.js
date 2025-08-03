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
exports.Permiso = exports.permisoSchema = void 0;
const mongoose_1 = require("mongoose");
const turnoEnum = ['Mañana', 'Tarde'];
const autoridadEnum = ['ISBM', 'Direccion'];
const motivoEnum = ['Salud', 'Incapacidad', 'Consulta Medica', 'Personal'];
exports.permisoSchema = new mongoose_1.Schema({
    nombreDocente: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Docente',
        required: true,
    },
    turno: {
        type: String,
        enum: {
            values: turnoEnum,
            message: 'Turno inválido. Valores permitidos: ' + turnoEnum.join(', '),
        },
        required: true,
        default: 'Mañana',
    },
    fechaPermiso: {
        type: Date,
        required: true,
    },
    CGS: {
        type: Boolean,
        default: true,
        required: true,
    },
    autoridadConcede: {
        type: String,
        enum: {
            values: autoridadEnum,
            message: 'Autoridad inválida. Valores permitidos: ' +
                autoridadEnum.join(', '),
        },
    },
    tiempo: {
        type: Number,
        min: [1, 'El tiempo debe ser al menos 1 día'],
    },
    motivo: {
        type: String,
        enum: {
            values: motivoEnum,
            message: 'Motivo inválido. Valores permitidos: ' +
                motivoEnum.join(', '),
        },
        required: true,
    },
}, { timestamps: true });
exports.permisoSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, createdAt, updatedAt } = _a, permiso = __rest(_a, ["__v", "createdAt", "updatedAt"]);
    return permiso;
};
exports.Permiso = (0, mongoose_1.model)('Permiso', exports.permisoSchema);
//# sourceMappingURL=permisos.models.js.map
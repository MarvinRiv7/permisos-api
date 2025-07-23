"use strict";
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
    },
    turno: {
        type: String,
        required: [true, 'EL turno es obligatorio']
    }
});
exports.Docente = (0, mongoose_1.model)('Docente', exports.docenteSchema);
//# sourceMappingURL=docente.models.js.map
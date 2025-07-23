import { model, Schema } from "mongoose";
import { IDocentes } from "./docentes.interface";

export const docenteSchema = new Schema<IDocentes>({
    nombre:{
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
})

export const Docente = model<IDocentes>('Docente', docenteSchema)
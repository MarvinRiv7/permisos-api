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
    }
})

docenteSchema.methods.toJSON = function() {
    const {__v, ...docente} = this.toObject()
    return docente
}

export const Docente = model<IDocentes>('Docente', docenteSchema)
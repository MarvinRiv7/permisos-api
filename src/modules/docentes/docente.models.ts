import { model, Schema } from 'mongoose';
import { IDocentes } from './docentes.interface';

const nivelEnum = [1, 2];

export const docenteSchema = new Schema<IDocentes>(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    apellido: {
      type: String,
      required: true,
      trim: true,
    },
    nivel: {
      type: Number,
      enum: [1, 2], 
      required: true,
    },
    categoria: {
      type: Number,
      required: true,
    },
    nip: {
      type: Number,
      required: true,
      unique: true,
    },
    year: {
      type: Number,
      required: true,
      min: 1900,
    },
    partidas: {
      type: String,
      required: true,
     
    },
    subPartidas: {
      type: String,
      required: true,
    
    },
    fechaIngreso: {
      type: Date,
      required: true,
    },
    especialidad: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // agrega createdAt y updatedAt
    versionKey: false, // elimina el campo __v
  },
);

docenteSchema.methods.toJSON = function () {
  const { __v, ...docente } = this.toObject();
  return docente;
};

export const Docente = model<IDocentes>('Docente', docenteSchema);

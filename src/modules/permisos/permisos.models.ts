import { model, Schema } from 'mongoose';
import { IPermisos } from './permisos.interface';

const turnoEnum = ['Mañana', 'Tarde'];
const autoridadEnum = ['ISBM', 'Direccion'];
const motivoEnum = ['Salud', 'Incapacidad', 'Consulta Medica', 'Personal'];

export const permisoSchema = new Schema<IPermisos>(
  {
    nombreDocente: {
      type: Schema.Types.ObjectId,
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
        message:
          'Autoridad inválida. Valores permitidos: ' +
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
        message:
          'Motivo inválido. Valores permitidos: ' +
          motivoEnum.join(', '),
      },
      required: true,
    },
  },
  { timestamps: true },
);
permisoSchema.methods.toJSON = function() {
  const {__v, createdAt, updatedAt, ...permiso} = this.toObject()
  return permiso
}

export const Permiso = model<IPermisos>('Permiso', permisoSchema);

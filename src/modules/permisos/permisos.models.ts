import { model, Schema } from 'mongoose';
import { IPermisos } from './permisos.interface';

const turnoEnum = ['Mañana', 'Tarde', 'Mañana y Tarde'];
const autoridadEnum = ['ISBM', 'Direccion', 'Departamental de educacion'];
const motivoEnum = [
  'Duelo',
  'Incapacidad',
  'Consulta Medica',
  'Personal',
  'Maternidad',
];
const unidadTiempoEnum = ['Horas', 'Dias'];

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
          'Autoridad inválida. Valores permitidos: ' + autoridadEnum.join(', '),
      },
    },
    tiempo: {
      type: Number,
      min: [1, 'El tiempo debe ser al menos 1 día'],
    },
    unidadTiempo: {
      type: String,
      enum: {
        values: unidadTiempoEnum,
      },
      default: 'Dias',
    },
    motivo: {
      type: String,
      enum: {
        values: motivoEnum,
        message:
          'Motivo inválido. Valores permitidos: ' + motivoEnum.join(', '),
      },
      required: true,
    },
    conCertificadoMedico: {
      type: Boolean,
      default: false,
      validate: {
        validator: function (value: boolean) {
          // Solo permitimos que sea true si motivo es "Consulta Medica"
          if (
            value === true &&
            this.motivo !== 'Consulta Medica' &&
            this.motivo !== 'Incapacidad'
          ) {
            return false;
          }
          return true;
        },
        message:
          'El campo conCertificadoMedico solo puede ser true si el motivo es Consulta Medica',
      },
    },
    observaciones: {
      type: String,
    },
  },
  { timestamps: true },
);
permisoSchema.methods.toJSON = function () {
  const { __v, createdAt, updatedAt, ...permiso } = this.toObject();
  return permiso;
};

export const Permiso = model<IPermisos>('Permiso', permisoSchema);

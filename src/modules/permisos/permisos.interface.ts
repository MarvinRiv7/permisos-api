import { Types } from 'mongoose';

export interface IPermisos {
  nombreDocente: Types.ObjectId;
  fechaPermiso: Date;
  CGS: boolean;
  autoridadConcede: 'ISBM' | 'Direccion';
  tiempo: number;
  motivo: 'Salud' | 'Incapacidad' | 'Consulta Medica' | 'Personal';
  turno: 'Mañana' | 'Tarde'
}

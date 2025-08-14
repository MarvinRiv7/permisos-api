import { Types } from 'mongoose';

export interface IPermisos {
  nombreDocente: Types.ObjectId;
  fechaPermiso: Date;
  CGS: boolean;
  autoridadConcede: 'ISBM' | 'Direccion' | 'Departamental de educacion';
  tiempo: number;
  unidadTiempo: 'Horas' | 'Dias';
  motivo: 'Duelo' | 'Incapacidad' | 'Consulta Medica' | 'Personal' | 'Maternidad';
  turno: 'Mañana' | 'Tarde' | 'Mañana y Tarde';
  observaciones?: string;
  conCertificadoMedico?: boolean
}

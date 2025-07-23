export interface IPermisos {
  turno: string;
  nombreDOcente: string;
  fechaPermiso?: Date;
  CGS?: boolean;
  autoridad: string;
  cantidadDias: number;
  motivo?: 'personal' | 'incapacidad' | 'citaMedica' | 'salud';
  mes: number;
  year: number
}

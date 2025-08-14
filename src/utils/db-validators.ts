import { Docente } from '../modules/docentes/docente.models';
import { Permiso } from '../modules/permisos/permisos.models';

export const existeNIP = async (nip: number) => {
  const nipExiste = await Docente.findOne({ nip});
  if (nipExiste) {
    throw new Error(`El NIP ${nip} ya está registrado`);
  }
};
export const existeDocentePorId = async (id: string = '') => {
  const existeDocente = await Docente.findById(id);
  if (!existeDocente) {
    throw new Error(`El docente con el id: ${id} no existe`);
  }
};
export const existePermisoPoId = async (id: string) => {
  const existePermiso = await Permiso.findById(id);
  if (!existePermiso) {
    throw new Error(`El id: ${id} no existe`);
  }
};


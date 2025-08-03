import { Request, Response } from 'express';
import { Docente } from './docente.models';
import { body } from 'express-validator';
import { Permiso } from '../permisos/permisos.models';

export const docentesget = async (req: Request, res: Response) => {
  // const params = req.query;
  const docentes = await Docente.find();

  res.status(200).json({
    msg: 'Get',
    docentes,
  });
};
export const docentesPost = async (req: Request, res: Response) => {
  try {
    const { nombre, apellido } = req.body;
    const docente = new Docente({ nombre, apellido });
    await docente.save();

    res.status(200).json({
      msg: 'POST',
      docente,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
export const docentesPut = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { _id, ...resto } = req.body;

  const docente = await Docente.findByIdAndUpdate(id, resto);

  res.status(200).json({
    msg: 'PUT',
    docente,
  });
};

export const docentesDelete = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {

    const docente = await Docente.findByIdAndDelete(id);

    if (!docente) {
      return res.status(404).json({ msg: "Docente no encontrado" });
    }

  
    await Permiso.deleteMany({ nombreDocente: id });

    res.status(200).json({
      msg: "Docente y permisos relacionados eliminados",
      docente,
    });
  } catch (error) {
    console.error("Error al eliminar docente:", error);
    res.status(500).json({ msg: "Error al eliminar docente y permisos" });
  }
};

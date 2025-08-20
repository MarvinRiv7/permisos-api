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
    const {
      nombre,
      apellido,
      nivel,
      categoria,
      nip,
      year,
      partidas,
      subPartidas,
      fechaIngreso,
      especialidad,
    } = req.body;

    const existeNip = await Docente.findOne({ nip });
    if (existeNip) {
      return res.status(400).json({
        msg: `Ya existe un docente con el NIP ${nip}`,
      });
    }
    const [yearNum, monthNum, dayNum] = fechaIngreso.split('-').map(Number);
    const fechaIngresoLocal = new Date(
      Date.UTC(yearNum, monthNum - 1, dayNum, 0, 0, 0, 0),
    );

    const docente = new Docente({
      nombre,
      apellido,
      nivel,
      categoria,
      nip,
      year,
      partidas,
      subPartidas,
      fechaIngreso: fechaIngresoLocal,
      especialidad,
    });

    await docente.save();

    res.status(201).json({
      msg: 'Docente creado correctamente',
      docente,
    });
  } catch (error: any) {
    res.status(500).json({
      msg: 'Error al crear el docente',
      error: error.message,
    });
  }
};

export const docentesPut = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { _id, ...data } = req.body;
  const docente = await Docente.findByIdAndUpdate(id, data, {new: true})
  return res.json({docente})
};

export const docentesDelete = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const docente = await Docente.findByIdAndDelete(id);

    if (!docente) {
      return res.status(404).json({ msg: 'Docente no encontrado' });
    }

    await Permiso.deleteMany({ nombreDocente: id });

    res.status(200).json({
      msg: 'Docente y permisos relacionados eliminados',
      docente,
    });
  } catch (error) {
    console.error('Error al eliminar docente:', error);
    res.status(500).json({ msg: 'Error al eliminar docente y permisos' });
  }
};

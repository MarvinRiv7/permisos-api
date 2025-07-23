import { Request, Response } from 'express';
import { Docente } from './docente.models';

export const docentesget = (req: Request, res: Response) => {
  const params = req.query;

  res.status(200).json({
    msg: 'Get',
    params,
  });
};
export const docentesPost = async (req: Request, res: Response) => {
  try {
    const { nombre, apellido, turno } = req.body;
    const docente = new Docente({nombre, apellido, turno});
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
export const docentesPut = (req: Request, res: Response) => {
  const id = req.params.id;

  res.status(200).json({
    msg: 'PUT',
    id,
  });
};
export const docentesDelete = (req: Request, res: Response) => {
  const { nombre, apellido, turno } = req.body;

  res.status(200).json({
    msg: 'POST',
    nombre,
    apellido,
    turno,
  });
};

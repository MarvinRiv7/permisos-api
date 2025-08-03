import { Request, Response } from 'express';
import { Docente } from './docente.models';
import { body } from 'express-validator';

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
  const {id}  = req.params;
  const docente = await Docente.findByIdAndDelete(id)
  res.status(200).json({
    msg: 'DELETE',
    docente
  });
};

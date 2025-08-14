import { Request, Response } from 'express';
import { Permiso } from './permisos.models';

// docente.model.ts
export interface IDocente {
  nombre: string;
  apellido: string;
  limite?: string;
  desde?: string;
}

export const getPermisos = async (
  req: Request<{}, {}, IDocente>,
  res: Response,
) => {
  try {
    const permisos = await Permiso.find().populate('nombreDocente');

    res.status(200).json(permisos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener permisos' });
  }
};

export const getPermiso = async (req: Request, res: Response) => {
  const { id } = req.params;
  const permiso = await Permiso.findById(id)
    .populate('nombreDocente', 'nombre apellido')
    .lean();
  res.json({
    permiso,
  });
};


export const crearPermiso = async (req: Request, res: Response) => {
  try {
    const {
      nombreDocente,
      fechaPermiso,
      tiempo,
      unidadTiempo = "Dias", // por defecto días
      ...resto
    } = req.body;

    if (!nombreDocente || !fechaPermiso || tiempo == null) {
      return res.status(400).json({
        message: "Faltan campos obligatorios (nombreDocente, fechaPermiso, tiempo).",
      });
    }

    // Validar unidadTiempo
    if (!["Dias", "Horas"].includes(unidadTiempo)) {
      return res.status(400).json({
        message: "unidadTiempo debe ser 'Dias' o 'Horas'.",
      });
    }

    // Convertir fechaPermiso a rango completo del día (UTC)
    const [year, month, day] = fechaPermiso.split("-").map(Number);
    const fechaInicio = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
    const fechaFin = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999));

    // Contar permisos existentes del docente en el día
    const cantidadPermisos = await Permiso.countDocuments({
      nombreDocente,
      fechaPermiso: { $gte: fechaInicio, $lte: fechaFin },
    });

    if (cantidadPermisos >= 2) {
      return res.status(400).json({
        message: "El docente ya tiene 2 permisos registrados para este día.",
      });
    }

    // Crear permiso
    const permiso = new Permiso({
      ...resto,
      nombreDocente,
      fechaPermiso: fechaInicio,
      tiempo,
      unidadTiempo,
    });

    await permiso.save();

    res.status(201).json({
      message: "Permiso creado correctamente",
      permiso,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Error al crear el permiso",
      error: error.message,
    });
  }
};


export const actualizarPermiso = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombreDocente, ...data } = req.body;

  const permiso = await Permiso.findByIdAndUpdate(id, data, { new: true });

  return res.json({ permiso });
};

export const eliminarPermiso = async (req: Request, res: Response) => {
  const { id } = req.params;
  const eliminarPermiso = await Permiso.findByIdAndDelete(id, { new: true });
  return res.status(200).json({
    eliminarPermiso,
  });
};

export const getPermisosPorDocenteYMes = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const { mes, anio } = req.query;

    if (!mes || !anio) {
      return res.status(400).json({
        message: 'Debe proporcionar mes y año en la consulta',
      });
    }

    const mesNum = parseInt(mes as string) - 1;
    const anioNum = parseInt(anio as string);

    const primerDiaMes = new Date(Date.UTC(anioNum, mesNum, 1, 0, 0, 0));
    const ultimoDiaMes = new Date(
      Date.UTC(anioNum, mesNum + 1, 0, 23, 59, 59, 999),
    );

    const permisos = await Permiso.find({
      nombreDocente: id,
      fechaPermiso: {
        $gte: primerDiaMes,
        $lte: ultimoDiaMes,
      },
    });

    res.json(permisos);
  } catch (error: any) {
    res.status(500).json({
      message: 'Error al obtener permisos por docente y mes',
      error: error.message,
    });
  }
};
export const getPermisosPorDocenteYAnio = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id, anio } = req.params;

    if (!anio) {
      return res.status(400).json({
        message: 'Debe proporcionar el año en la consulta',
      });
    }

    const anioNum = parseInt(anio as string);
    if (isNaN(anioNum)) {
      return res.status(400).json({
        message: 'El año debe ser un número válido',
      });
    }

    const primerDiaAnio = new Date(Date.UTC(anioNum, 0, 1, 0, 0, 0));
    const ultimoDiaAnio = new Date(Date.UTC(anioNum, 11, 31, 23, 59, 59, 999));

    const permisos = await Permiso.find({
      nombreDocente: id,
      fechaPermiso: {
        $gte: primerDiaAnio,
        $lte: ultimoDiaAnio,
      },
    }).sort({ fechaPermiso: 1 });

    res.json(permisos);
  } catch (error: any) {
    res.status(500).json({
      message: 'Error al obtener permisos por docente y año',
      error: error.message,
    });
  }
};

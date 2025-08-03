import { Router } from 'express';
import docentesRoutes from './docentes/docente.routes';
import  permisosRoutes from './permisos/permisos.routes';
const router = Router();

router.use('/docentes', docentesRoutes);
router.use('/permisos', permisosRoutes);

export default router;

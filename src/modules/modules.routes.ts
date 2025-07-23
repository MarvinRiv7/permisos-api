import { Router } from 'express';
import docentesRoutes from './docentes/docente.routes';
const router = Router();

router.use('/docentes', docentesRoutes);

export default router;

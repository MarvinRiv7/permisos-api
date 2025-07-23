import { Router } from "express";
import permisosRoutes from "./permisos/permisos.routes";
const router = Router()

router.use('/permisos', permisosRoutes)

export default router
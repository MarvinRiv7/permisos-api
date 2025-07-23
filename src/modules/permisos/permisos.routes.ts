import { Router } from "express";
import { getPermisos } from "./permisos.controller";

const router = Router()

router.get('/', getPermisos)



export default router
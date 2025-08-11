import express, { Application } from 'express';
import { Env } from '../types/Env';
import permisosRoutes from '../modules/modules.routes';
import docentesRoutes from '../modules/modules.routes';
import cors from 'cors';
import { dbConnection } from '../database/config';

class Server {
  private app: Application;
  private port: string;
  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8081';
    this.conectarDB();
    this.middlewares();
    this.routes();
  }
  async conectarDB() {
    await dbConnection();
  }
  middlewares() {
    this.app.use(
      cors({
        origin: [
          'http://localhost:5174/',
          'http://localhost:5174/docentes',
          'http://localhost:5174/permisos',
          'http://localhost:5174/buscar',
          'https://docentes-permisos.vercel.app/',
        ],

        credentials: true,
      }),
    );
    this.app.use(express.static('public'));
    this.app.use(express.json());
  }
  routes() {
    this.app.use('/api', permisosRoutes);
    this.app.use('/api', docentesRoutes);
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port${this.port}`);
    });
  }
}
export default Server;

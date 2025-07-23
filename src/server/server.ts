import express, { Application } from 'express';
import { Env } from '../types/Env';
import  permisosRoutes  from "../modules/modules.routes";

class Server {
  private app: Application;
  private port: Env;
  constructor() {
    this.app = express();
    this.port = { PORT: Number(process.env.PORT || 8081) };
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.app.use(express.static('public'));
    this.app.use(express.json())
  }
  routes() {
    this.app.use('/api', permisosRoutes)
  }
  listen() {
    this.app.listen(this.port.PORT, () => {
      console.log(`Server is running on port${this.port.PORT}`);
    });
  }
}
export default Server;

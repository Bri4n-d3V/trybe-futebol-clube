import * as express from 'express';
import login from './routes/loginRoutes';
import clubs from './routes/clubsRoutes';
import matchs from './routes/matchsRoutes';

class App {
  public app: express.Express;
  // ...

  constructor() {
    this.app = express();
    this.config();
    // ...
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    // ...
  }

  public use(rota:string, callback:express.RequestHandler):void {
    this.app.use(rota, callback);
  }

  // ...
  public start(PORT: string | number):void {
    this.app.use(express.json());
    this.app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
    this.app.use('/login', login);
    this.app.use('/clubs', clubs);
    this.app.use('/matchs', matchs);
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();

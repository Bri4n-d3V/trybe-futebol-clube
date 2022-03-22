import * as express from 'express';
import login from './routes/loginRoutes';
import clubs from './routes/clubsRoutes';
import matchs from './routes/matchsRoutes';
import leaderboard from './routes/leaderboardRoutes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.app.use(express.json());
    this.app.use('/login', login);
    this.app.use('/clubs', clubs);
    this.app.use('/matchs', matchs);
    this.app.use('/leaderboard', leaderboard);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT, PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
  }

  public use(rota:string, callback:express.RequestHandler):void {
    this.app.use(rota, callback);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();

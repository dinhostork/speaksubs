import express from 'express';
//import { router } from './application/routes';
import { connect } from './infrastructure/database/mongodb.config';

class Server {
  private app: express.Application;
  private readonly port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.APLICATION_PORT || '3000');

    connect();
    
    this.app.use(express.json());

    //this.app.use('/', router);
  }

  public start() {
    // Inicia o servidor
    this.app.listen(this.port, () => {
      console.log(`Servidor rodando na porta ${this.port}`);
    });
  }
}

const server = new Server();
server.start();

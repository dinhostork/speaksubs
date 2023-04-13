import express from 'express';
import router from './application/routes';
import { connect } from './infrastructure/database/mongodb.config';

class Server {
  private app: express.Application;
  private readonly port: number;
  private version: number | string;
  private url: string;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.APLICATION_PORT || '3000');
    this.version = process.env.API_VERSION || 1;
    this.url = process.env.API_URL || 'localhost';

    connect();
    
    this.app.use(express.json());

    this.app.use(`/v${this.version}`, router);
  }

  public start() {
    this.app.listen(this.port, () => {
      console.log(`Servidor rodando em ${this.url}:${this.port}/v${this.version}`);
    });
  }
}

const server = new Server();
server.start();

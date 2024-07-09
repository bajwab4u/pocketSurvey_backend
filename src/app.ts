process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from 'config';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { createConnection } from 'typeorm';
import { dbConnection } from '@databases';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import expressBasicAuth from 'express-basic-auth';

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 3002;
    this.env = process.env.NODE_ENV || 'development';

    this.env !== 'test' && this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  async connectToDatabase() {
    try {
        await createConnection(dbConnection);
        console.log('Connected to database successfully! ');
    } catch (error) {
        console.error('Unable to connect to database! ', error);  
            
    }
}

  private initializeMiddlewares() {
    this.app.use(morgan(config.get('log.format'), { stream }));
    this.app.use(cors({ origin: true, credentials: true }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'Pocket Survey',
          version: '1.0.0',
          description: 'API integration docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use(
      '/api-docs',
      expressBasicAuth({
        users: { 'bys-admin': 'bys-admin' },
        challenge: true,
      }),
      swaggerUi.serve,
      swaggerUi.setup(specs),
    );
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;

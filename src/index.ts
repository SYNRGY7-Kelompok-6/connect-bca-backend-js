import express, { Express } from 'express';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes';
import logger from './config/logger';
import './config/database';

const openAPIDocument = YAML.load('./docs/openapi.yaml');
const port: number = Number(process.env.PORT) || 8000;
const app: Express = express();
const stream = {
  write: (message: string) => logger.info(message.trim()),
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream }));
app.use(cors());
app.use('/api/v1.0', routes)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(openAPIDocument))

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});

export default app;
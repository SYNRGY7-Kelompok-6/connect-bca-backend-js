import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes';
import './config/database';

const port: number = Number(process.env.PORT) || 8000;
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'))
app.use(cors());
app.use('/api/v1.0', routes)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});

export default app;
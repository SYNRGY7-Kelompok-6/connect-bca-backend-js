import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import './config/database';

const port: number = Number(process.env.PORT) || 8000;
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'))

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route Not Found' })
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});

export default app;
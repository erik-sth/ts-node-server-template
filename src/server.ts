import express, { Express } from 'express';
import { configureCors } from './startup/cors';
import isOnline from './routes/base';
import addRateLimiter from './startup/limitRate';
import * as dotenv from 'dotenv';
dotenv.config();

const app: Express = express();

// startup
configureCors(app);
addRateLimiter(app);

app.use(express.json());
app.use('/', isOnline);

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const server = app.listen(port, '0.0.0.0');

export { server };

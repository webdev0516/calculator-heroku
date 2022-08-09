// External Dependencies
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from "path";

// Internal Dependencies
import { routes } from './routes';

dotenv.config();

const app: Express = express() ;

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(cors());

// port number
const port = process.env.PORT || 5016;

// app.use('/', (req: Request, res: Response, next) => {
//   req.body = req.query;
//   next();
// });
app.use(express.static('client/build'));
 app.get('*', (req: Request, res: Response) => {
 res.sendFile(path.join(__dirname + '../client/build/index.html'));
 });


// routing
app.use('/api/calc/', routes);

// create the server
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
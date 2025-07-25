
import express from 'express';
import { router as accidentsRouter } from './routes/accidents-router.js';
import { router as loggerRouter } from './routes/logger-router.js';
import reqLogger from 'req-logger-express'
import {errorMiddleware} from 'custom-exceptions-express'


const app = express();
app.use(express.json());


//Custom middleware
app.use(reqLogger('RDS_db_project'))
//Routes
app.use('/api',  accidentsRouter);
app.use('/api',  loggerRouter);



//Error Middleware
app.use(errorMiddleware) // Optional, recommended

// I exported the app for testing in vitest without running the server:
export default app

// DEV CHANGE 
import { config } from 'dotenv';
config();

import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { AppError } from './errors/AppError';
import { router } from './routes';
import mongoose from 'mongoose';

const app = express();
const server = createServer(app);
const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
	},
});

mongoose.connect('mongodb://khalil:password@localhost:27017');

app.use(express.json());

app.use(cors());

app.use(router);

app.use(
	(err: Error, request: Request, response: Response, next: NextFunction) => {
		if (err instanceof AppError) {
			return response
				.status(err.statusCode)
				.json({ message: err.message });
		}

		return response.status(500).json({
			status: 'error',
			message: `Internal server error - ${err.message}`,
		});
	}
);

export { app, io, server };

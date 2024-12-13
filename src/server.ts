import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { Server } from 'http';
import logger from './config/logger.config';
import { env } from './config';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import categoryRoutes from './routes/category.routes';
import transactionRoutes from './routes/transaction.routes';
import trainingRoutes from './routes/training.routes';
import trainingApplicationRoutes from './routes/training.application.routes';
import taskRoutes from './routes/task.routes';
import taskApplicationRoutes from './routes/task.application.routes';
import profileRoutes from './routes/profile.routes';
import dotenv from "dotenv";
const app = express();
import cors, { CorsOptions } from "cors";


const allowedOrigins = [
  "http://localhost:5173", // For local development
  "https://writers-frontend-9be5f1bac35e.herokuapp.com", // Heroku frontend
    "https://writerscoreresearch.com",
    "https://www.writerscoreresearch.com/"
];

const corsOptions: CorsOptions  = {
      origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true); // Allow request
        } else {
          callback(new Error("Not allowed by CORS")); // Block request
        }
      },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions)); // Apply CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

dotenv.config();

/**
 * Routes
 */
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api', transactionRoutes);
app.use('/api', trainingRoutes);
app.use('/api', trainingApplicationRoutes);
app.use('/api', taskRoutes);
app.use('/api', taskApplicationRoutes);
app.use('/api', profileRoutes);

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'Server is up and running' });
});

// Catch-all for unknown routes
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server
const server: Server = app.listen(env.port, () => {
  logger.info(`Server started on port ${env.port}`);
});

// Graceful shutdown
const gracefulShutdown = () => {
  logger.info('Received shutdown signal. Shutting down gracefully...');
  server.close(() => {
    logger.info('Server closed. Exiting process...');
    process.exit(0);
  });

  setTimeout(() => {
    logger.error('Forcefully shutting down...');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

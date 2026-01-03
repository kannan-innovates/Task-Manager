import express, { Application } from 'express';
import cors from 'cors';
import taskRoutes from './modules/tasks/presentation/routes/task.routes';
import { ErrorHandler } from './shared/middleware/errorHandler.middleware';

export class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.configureRoutes();
    this.configureErrorHandling();
  }

  private configureMiddleware(): void {
    this.app.use(express.json());

    this.app.use(express.urlencoded({ extended: true }));

    // Enable CORS
    this.app.use(cors({
      origin: 'http://localhost:3000', 
      credentials: true
    }));

    // Log requests (development only)
    this.app.use((req, res, next) => {
      console.log(`${req.method} ${req.path}`);
      next();
    });
  }

  private configureRoutes(): void {
    // Health check
    this.app.get('/health', (req, res) => {
      res.json({
        success: true,
        message: 'Server is running!',
        timestamp: new Date().toISOString()
      });
    });

    // API routes
    this.app.use('/api/v1', taskRoutes);

    // 404 handler
    this.app.use((req, res) => {
      res.status(404).json({
        success: false,
        error: {
          message: 'Route not found',
          path: req.path,
          method: req.method
        }
      });
    });
  }

  private configureErrorHandling(): void {
    // Global error handler
    this.app.use(ErrorHandler.handle);
  }

  public getApp(): Application {
    return this.app;
  }
}
import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../utils/response.util';

export class ErrorHandler {
  /**
   * Global error handler
   */
  static handle(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);

    // Check for specific error types
    if (error.message.includes('not found')) {
      res.status(404).json(ApiResponse.error(error.message, 404));
      return;
    }

    if (error.message.includes('Unauthorized')) {
      res.status(403).json(ApiResponse.error(error.message, 403));
      return;
    }

    if (error.message.includes('required') || error.message.includes('must be')) {
      res.status(400).json(ApiResponse.error(error.message, 400));
      return;
    }

    // Generic server error
    res.status(500).json(
      ApiResponse.error('Internal server error', 500)
    );
  }
}
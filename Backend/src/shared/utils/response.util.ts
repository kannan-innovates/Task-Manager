export class ApiResponse {
  /**
   * Success response
   */
  static success<T>(data: T, message?: string) {
    return {
      success: true,
      message: message || 'Operation successful',
      data
    };
  }

  /**
   * Error response
   */
  static error(message: string, statusCode: number = 400) {
    return {
      success: false,
      error: {
        message,
        statusCode
      }
    };
  }
}
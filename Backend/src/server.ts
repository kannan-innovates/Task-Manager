import 'dotenv/config';
import { App } from './app';
import Database from './shared/config/database.config';

class Server {
  private app: App;
  private port: number;

  constructor() {
    this.app = new App();
    this.port = parseInt(process.env.API_PORT || '5001', 10);
  }

  public async start(): Promise<void> {
    try {

      console.log('🔗 Connecting to database...');
      await Database.getInstance().connect();

      // Start Express server
      this.app.getApp().listen(this.port, () => {
        console.log('✅ Server started successfully!');
        console.log(`🚀 Server running on http://localhost:${this.port}`);
        console.log(`📝 Health check: http://localhost:${this.port}/health`);
        console.log(`📋 API base URL: http://localhost:${this.port}/api/v1`);
      });
    } catch (error) {
      console.error('❌ Failed to start server:', error);
      process.exit(1);  // Exit with error code
    }
  }

  public async stop(): Promise<void> {
    console.log('🛑 Shutting down server...');
    await Database.getInstance().disconnect();
    process.exit(0);
  }
}

// Create and start server
const server = new Server();
server.start();

// Graceful shutdown
process.on('SIGINT', () => server.stop());
process.on('SIGTERM', () => server.stop());
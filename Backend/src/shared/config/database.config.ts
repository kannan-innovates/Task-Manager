import { MongoClient, Db } from 'mongodb';

class Database {
  private static instance: Database;
  private client: MongoClient | null = null;
  private db: Db | null = null;

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect(): Promise<void> {
    try {
      const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017';
      const dbName = process.env.DB_NAME || 'task_manager';

      console.log('Connecting to MongoDB...');
      
      this.client = new MongoClient(mongoUri);
      await this.client.connect();
      
      this.db = this.client.db(dbName);
      
      console.log('✅ MongoDB connected successfully');
    } catch (error) {
      console.error('❌ MongoDB connection error:', error);
      throw error;
    }
  }

  // Get database instance
  public getDb(): Db {
    if (!this.db) {
      throw new Error('Database not connected. Call connect() first.');
    }
    return this.db;
  }

  // Close connection
  public async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      console.log('MongoDB disconnected');
    }
  }
}

export default Database;
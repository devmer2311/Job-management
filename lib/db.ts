import { Pool } from 'pg';

// Create a singleton pool instance
let pool: Pool | null = null;

function createPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      // Connection pool settings
      max: 20, // Maximum number of clients in the pool
      idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
      connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
      maxUses: 7500, // Close (and replace) a connection after it has been used 7500 times
    });

    // Handle pool errors
    pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
    });

    // Handle pool connection events
    pool.on('connect', () => {
      console.log('Connected to PostgreSQL database');
    });

    pool.on('remove', () => {
      console.log('Client removed from pool');
    });
  }
  return pool;
}

// Function to execute queries with retry logic
export async function query(text: string, params?: any[]) {
  const pool = createPool();
  let retries = 3;
  
  while (retries > 0) {
    try {
      const result = await pool.query(text, params);
      return result;
    } catch (error: any) {
      console.error(`Database query error (${retries} retries left):`, error);
      
      if (error.code === 'ECONNRESET' || error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT') {
        retries--;
        if (retries > 0) {
          console.log('Retrying database connection...');
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retry
          continue;
        }
      }
      throw error;
    }
  }
  
  // This should never be reached due to the throw above, but TypeScript needs it
  throw new Error('Query failed after all retries');
}

// Export the pool for direct access if needed
export default createPool();
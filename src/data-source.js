require('dotenv').config();
require('reflect-metadata');
const path = require('path');
const { DataSource } = require('typeorm');

// Railway siempre requiere SSL
const sslEnabled = true;

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: process.env.NODE_ENV === 'development' ? true : ['error'],
  entities: [path.join(__dirname, '../build/entities/**/*.js')],
  
  // Configuración SSL específica para Railway
  ssl: {
    rejectUnauthorized: false,
    ca: undefined,
    checkServerIdentity: false
  },
  
  // Configuración optimizada para Lambda + Railway
  extra: {
    connectionLimit: 1,           // UNA sola conexión para Lambda
    acquireTimeout: 25000,        // 25 segundos max para obtener conexión
    timeout: 25000,               // 25 segundos max para queries
    reconnect: false,             // No reconectar automáticamente en Lambda
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    idleTimeout: 25000,
    
    // Configuración específica mysql2 para Railway
    connectTimeout: 15000,        // 15 segundos para conectar
    maxReconnects: 0,             // No reintentar conexiones
  },
  
  // Timeouts a nivel TypeORM
  maxQueryExecutionTime: 20000,   // 20 segundos max por query
});

let initialized = false;
let connectionPromise = null;

async function getDataSource() {
  if (!initialized && !connectionPromise) {
    connectionPromise = initializeConnection();
  }
  
  if (connectionPromise) {
    await connectionPromise;
  }
  
  return AppDataSource;
}

async function initializeConnection() {
  if (!AppDataSource.isInitialized) {
    try {
      console.log('[TypeORM] 🚂 Conectando a Railway:', {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        ssl: 'enabled'
      });
      
      const startTime = Date.now();
      await AppDataSource.initialize();
      const duration = Date.now() - startTime;
      
      console.log(`[TypeORM] ✅ Conectado a Railway en ${duration}ms`);
      initialized = true;
      connectionPromise = null;
      
    } catch (error) {
      console.error('[TypeORM] ❌ Error conectando a Railway:', {
        message: error.message,
        code: error.code,
        errno: error.errno,
        sqlState: error.sqlState
      });
      
      connectionPromise = null;
      throw error;
    }
  }
}

// Función de diagnóstico para Railway
async function testRailwayConnection() {
  const mysql = require('mysql2/promise');
  
  try {
    console.log('🔍 Probando conexión directa a Railway...');
    
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      ssl: {
        rejectUnauthorized: false
      },
      connectTimeout: 10000
    });
    
    const [rows] = await connection.execute('SELECT 1 as test, NOW() as timestamp, @@version as version');
    await connection.end();
    
    console.log('✅ Test Railway exitoso:', rows[0]);
    return { success: true, data: rows[0] };
    
  } catch (error) {
    console.error('❌ Test Railway falló:', {
      message: error.message,
      code: error.code,
      errno: error.errno
    });
    return { success: false, error: error.message, code: error.code };
  }
}

module.exports = { 
  getDataSource, 
  testRailwayConnection 
};
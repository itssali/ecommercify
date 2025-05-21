import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Routes
import productRoutes from './routes/products';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import orderRoutes from './routes/orders';
import categoryRoutes from './routes/categories';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
// Use type assertion to fix TypeScript error
app.use(cookieParser() as any);
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.WEB_URL || '', process.env.ADMIN_URL || ''] 
    : 'http://localhost:3000',
  credentials: true
}));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

const startServer = async () => {
  try {
    // Test database connection
    await prisma.$connect();
    console.log('📦 Connected to database');
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('Disconnected from database');
  process.exit(0);
});

startServer(); 
import { PrismaClient } from "../generated/prisma";

declare module "../generated/prisma" {
  interface PrismaClient {
    $on(event: 'error' | 'warn', callback: (e: LogEvent) => void): void;
    $on(event: 'query', callback: (e: QueryEvent) => void): void;
  }

  interface LogEvent {
    timestamp: Date;
    message: string;
    target: string;
    level?: 'info' | 'warn' | 'error';
  }

  interface QueryEvent {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  }
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined,
  isConnected?: boolean
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: [
    {level: 'warn', emit: 'event'},
    {level: 'error', emit: 'event'},
    //debug querries
    // {level: 'query', emit: 'event'} 
  ],
});

prisma.$on('error', (e) => {
  console.error(`[Prisma Error] ${e.message} (target: ${e.target})`);
});

prisma.$on('warn', (e) => {
  console.warn(`[Prisma Warning] ${e.message}`);
});

export const connectDB = async () => {
  try {
    if(!globalForPrisma.isConnected) {
      await prisma.$connect();
      globalForPrisma.isConnected = true;
      console.log('Database connection success');
    }
  } catch (error) {
    console.error('Database connection error: ', error);
    process.exit(1);
  }
}

if(process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma

  connectDB().catch((error) => {
    console.error('Initial DB connection failed:', error);
  });
}

process.on('beforeExit', async () => {
  if (globalForPrisma.isConnected) {
    await prisma.$disconnect();
    globalForPrisma.isConnected = false;
    console.log('Database connection closed');
  }
});
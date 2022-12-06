import { PrismaClient } from '@prisma/client';

const log = process.env.LOG_NIVEL as 'info' | 'query' | 'warn' | 'error';

export const prisma = new PrismaClient({
  log: [log],
});

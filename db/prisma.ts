// Note: we need to create this special file for our Prisma client.
// Because if we use the prisma client as it is, we could run into some issues because of the way
// that server side rendering works and the way vercel work with Neon, which is serverless, meaning it's not like
// a continues connection. So we don't want a case where multiple Prisma instances are being created. Basically we
// want to create a global instance and then reuse that unless it's not created. So we want to check a global prisma instance.
// If there is, use it. If there's not, then create it.

// Get the PrismaClient from the generated file rather than create it every time.
// import { PrismaClient } from '@/generated/prisma';
import { PrismaClient } from '../app/generated/prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

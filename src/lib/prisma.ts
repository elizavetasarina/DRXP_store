import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

// Создаём пул соединений к PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

// Prisma adapter для PostgreSQL
const adapter = new PrismaPg(pool)

// Singleton для Next.js (чтобы не открывались новые подключения при HMR)
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  })

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
import path from 'node:path'
import { defineConfig } from 'prisma/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { config } from 'dotenv'

config()

const directUrl = process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? ''
const databaseUrl = process.env.DATABASE_URL ?? ''

export default defineConfig({
  schema: path.join(__dirname, 'prisma/schema.prisma'),
  datasource: {
    url: databaseUrl,
  },
  migrate: {
    adapter: () => {
      return new PrismaPg({ connectionString: directUrl, ssl: { rejectUnauthorized: false } })
    },
  },
  migrations: {
    seed: 'tsx prisma/seed.ts',
  },
})

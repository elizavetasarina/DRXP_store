import { prisma } from '@/lib/prisma'

export interface CreateUserInput {
  email: string
  name?: string
  passwordHash: string
}

export const userRepository = {
  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } })
  },

  async findById(id: string) {
    return prisma.user.findUnique({ where: { id } })
  },

  async create(data: CreateUserInput) {
    return prisma.user.create({
      data: {
        email: data.email,
        name: data.name ?? null,
        passwordHash: data.passwordHash,
      },
    })
  },
}

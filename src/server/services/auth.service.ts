import bcrypt from 'bcryptjs'
import { userRepository } from '@/server/repositories/user.repository'

export const authService = {
  async hashPassword(plain: string): Promise<string> {
    return bcrypt.hash(plain, 12)
  },

  async verifyPassword(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash)
  },

  async createUser(email: string, name: string | undefined, password: string) {
    const existing = await userRepository.findByEmail(email)
    if (existing) throw new Error('Email already in use')

    const passwordHash = await this.hashPassword(password)
    return userRepository.create({ email, name, passwordHash })
  },
}

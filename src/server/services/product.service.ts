import { productRepository, FindAllParams } from '@/server/repositories/product.repository'

export const productService = {
  async getProducts(params: FindAllParams) {
    return productRepository.findAll(params)
  },

  async getProductBySlug(slug: string) {
    const product = await productRepository.findBySlug(slug)
    if (!product) throw new Error(`Product not found: ${slug}`)
    return product
  },

  async getProductById(id: string) {
    const product = await productRepository.findById(id)
    if (!product) throw new Error(`Product not found: ${id}`)
    return product
  },

  async getFeaturedProducts(limit?: number) {
    return productRepository.findFeatured(limit)
  },

  async getRelatedProducts(categoryId: string, excludeId?: string, limit?: number) {
    return productRepository.findByCategory(categoryId, excludeId, limit)
  },
}

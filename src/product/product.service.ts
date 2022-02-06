import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private productRepo = new ProductRepository()) {}

  async getProducts(): Promise<Product[]> {
    return this.productRepo.getProducts();
  }

  async createProduct(product: CreateProductDto): Promise<Product> {
    return this.productRepo.createProduct(product);
  }

  async deleteProduct(id: number): Promise<void> {
    return this.productRepo.deleteProduct(id);
  }

  async getProductById(id: number): Promise<Product> {
    return this.productRepo.getProductById(id);
  }

  async updatePost(id, updateProductDto): Promise<Product> {
    return this.productRepo.updateProduct(id, updateProductDto);
  }
}

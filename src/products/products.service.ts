import { Injectable } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { Repository } from 'typeorm'
import { ProductEntity } from './entities/product.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productsRepo: Repository<ProductEntity>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const newProd = this.productsRepo.create(createProductDto)
    return await this.productsRepo.save(newProd)
  }

  findAll() {
    return `This action returns all products`
  }

  findOne(id: number) {
    return `This action returns a #${id} product`
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`
  }

  remove(id: number) {
    return `This action removes a #${id} product`
  }
}

import { ProductEntity } from 'src/products/entities/product.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ database: 'euphoria_shop', name: 'categories' })
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Timestamp
  
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Timestamp

  @Column()
  title: string

  @Column()
  description: string

  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[]
}

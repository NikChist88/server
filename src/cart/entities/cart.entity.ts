import { ProductEntity } from 'src/products/entities/product.entity'
import { UserEntity } from 'src/users/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ database: 'euphoria_shop', name: 'cart' })
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Timestamp

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Timestamp

  @Column({ name: 'user_id' })
  userId: string

  @Column({ name: 'total_products' })
  total: number

  @OneToMany(() => ProductEntity, (products) => products.cart)
  products: ProductEntity[]

  @OneToOne(() => UserEntity, (user) => user.cart)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity
}

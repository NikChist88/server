import { ProductEntity } from 'src/products/entities/product.entity'
import { UserEntity } from 'src/users/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ database: 'euphoria_shop', name: 'reviews' })
export class ReviewEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Timestamp

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Timestamp

  @Column('text')
  text: string

  @Column({ name: 'user_id' })
  userId: string

  @Column({ name: 'product_id' })
  productId: string

  @ManyToOne(() => UserEntity, (user) => user.reviews)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity

  @ManyToOne(() => ProductEntity, (product) => product.reviews)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity
}

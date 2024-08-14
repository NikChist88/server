import { Exclude } from 'class-transformer'
import { OrderEntity } from 'src/order/entities/order.entity'
import { ProductEntity } from 'src/products/entities/product.entity'
import { ReviewEntity } from 'src/reviews/entities/review.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ database: 'euphoria_shop', name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Timestamp

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Timestamp

  @Column()
  username?: string

  @Column({ unique: true })
  email: string

  @Column()
  @Exclude()
  password?: string

  @Column()
  @Exclude()
  salt?: string

  @Column({ default: '/uploads/no-user-image.png' })
  avatar?: string

  @OneToMany(() => ProductEntity, (product) => product.user)
  favorites: ProductEntity[]

  @OneToMany(() => ReviewEntity, (review) => review.user, {
    onDelete: 'CASCADE',
  })
  reviews: ReviewEntity[]

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[]
}

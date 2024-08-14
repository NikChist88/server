import { CategoryEntity } from 'src/categories/entities/category.entity'
import { OrderItemEntity } from 'src/order/entities/order-item.entity'
import { ReviewEntity } from 'src/reviews/entities/review.entity'
import { UserEntity } from 'src/users/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm'

export enum Sizes {
  XS = 'extra-small',
  S = 'small',
  M = 'middle',
  L = 'large',
  XL = 'extra-large',
  XXL = 'extra-extra-large',
}

export enum Colors {
  'purple',
  'black',
  'red',
  'orange',
  'navy',
  'white',
  'broom',
  'green',
  'yellow',
  'grey',
  'pink',
  'blue',
}

@Entity({ database: 'euphoria_shop', name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Timestamp

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Timestamp

  @Column()
  title: string

  @Column('text')
  description: string

  @Column({ type: 'simple-array' })
  images?: string[]

  @Column('int')
  price: number

  @Column({ type: 'enum', enum: Sizes, default: Sizes.XS })
  sizes: Sizes

  @Column({ type: 'enum', enum: Colors })
  color: Colors

  @ManyToMany(() => OrderItemEntity, (orderItem) => orderItem)
  @JoinColumn({name: 'order_items'})
  orderItems: OrderItemEntity[]

  @ManyToOne(() => UserEntity, (user) => user)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity

  @OneToMany(() => ReviewEntity, (review) => review.product)
  @JoinColumn({ name: 'review_id' })
  reviews: ReviewEntity[]
}

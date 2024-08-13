import { CartEntity } from 'src/cart/entities/cart.entity'
import { CategoryEntity } from 'src/categories/entities/category.entity'
import { ReviewEntity } from 'src/reviews/entities/review.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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
  rating: number

  @Column('int', { name: 'new_price' })
  newPrice: number

  @Column('int', { name: 'old_price' })
  oldPrice: number

  @Column({ type: 'enum', enum: Sizes, default: Sizes.XS })
  sizes: Sizes

  @Column({ type: 'enum', enum: Colors })
  color: Colors

  @Column({ name: 'cart_id' })
  cartId: string

  @Column({ name: 'category_id' })
  categoryId: string

  @ManyToOne(() => CartEntity, (cart) => cart.products)
  @JoinColumn({ name: 'cart_id' })
  cart: CartEntity

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity

  @OneToMany(() => ReviewEntity, (review) => review.product)
  reviews: ReviewEntity[]
}

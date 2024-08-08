import { UserEntity } from 'src/users/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

enum ProductSizes {
  XS = 'extra-small',
  S = 'small',
  M = 'middle',
  L = 'large',
  XL = 'extra-large',
  XXL = 'extra-extra-large',
}

@Entity({ database: 'euphoria_shop' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column('text')
  description: string

  @Column()
  category: string

  @Column()
  image: string

  @Column('int')
  rating: number

  @Column('int')
  new_price: number

  @Column('int')
  old_price: number

  @Column({ type: 'enum', enum: ProductSizes, default: ProductSizes.XS })
  sizes: ProductSizes

  @Column('simple-array')
  colors: string[]

  @Column({ default: false })
  favorite: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne((type) => UserEntity, (user) => user.products)
  @JoinColumn({ name: 'userId' })
  user: UserEntity
}

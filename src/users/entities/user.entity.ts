import { Exclude } from 'class-transformer'
import { CartEntity } from 'src/cart/entities/cart.entity'
import { ReviewEntity } from 'src/reviews/entities/review.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
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

  @OneToMany(() => ReviewEntity, (review) => review.user, {
    onDelete: 'CASCADE',
  })
  reviews: ReviewEntity[]

  @OneToOne(() => CartEntity, (cart) => cart.user)
  cart: CartEntity
}

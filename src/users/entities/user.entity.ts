import { ProductEntity } from 'src/products/entities/product.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ database: 'euphoria_shop' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  username: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column()
  salt: string

  @Column()
  token: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany((type) => ProductEntity, (product) => product.user, {
    onDelete: 'CASCADE',
  })
  products: ProductEntity[]
}

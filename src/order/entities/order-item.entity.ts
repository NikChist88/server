import { ProductEntity } from 'src/products/entities/product.entity'
import { OrderEntity } from './order.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ database: 'euphoria_shop', name: 'order_item' })
export class OrderItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Timestamp

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Timestamp

  @Column('int')
  quantity: number

  @Column('int')
  price: number

  @ManyToMany(() => ProductEntity, (product) => product.orderItems)
  @JoinColumn({ name: 'product_id' })
  products: ProductEntity[]

  @ManyToOne(() => OrderEntity, (order) => order.items)
  @JoinColumn({ name: 'order_id' })
  order: OrderItemEntity
}

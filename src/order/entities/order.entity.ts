import { UserEntity } from 'src/users/entities/user.entity'
import { OrderItemEntity } from './order-item.entity'
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ database: 'euphoria_shop', name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Timestamp

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Timestamp

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
  @JoinColumn({ name: 'order_items_id' })
  items: OrderItemEntity[]

  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity
}

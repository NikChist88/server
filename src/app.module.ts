import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getPostgresConfig } from './configs'
import { ProductsModule } from './products/products.module'
import { CategoriesModule } from './categories/categories.module'
import { ReviewsModule } from './reviews/reviews.module'
import { CartModule } from './cart/cart.module'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getPostgresConfig,
    }),
    PassportModule.register({ session: true }),
    AuthModule,
    UsersModule,
    ProductsModule,
    CategoriesModule,
    ReviewsModule,
    CartModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

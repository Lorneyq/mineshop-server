import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'; // Импорт JwtModule
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from './../products/products.module';
import { FavoritesController } from './favorites.controller';
import { Favorites } from './favorites.model';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Favorites]),
    UsersModule,
    ProductsModule,
    JwtModule.register({
      secret: `${process.env.JWT_SECRET_KEY}`,
      signOptions: { expiresIn: '4w' },
    }),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}

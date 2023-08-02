import { Module } from '@nestjs/common';
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
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}

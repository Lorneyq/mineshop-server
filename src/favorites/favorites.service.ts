import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from './../products/products.service';
import { AddToFavoritesDto } from './dto/add-to-favorites.dto';
import { Favorites } from './favorites.model';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorites)
    private productsModel: typeof Favorites,
    private readonly usersService: UsersService,
    private readonly ProductsService: ProductsService,
  ) {}

  async findAll(userId: number | string): Promise<Favorites[]> {
    return this.productsModel.findAll({ where: { userId } });
  }

  async add(addToFavoritesDto: AddToFavoritesDto) {
    const favorites = new Favorites();
    const user = await this.usersService.findOne({
      where: { username: addToFavoritesDto.username },
    });
    const product = await this.ProductsService.findOne(
      addToFavoritesDto.productId,
    );

    favorites.userId = user.id;
    favorites.username = user.username;
    favorites.userEmail = user.email;
    favorites.productId = product.id;
    favorites.name = product.name;
    favorites.category = product.category;
    favorites.subcategory = product.subcategory;
    favorites.price = product.price;
    favorites.image = JSON.parse(product.images)[0];

    return favorites.save();
  }

  async remove(productId: number | string): Promise<void> {
    const product = await this.productsModel.findOne({
      where: { productId },
    });

    await product.destroy();
  }

  async removeAll(userId: number | string): Promise<void> {
    await this.productsModel.destroy({ where: { userId } });
  }
}

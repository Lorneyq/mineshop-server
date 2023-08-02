import { Controller, Get } from '@nestjs/common';
import {
  Body,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common/decorators';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthenticatedGuard } from './../auth/authenticated.guard';
import { AddToFavoritesDto } from './dto/add-to-favorites.dto';
import { FavoritesService } from './favorites.service';
import { AddToFavoritesResponse, GetAllResponse } from './types';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @ApiOkResponse({ type: [GetAllResponse] })
  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  getAll(@Param('id') userId: string) {
    return this.favoritesService.findAll(userId);
  }

  @ApiOkResponse({ type: AddToFavoritesResponse })
  @UseGuards(AuthenticatedGuard)
  @Post('/add')
  AddToFavorites(@Body() addToFavoritesDto: AddToFavoritesDto) {
    return this.favoritesService.add(addToFavoritesDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete('/one/:id')
  removeOne(@Param('id') productId: string) {
    return this.favoritesService.remove(productId);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete('/all/:id')
  removeAll(@Param('id') productId: string) {
    return this.favoritesService.removeAll(productId);
  }
}

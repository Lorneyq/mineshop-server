import { Controller, Get, Post } from '@nestjs/common';
import { Body, Delete, Param, Patch } from '@nestjs/common/decorators';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ShoppingCartService } from './shopping-cart.service';
import {
  AddToCartResponse,
  GetAllResponse,
  TotalPriceRequest,
  TotalPriceResponse,
  UpdateCountRequest,
  UpdateCountResponse,
} from './types';

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @ApiOkResponse({ type: [GetAllResponse] })
  @Get(':id')
  getAll(@Param('id') userId: string) {
    return this.shoppingCartService.findAll(userId);
  }

  @ApiOkResponse({ type: AddToCartResponse })
  @Post('/add')
  AddToCart(@Body() addToCartDto: AddToCartDto) {
    return this.shoppingCartService.add(addToCartDto);
  }

  @ApiOkResponse({ type: UpdateCountResponse })
  @ApiBody({ type: UpdateCountRequest })
  @Post('/count/:id')
  updateCount(
    @Body() { count }: { count: number },
    @Param('id') productId: string,
  ) {
    return this.shoppingCartService.updateCount(count, productId);
  }

  @ApiOkResponse({ type: TotalPriceResponse })
  @ApiBody({ type: TotalPriceRequest })
  @Patch('/total-price/:id')
  updateTotalPrice(
    @Body() { total_price }: { total_price: number },
    @Param('id') productId: string,
  ) {
    return this.shoppingCartService.updateTotalPrice(total_price, productId);
  }

  @Delete('/one/:id')
  removeOne(@Param('id') productId: string) {
    return this.shoppingCartService.remove(productId);
  }

  @Delete('/all/:id')
  removeAll(@Param('id') productId: string) {
    return this.shoppingCartService.removeAll(productId);
  }
}

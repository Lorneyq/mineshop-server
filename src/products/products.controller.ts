import { Controller, Get, Post } from '@nestjs/common';
import { Body, Param, Query } from '@nestjs/common/decorators';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import {
  FindOneResponse,
  GetByCategoryRequest,
  GetByCategoryResponse,
  GetByNameRequest,
  GetByNameResponse,
  GetHitResponse,
  GetNewResponse,
  GetSaleResponse,
  PaginatedAndFilterResponse,
  SearchRequest,
  SearchResponse,
} from './types';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOkResponse({ type: PaginatedAndFilterResponse })
  @Get()
  paginateAndFilter(@Query() query) {
    return this.productsService.paginateAndFilter(query);
  }

  @ApiOkResponse({ type: FindOneResponse })
  @Get('find/:id')
  getOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @ApiOkResponse({ type: GetHitResponse })
  @Get('hit')
  getHit() {
    return this.productsService.hit();
  }

  @ApiOkResponse({ type: GetNewResponse })
  @Get('new')
  getNew() {
    return this.productsService.new();
  }

  @ApiOkResponse({ type: GetSaleResponse })
  @Get('sale')
  getSale() {
    return this.productsService.sale();
  }

  @ApiOkResponse({ type: SearchResponse })
  @ApiBody({ type: SearchRequest })
  @Post('search')
  search(@Body() { search }: { search: string }) {
    return this.productsService.searchByString(search);
  }

  @ApiOkResponse({ type: GetByNameResponse })
  @ApiBody({ type: GetByNameRequest })
  @Post('name')
  getByName(@Body() { name }: { name: string }) {
    return this.productsService.findOneByName(name);
  }

  @ApiOkResponse({ type: GetByCategoryResponse })
  @ApiBody({ type: GetByCategoryRequest })
  @Post('category')
  getByCategory(@Body() { category }: { category: string }, @Query() query) {
    return this.productsService.paginateAndFilter(query, category);
  }
}

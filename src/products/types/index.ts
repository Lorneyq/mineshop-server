import { ApiProperty } from '@nestjs/swagger';

class Products {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Soft toy “Ghast”' })
  name: string;

  @ApiProperty({ example: 12 })
  price: number;

  @ApiProperty({ example: 15 })
  old_price: number;

  @ApiProperty({ example: 'hhh12346' })
  vendor_code: string;

  @ApiProperty({ example: 'Soft toy “Ghast” - cool' })
  description: string;

  @ApiProperty({ example: 'Toys' })
  category: string;

  @ApiProperty({ example: 'soft toys' })
  subcategory: string;

  @ApiProperty({ example: '/uploads/' })
  images: string;

  @ApiProperty({ example: '#000000' })
  color: string;

  @ApiProperty({ example: 'S' })
  size: string;

  @ApiProperty({ example: 5 })
  evaluation: number;

  @ApiProperty({ example: 16 })
  in_stock: number;

  @ApiProperty({ example: false })
  hit: boolean;

  @ApiProperty({ example: false })
  new: boolean;

  @ApiProperty({ example: false })
  sale: boolean;

  @ApiProperty({ example: '2023-07-01T18:43:04.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2023-07-01T18:43:04.000Z' })
  updatedAt: string;
}

export class PaginatedAndFilterResponse {
  @ApiProperty({ example: 10 })
  count: number;

  @ApiProperty({ type: Products, isArray: true })
  rows: Products;
}

export class Hit extends Products {
  @ApiProperty({ example: true })
  hit: boolean;
}

export class GetHitResponse extends PaginatedAndFilterResponse {
  @ApiProperty({ example: 10 })
  count: number;

  @ApiProperty({ type: Products, isArray: true })
  rows: Hit;
}

export class New extends Products {
  @ApiProperty({ example: true })
  new: boolean;
}

export class GetNewResponse extends PaginatedAndFilterResponse {
  @ApiProperty({ example: 10 })
  count: number;

  @ApiProperty({ type: Products, isArray: true })
  rows: New;
}

export class Sale extends Products {
  @ApiProperty({ example: true })
  sale: boolean;
}

export class GetSaleResponse extends PaginatedAndFilterResponse {
  @ApiProperty({ example: 10 })
  count: number;

  @ApiProperty({ type: Products, isArray: true })
  rows: Sale;
}

export class SearchByLetterResponse extends Products {
  @ApiProperty({ example: 'Soft' })
  search: string;
}

export class SearchResponse extends PaginatedAndFilterResponse {
  @ApiProperty({ type: SearchByLetterResponse, isArray: true })
  rows: SearchByLetterResponse;
}

export class SearchRequest {
  @ApiProperty({ example: 'Soft' })
  search: string;
}

export class GetByNameResponse extends Products {
  @ApiProperty({ example: 'Soft toy “Ghast”' })
  name: string;
}

export class GetByNameRequest {
  @ApiProperty({ example: 'Soft toy “Ghast”' })
  name: string;
}

export class Category extends Products {
  @ApiProperty({ example: 'Toys' })
  category: string;
}

export class GetByCategoryResponse extends PaginatedAndFilterResponse {
  @ApiProperty({ example: 10 })
  count: number;

  @ApiProperty({ type: Products, isArray: true })
  rows: Category;
}

export class GetByCategoryRequest {
  @ApiProperty({ example: 'Toys' })
  category: string;
}

export class FindOneResponse extends Products {}

export interface IProductsQuery {
  limit: string;
  offset: string;
  subcategory: string | undefined;
}

export interface IProductsFilter {
  subcategory: string | undefined;
}

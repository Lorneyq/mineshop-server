import { ApiProperty } from '@nestjs/swagger';

class ShoppingCartItem {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 'User' })
  username: string;

  @ApiProperty({ example: 1 })
  productId: number;

  @ApiProperty({ example: 'Soft toy “Ghast”' })
  name: string;

  @ApiProperty({ example: 12 })
  price: number;

  @ApiProperty({ example: 16 })
  in_stock: number;

  @ApiProperty({ example: '/uploads' })
  image: string;

  @ApiProperty({ example: '#000000' })
  color: string;

  @ApiProperty({ example: 'S' })
  size: string;

  @ApiProperty({ example: 1 })
  count: number;

  @ApiProperty({ example: 12 })
  total_price: number;

  @ApiProperty({ example: '2023-07-02T17:37:48.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2023-07-02T17:37:48.000Z' })
  updatedAt: string;
}

export class GetAllResponse extends ShoppingCartItem {}
export class AddToCartResponse extends ShoppingCartItem {}
export class UpdateCountResponse {
  @ApiProperty({ example: 1 })
  count: number;
}
export class UpdateCountRequest {
  @ApiProperty({ example: 1 })
  count: number;
}
export class TotalPriceResponse {
  @ApiProperty({ example: 1000 })
  count: number;
}
export class TotalPriceRequest {
  @ApiProperty({ example: 1000 })
  count: number;
}

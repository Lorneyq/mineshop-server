import { ApiProperty } from '@nestjs/swagger';

class FavoritesItem {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 'User' })
  username: string;

  @ApiProperty({ example: 'user@gmail.com' })
  userEmail: string;

  @ApiProperty({ example: 1 })
  productId: number;

  @ApiProperty({ example: 'Soft toy “Ghast”' })
  name: string;

  @ApiProperty({ example: 'Toys' })
  category: string;

  @ApiProperty({ example: 'soft toys' })
  subcategory: string;

  @ApiProperty({ example: 12 })
  price: number;

  @ApiProperty({ example: '/uploads' })
  image: string;

  @ApiProperty({ example: '2023-07-02T17:37:48.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2023-07-02T17:37:48.000Z' })
  updatedAt: string;
}

export class GetAllResponse extends FavoritesItem {}
export class AddToFavoritesResponse extends FavoritesItem {}

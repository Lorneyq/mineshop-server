import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Favorites extends Model {
  @Column
  userId: number;

  @Column
  username: string;

  @Column
  userEmail: string;

  @Column({ defaultValue: 0 })
  productId: number;

  @Column
  name: string;

  @Column
  category: string;

  @Column
  subcategory: string;

  @Column({ defaultValue: 0 })
  price: number;

  @Column
  image: string;
}

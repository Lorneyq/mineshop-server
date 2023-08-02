import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class ShoppingCart extends Model {
  @Column
  userId: number | null;

  @Column
  username: string | null;

  @Column
  userEmail: string | null;

  @Column({ defaultValue: 0 })
  productId: number;

  @Column
  name: string;

  @Column({ defaultValue: 0 })
  price: number;

  @Column({ defaultValue: 0 })
  in_stock: number;

  @Column
  image: string;

  @Column
  color: string;

  @Column
  size: string;

  @Column({ defaultValue: 0 })
  count: number;

  @Column({ defaultValue: 0 })
  total_price: number;
}

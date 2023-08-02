import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Products extends Model {
  @Column
  name: string;

  @Column({ defaultValue: 0 })
  price: number;

  @Column
  old_price: number;

  @Column
  vendor_code: string;

  @Column
  description: string;

  @Column
  category: string;

  @Column
  subcategory: string;

  @Column
  images: string;

  @Column
  color: string;

  @Column
  size: string;

  @Column
  evaluation: number;

  @Column({ defaultValue: 0 })
  in_stock: number;

  @Column({ defaultValue: false })
  hit: boolean;

  @Column({ defaultValue: false })
  new: boolean;

  @Column({ defaultValue: false })
  sale: boolean;
}

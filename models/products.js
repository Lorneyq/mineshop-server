'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Products.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      old_price: DataTypes.DECIMAL,
      vendor_code: DataTypes.STRING,
      description: DataTypes.STRING,
      category: DataTypes.STRING,
      subcategory: DataTypes.STRING,
      images: DataTypes.STRING,
      color: DataTypes.STRING,
      size: DataTypes.STRING,
      evaluation: DataTypes.INTEGER,
      in_stock: DataTypes.INTEGER,
      hit: DataTypes.BOOLEAN,
      new: DataTypes.BOOLEAN,
      sale: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Products',
    },
  );
  return Products;
};

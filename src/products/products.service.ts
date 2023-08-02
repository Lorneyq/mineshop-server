import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Products } from './products.model';
import { IProductsFilter, IProductsQuery } from './types';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products)
    private productsModel: typeof Products,
  ) {}

  async paginateAndFilter(
    query: IProductsQuery,
    category?: string,
  ): Promise<{ count: number; rows: Products[] }> {
    const limit = +query.limit;
    const offset = +query.offset * limit;
    const filter = {} as Partial<IProductsFilter>;
    const where: { category?: string } = {};

    if (query.subcategory) {
      filter.subcategory = JSON.parse(decodeURIComponent(query.subcategory));
    }

    if (category !== undefined) {
      where.category = category;
    }

    return this.productsModel.findAndCountAll({
      where: { ...where, ...filter },
      limit,
      offset,
    });
  }

  async hit(): Promise<{ count: number; rows: Products[] }> {
    return this.productsModel.findAndCountAll({
      where: { hit: true },
    });
  }

  async new(): Promise<{ count: number; rows: Products[] }> {
    return this.productsModel.findAndCountAll({
      where: { new: true },
    });
  }

  async sale(): Promise<{ count: number; rows: Products[] }> {
    return this.productsModel.findAndCountAll({
      where: { sale: true },
    });
  }

  async findOne(id: number | string): Promise<Products> {
    return this.productsModel.findOne({
      where: { id },
    });
  }

  async findOneByName(name: string): Promise<Products> {
    return this.productsModel.findOne({
      where: { name },
    });
  }

  async findByCategory(
    category: string,
  ): Promise<{ count: number; rows: Products[] }> {
    return this.productsModel.findAndCountAll({
      where: { category },
    });
  }

  async searchByString(
    str: string,
  ): Promise<{ count: number; rows: Products[] }> {
    return this.productsModel.findAndCountAll({
      limit: 8,
      where: { name: { [Op.like]: `%${str}%` } },
    });
  }
}

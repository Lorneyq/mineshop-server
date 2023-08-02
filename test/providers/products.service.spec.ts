import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as session from 'express-session';
import * as passport from 'passport';
import { databaseConfig } from 'src/config/configuration';
import { SequelizeConfigService } from 'src/config/sequelizeConfig.service';
import { ProductsModule } from 'src/products/products.module';
import { ProductsService } from 'src/products/products.service';

describe('Products Service', () => {
  let app: INestApplication;
  let productsService: ProductsService;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRootAsync({
          imports: [ConfigModule],
          useClass: SequelizeConfigService,
        }),
        ConfigModule.forRoot({
          load: [databaseConfig],
        }),
        ProductsModule,
      ],
    }).compile();

    app = testModule.createNestApplication();
    app.use(
      session({
        secret: 'keyword',
        resave: false,
        saveUninitialized: false,
      }),
    );
    app.use(passport.initialize());
    app.use(passport.session());
    await app.init();
  });

  it('should find by id', async () => {
    const product = await productsService.findOne(1);

    expect(product.dataValues).toEqual(
      expect.objectContaining({
        id: 1,
        name: expect.any(String),
        price: expect.any(Number),
        vendor_code: expect.any(String),
        description: expect.any(String),
        images: expect.any(String),
        color: expect.any(String),
        size: expect.any(String),
        evaluation: expect.any(Number),
        in_stock: expect.any(Number),
        hit: expect.any(Boolean),
        new: expect.any(Boolean),
        sale: expect.any(Boolean),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    );
  });

  it('should find by name', async () => {
    const product = await productsService.findOneByName('Soft toy “Ghast”');

    expect(product.dataValues).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: 'Soft toy “Ghast”',
        price: expect.any(Number),
        vendor_code: expect.any(String),
        description: expect.any(String),
        images: expect.any(String),
        color: expect.any(String),
        size: expect.any(String),
        evaluation: expect.any(Number),
        in_stock: expect.any(Number),
        hit: expect.any(Boolean),
        new: expect.any(Boolean),
        sale: expect.any(Boolean),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    );
  });

  it('should find by search string', async () => {
    const products = await productsService.searchByString('Soft');

    expect(products.rows.length).toBeLessThanOrEqual(8);

    products.rows.forEach((item) => {
      expect(item.name.toLowerCase()).toContain('Soft');
      expect(item.dataValues).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          price: expect.any(Number),
          vendor_code: expect.any(String),
          description: expect.any(String),
          images: expect.any(String),
          color: expect.any(String),
          size: expect.any(String),
          evaluation: expect.any(Number),
          in_stock: expect.any(Number),
          hit: expect.any(Boolean),
          new: expect.any(Boolean),
          sale: expect.any(Boolean),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      );
    });
  });

  it('should find hits', async () => {
    const products = await productsService.hit();

    expect(products.rows.length).toBeLessThanOrEqual(8);

    products.rows.forEach((item) => {
      expect(item.name.toLowerCase()).toContain('Soft');
      expect(item.dataValues).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          price: expect.any(Number),
          vendor_code: expect.any(String),
          description: expect.any(String),
          images: expect.any(String),
          color: expect.any(String),
          size: expect.any(String),
          evaluation: expect.any(Number),
          in_stock: expect.any(Number),
          hit: true,
          new: expect.any(Boolean),
          sale: expect.any(Boolean),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      );
    });
  });

  it('should find new', async () => {
    const products = await productsService.new();

    expect(products.rows.length).toBeLessThanOrEqual(8);

    products.rows.forEach((item) => {
      expect(item.name.toLowerCase()).toContain('Soft');
      expect(item.dataValues).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          price: expect.any(Number),
          vendor_code: expect.any(String),
          description: expect.any(String),
          images: expect.any(String),
          color: expect.any(String),
          size: expect.any(String),
          evaluation: expect.any(Number),
          in_stock: expect.any(Number),
          hit: expect.any(Boolean),
          new: true,
          sale: expect.any(Boolean),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      );
    });
  });

  it('should find sale', async () => {
    const products = await productsService.sale();

    expect(products.rows.length).toBeLessThanOrEqual(8);

    products.rows.forEach((item) => {
      expect(item.name.toLowerCase()).toContain('Soft');
      expect(item.dataValues).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          price: expect.any(Number),
          vendor_code: expect.any(String),
          description: expect.any(String),
          images: expect.any(String),
          color: expect.any(String),
          size: expect.any(String),
          evaluation: expect.any(Number),
          in_stock: expect.any(Number),
          hit: expect.any(Boolean),
          new: expect.any(Boolean),
          sale: true,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      );
    });
  });
});

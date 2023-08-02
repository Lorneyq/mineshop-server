import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as session from 'express-session';
import * as passport from 'passport';
import { databaseConfig } from 'src/config/configuration';
import { SequelizeConfigService } from 'src/config/sequelizeConfig.service';
import { ProductsModule } from 'src/products/products.module';
import * as request from 'supertest';

describe('Products Controller', () => {
  let app: INestApplication;

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

  it('should get one product', async () => {
    const response = await request(app.getHttpServer()).get('/products/find/1');

    expect(response.body).toEqual(
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
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    );
  });

  it('should get hits', async () => {
    const response = await request(app.getHttpServer()).get('/products/hit');

    expect(response.body.rows).toEqual(
      expect.arrayContaining([
        {
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
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      ]),
    );
  });

  it('should get new products', async () => {
    const response = await request(app.getHttpServer()).get('/products/new');

    expect(response.body.rows).toEqual(
      expect.arrayContaining([
        {
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
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      ]),
    );
  });

  it('should get sale', async () => {
    const response = await request(app.getHttpServer()).get('/products/sale');

    expect(response.body.rows).toEqual(
      expect.arrayContaining([
        {
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
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      ]),
    );
  });

  it('should search by string', async () => {
    const body = { search: 'soft' };
    const response = await request(app.getHttpServer())
      .post('/products/search')
      .send(body);

    expect(response.body.rows.length).toBeLessThanOrEqual(8);

    response.body.rows.forEach((element) => {
      expect(element.name.toLowerCase()).toContain(body.search);
    });
    expect(response.body.rows).toEqual(
      expect.arrayContaining([
        {
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
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      ]),
    );
  });

  it('should get by name', async () => {
    const body = { name: 'Soft toy “Ghast”' };
    const response = await request(app.getHttpServer())
      .post('/products/name')
      .send(body);

    expect(response.body).toEqual(
      expect.objectContaining([
        {
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
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      ]),
    );
  });
});

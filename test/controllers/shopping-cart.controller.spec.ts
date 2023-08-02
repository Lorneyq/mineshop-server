import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import * as session from 'express-session';
import * as passport from 'passport';
import { AuthModule } from 'src/auth/auth.module';
import { databaseConfig } from 'src/config/configuration';
import { SequelizeConfigService } from 'src/config/sequelizeConfig.service';
import { ProductsModule } from 'src/products/products.module';
import { ProductsService } from 'src/products/products.service';
import { ShoppingCart } from 'src/shopping-cart/shopping-cart.model';
import { ShoppingCartModule } from 'src/shopping-cart/shopping-cart.module';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import * as request from 'supertest';

const mockedUser = {
  username: 'Albert',
  email: 'albert.cool@gmail.com',
  password: 'Albert123@',
};

describe('Shopping-Cart Controller', () => {
  let app: INestApplication;
  let productsService: ProductsService;
  let usersService: UsersService;

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
        ShoppingCartModule,
        ProductsModule,
        AuthModule,
      ],
    }).compile();

    productsService = testModule.get<ProductsService>(ProductsService);
    usersService = testModule.get<UsersService>(UsersService);

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

  beforeEach(async () => {
    const user = new User();

    const hashedPassword = await bcrypt.hash(mockedUser.password, 10);

    user.username = mockedUser.username;
    user.password = mockedUser.password;
    user.email = mockedUser.email;

    return user.save();
  });

  beforeEach(async () => {
    const cart = new ShoppingCart();

    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });
    const product = await productsService.findOne(1);

    cart.userId = user.id;
    cart.username = user.username;
    cart.productId = product.id;
    cart.name = product.name;
    cart.price = product.price;
    cart.in_stock = product.in_stock;
    cart.image = JSON.parse(product.images)[0];
    cart.color = product.color;
    cart.size = product.size;
    cart.total_price = product.price;

    return cart.save();
  });

  afterEach(async () => {
    await User.destroy({ where: { username: mockedUser.username } });
    await ShoppingCart.destroy({ where: { productId: 1 } });
  });

  it('should get all cart items', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    const response = await request(app.getHttpServer())
      .get(`/shopping-cart/${user.id}`)
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(Number),
          userId: user.id,
          username: expect.any(String),
          userEmail: expect.any(String),
          productId: expect.any(Number),
          name: expect.any(String),
          price: expect.any(Number),
          in_stock: expect.any(Number),
          image: expect.any(String),
          color: expect.any(String),
          size: expect.any(String),
          count: expect.any(Number),
          total_price: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      ]),
    );
  });

  it('should add cart items', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    await request(app.getHttpServer())
      .post(`/shopping-cart/add`)
      .send({ username: mockedUser.username, productId: 1 })
      .set('Cookie', login.headers['set-cookie']);

    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    const response = await request(app.getHttpServer())
      .post(`/shopping-cart/${user.id}`)
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body.find((item) => item.productId === 1)).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        userId: user.id,
        username: expect.any(String),
        userEmail: expect.any(String),
        productId: 1,
        name: expect.any(String),
        price: expect.any(Number),
        in_stock: expect.any(Number),
        image: expect.any(String),
        color: expect.any(String),
        size: expect.any(String),
        count: expect.any(Number),
        total_price: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    );
  });

  it('should get updated count of cart item', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ email: mockedUser.email, password: mockedUser.password });

    const response = await request(app.getHttpServer())
      .patch(`/shopping-cart/count/1`)
      .send({ count: 2 })
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body).toEqual({ count: 2 });
  });

  it('should get updated total price of cart item', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ email: mockedUser.email, password: mockedUser.password });

    const product = await productsService.findOne(1);

    const response = await request(app.getHttpServer())
      .patch(`/shopping-cart/total-price/1`)
      .send({ total_price: product.price * 3 })
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body).toEqual({ total_price: product.price * 3 });
  });

  it('should delete cart item', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ email: mockedUser.email, password: mockedUser.password });

    await request(app.getHttpServer())
      .delete('/shopping-cart/one/1')
      .set('Cookie', login.headers['set-cookie']);

    const user = await usersService.findOne({
      where: { email: mockedUser.email },
    });

    const response = await request(app.getHttpServer())
      .post(`/shopping-cart/${user.id}`)
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body.find((item) => item.productId === 1)).toBeUndefined();
  });

  it('should delete all cart items', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ email: mockedUser.email, password: mockedUser.password });

    const user = await usersService.findOne({
      where: { email: mockedUser.email },
    });

    await request(app.getHttpServer())
      .delete(`/shopping-cart/all/${user.id}`)
      .set('Cookie', login.headers['set-cookie']);

    const response = await request(app.getHttpServer())
      .post(`/shopping-cart/${user.id}`)
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body).toStrictEqual([]);
  });
});

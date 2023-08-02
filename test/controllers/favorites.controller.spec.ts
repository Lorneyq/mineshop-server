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
import { Favorites } from 'src/favorites/favorites.model';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { ProductsModule } from 'src/products/products.module';
import { ProductsService } from 'src/products/products.service';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import * as request from 'supertest';

const mockedUser = {
  username: 'Albert',
  email: 'albert.cool@gmail.com',
  password: 'Albert123@',
};

describe('Favorites Controller', () => {
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
        FavoritesModule,
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
    const favorites = new Favorites();

    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });
    const product = await productsService.findOne(1);

    favorites.userId = user.id;
    favorites.username = user.username;
    favorites.userEmail = user.email;
    favorites.productId = product.id;
    favorites.name = product.name;
    favorites.category = product.category;
    favorites.subcategory = product.subcategory;
    favorites.price = product.price;
    favorites.image = JSON.parse(product.images)[0];

    return favorites.save();
  });

  afterEach(async () => {
    await User.destroy({ where: { username: mockedUser.username } });
    await Favorites.destroy({ where: { productId: 1 } });
  });

  it('should get all favorites items', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    const response = await request(app.getHttpServer())
      .get(`/favorites/${user.id}`)
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
          category: expect.any(String),
          subcategory: expect.any(String),
          price: expect.any(Number),
          image: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      ]),
    );
  });

  it('should add favorites items', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    await request(app.getHttpServer())
      .post(`/favorites/add`)
      .send({ username: mockedUser.username, productId: 1 })
      .set('Cookie', login.headers['set-cookie']);

    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    const response = await request(app.getHttpServer())
      .post(`/favorites/${user.id}`)
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body.find((item) => item.productId === 1)).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        userId: user.id,
        username: expect.any(String),
        userEmail: expect.any(String),
        productId: 1,
        name: expect.any(String),
        category: expect.any(String),
        subcategory: expect.any(String),
        price: expect.any(Number),
        image: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    );
  });

  it('should delete favorites item', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ email: mockedUser.email, password: mockedUser.password });

    await request(app.getHttpServer())
      .delete('/favorites/one/1')
      .set('Cookie', login.headers['set-cookie']);

    const user = await usersService.findOne({
      where: { email: mockedUser.email },
    });

    const response = await request(app.getHttpServer())
      .post(`/favorites/${user.id}`)
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body.find((item) => item.productId === 1)).toBeUndefined();
  });

  it('should delete all favorites items', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ email: mockedUser.email, password: mockedUser.password });

    const user = await usersService.findOne({
      where: { email: mockedUser.email },
    });

    await request(app.getHttpServer())
      .delete(`/favorites/all/${user.id}`)
      .set('Cookie', login.headers['set-cookie']);

    const response = await request(app.getHttpServer())
      .post(`/favorites/${user.id}`)
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body).toStrictEqual([]);
  });
});

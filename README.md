<div align='center'><img src='https://i.imgur.com/Pn7mwzl.jpg' alt='Mineshop'/></div>

# Mineshop - Online Store

Server part of Mineshop online store. Project with a wide
functionality, database, products that can be added to cart or favorites,
authorization - the store is as close as possible in complexity to the
commercial version, all details are thought out.

## Stack used

» NestJS\
» Libraries: passport, sequelize, bcrypt, jest

## Project launch

1. ❗❗️The project uses [MariaDB](https://mariadb.com/) database, and everything is based on this fact, if you want to change the database, you will have to rewrite code fragments. So first of all, create your own [MariaDB](https://mariadb.com/) database.

2. Clone the project via git

```bash
git clone https://github.com/Lorneyq/mineshop-server.git
```

3. Once fully cloned, run the installation of all dependencies

```bash
yarn install
```

4. After that, modify the `.env` file, and specify your database parameters. Also change them in the `config.json` file in the `/config` directory. All this is necessary for the correct operation of the database!

5. Start the server, and when it is running, update the Database, you will have the folders you need.

```bash
yarn start:dev
```

6. To test the full functionality of the project, you should fill the database with information. You can do it manually, or you can use the [faker library](https://npmjs.com/package/@faker-js/faker).

That's it, the whole project is up and running. Congratulations!🎉🥳

Now you can safely run the [client part](https://github.com/Lorneyq/mineshop-client), remembering to update its address in the `.env` file.

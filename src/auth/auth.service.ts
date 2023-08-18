import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { IUser } from 'types/user';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user && passwordValid) {
      return user;
    }

    return null;
  }

  async login(user: IUser) {
    const { id, email, username, createdAt, updatedAt } = user;
    return {
      id,
      email,
      username,
      createdAt,
      updatedAt,
      token: this.jwtService.sign({
        id: user.id,
        email: user.email,
        username: user.username,
      }),
    };
  }
}

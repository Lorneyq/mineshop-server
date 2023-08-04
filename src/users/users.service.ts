import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  findOne(filter: {
    where: { id?: string; username?: string; email?: string };
  }): Promise<User> {
    return this.userModel.findOne({ ...filter });
  }

  async create(
    createUserDto: CreateUserDto,
  ): Promise<User | { warningMessage: string; warningReason: string }> {
    const user = new User();
    const existingByUserName = await this.findOne({
      where: { username: createUserDto.username },
    });

    const existingByEmail = await this.findOne({
      where: { email: createUserDto.email },
    });

    if (existingByUserName) {
      return {
        warningMessage: 'A user with this username already exists',
        warningReason: 'username',
      };
    }

    if (existingByEmail) {
      return {
        warningMessage: 'A user with this email already exists',
        warningReason: 'email',
      };
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    user.username = createUserDto.username;
    user.password = hashedPassword;
    user.email = createUserDto.email;

    return user.save();
  }
}

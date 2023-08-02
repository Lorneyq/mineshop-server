import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'User' })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ example: 'Password' })
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ example: 'user@gmail.com' })
  @IsNotEmpty()
  readonly email: string;
}

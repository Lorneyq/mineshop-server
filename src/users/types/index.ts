import { ApiProperty } from '@nestjs/swagger';

export class LoginUserRequest {
  @ApiProperty({ example: 'user@gmail.com' })
  email: string;

  @ApiProperty({ example: 'user123' })
  password: string;
}

export class LoginUserResponse {
  @ApiProperty({
    example: {
      user: {
        userId: 1,
        email: 'user@gmail.com',
        username: 'User',
      },
    },
  })
  user: {
    userId: number;
    username: string;
    email: string;
  };

  @ApiProperty({ example: 'Logged in' })
  msg: string;
}

export class LogoutUserResponse {
  @ApiProperty({ example: 'session has ended' })
  msg: string;
}

export class LoginCheckResponse {
  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 'User' })
  username: string;

  @ApiProperty({ example: 'user@gmail.com' })
  email: string;
}

export class SignupResponse {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'User' })
  username: string;

  @ApiProperty({
    example: '$2b$10$J840K/XBmo4s7./Tq42RQO2XjRAbLQThLudcvZEJ/6u.LHvVXAhn6',
  })
  password: string;

  @ApiProperty({ example: 'user@gmail.com' })
  email: string;

  @ApiProperty({ example: '2023-07-01T13:13:23.444Z' })
  createdAt: string;

  @ApiProperty({ example: '2023-07-01T13:13:23.444Z' })
  updatedAt: string;
}

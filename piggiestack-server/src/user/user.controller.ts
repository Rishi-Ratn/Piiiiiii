import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(
      createUserDto.phoneNumber,
      {
        username: createUserDto.username,
        dateOfBirth: createUserDto.dateOfBirth,
        salarySlab: createUserDto.salarySlab,
        occupation: createUserDto.occupation,
      },
    );
    return user;
  }
}

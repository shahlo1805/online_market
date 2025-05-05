import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { IUser } from './interface';
import { CreateUserDto } from './dto/create-user.dto';
import { ParseIntCustomPipe } from 'src/pipes';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() user: IUser) {
    return this.authService.register(user);
  }

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @Get()
  getAllUsers() {
    return this.authService.getAllUsers();
  }

  @Get(':id')
  getOneUser(@Param('id') id: string) {
    return this.authService.getOneUser(+id);
  }

  @Patch(':id')
  updateUser(@Param('id', ParseIntCustomPipe) id: number, @Body() user: Partial<IUser>) {
    return this.authService.updateUser(id, user);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.authService.deleteUser(+id);
  }
}


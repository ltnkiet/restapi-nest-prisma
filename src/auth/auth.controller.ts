import { Controller, Post, Body } from '@nestjs/common';
import { User } from '@prisma/client'
import { LoginDto, RegisterDto } from './dto/auth.dto'
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDto) : Promise<User>{
    return this.authService.register(body)
  }

  @Post('login') 
  login(@Body() body: LoginDto) : Promise<User> {
    return this.authService.login(body)
  }
}

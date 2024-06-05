import { Controller, Post, Body } from '@nestjs/common';
import { User } from '@prisma/client'
import { LoginDto, RegisterDto } from './DTO/auth.dto'
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('auth/register')
  register(@Body() body: RegisterDto) : Promise<User>{
    return this.authService.register(body)
  }

  @Post('auth/login') 
  login(@Body() body: LoginDto) : Promise<User> {
    return this.authService.login(body)
  }
}

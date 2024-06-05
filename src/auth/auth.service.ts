import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma.service';
import { User } from '@prisma/client';
import { compare, hash } from 'bcrypt'
import { RegisterDto } from './DTO/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService
  ) {}

  async register(userData: RegisterDto): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: userData.email 
      }
    });

    if(user) {
      throw new HttpException({message: "Email has been used"}, HttpStatus.BAD_REQUEST)
    }
    
    const hashPass = await hash(userData.password, 10)

    const result = await this.prismaService.user.create({
      data: {
        ...userData,
        password: hashPass
      }
    });

    return result
    
  }

  async login(data: {email: string, password: string}): Promise<any> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: data.email 
      }
    });
    if(!user) {
      throw new HttpException({message: "Email doesn't exist"}, HttpStatus.BAD_REQUEST)
    }

    const comparePass = await compare(data.password, user.password)
    if(!comparePass) {
      throw new HttpException({message: "Password doesn't correct"}, HttpStatus.BAD_REQUEST)
    }

    const payload = { id: user.id, email: user.email, name: user.name }

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN_KEY,
      expiresIn: "3d"
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_KEY,
      expiresIn: "7d"
    });
    
    return { accessToken, refreshToken }
  }
}

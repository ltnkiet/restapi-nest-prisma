import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator'

class RegisterDto {
  @IsNotEmpty()
  name: string

  @IsEmail()
  email: string

  @MinLength(6)
  password: string

  @Matches(/(84[3|5|7|8|9])+([0-9]{8})\b/g)
  phone: string

  status: number
}

class LoginDto {
  @IsEmail()
  email: string

  @MinLength(6)
  password: string
}

export { RegisterDto, LoginDto }
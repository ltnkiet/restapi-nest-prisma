import { Controller, Query, Get, ParseIntPipe, Param, Put, Body } from '@nestjs/common';
import { UserDto, UserFilterType, UserPaginationResponseType } from './dto/user.dto';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  
  @Get()
  getAll(@Query() params:UserFilterType) : Promise<UserPaginationResponseType> {
    return this.userService.getAll(params)
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) : Promise<User> {
    return this.userService.getById(id)
  }

  @Put(":id")
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UserDto) : Promise<User> {
    return this.userService.update(id, data)
  }


}

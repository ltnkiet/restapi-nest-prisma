import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma.service';
import { UserDto, UserFilterType, UserPaginationResponseType } from './dto/user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getAll(filters:UserFilterType) : Promise<UserPaginationResponseType> {
    const item_per_page = Number(filters.item_per_page) || 10
    const page = Number(filters.page) || 1
    const search = filters.search || ""
    const skip = page > 1 ? ( page - 1) * item_per_page : 0 

    const users = await this.prismaService.user.findMany({
      take: item_per_page,
      skip,
      where: {
        OR: [
          {
            name: { contains: search }
          },
          {
            email: { contains: search }
          }
        ],
        AND: [
          { status: 1}
        ]
      },
      orderBy: { createdAt: "desc"}
    });

    const totals = await this.prismaService.user.count({
      where: {
        OR: [
          {
            name: { contains: search }
          },
          {
            email: { contains: search }
          }
        ],
        AND: [
          { status: 1}
        ]
      },
      orderBy: { createdAt: "desc"}
    });

    return {
      data: users,
      total: totals,
      currentPage: page,
      itemPerPage: item_per_page
    }
  }

  async getById(id: number) : Promise<User> {
    return await this.prismaService.user.findFirst({
      where: { id }
    });
  }

  async update(id: number, data: UserDto) : Promise<User> {
    return await this.prismaService.user.update({
      where: { id },
      data
    });
  }

}

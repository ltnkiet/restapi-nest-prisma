import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma.service';
import { PostDto } from './dto/post.dto';
import { Post } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}

  async create(data: PostDto) : Promise<Post> {
    return await this.prismaService.post.create({
      data
    });
  }
  
}

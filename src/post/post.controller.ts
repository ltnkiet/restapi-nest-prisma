import { Body, Controller, Post } from '@nestjs/common';
import { Post as PostModal } from '@prisma/client';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}
  @Post()
  create(@Body() data: PostDto) : Promise<PostModal> {
    return this.postService.create(data)
  }
}

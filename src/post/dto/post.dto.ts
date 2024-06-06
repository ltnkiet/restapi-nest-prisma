import { IsNotEmpty,  } from 'class-validator'


class PostDto {
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  sumary: string

  @IsNotEmpty()
  content: string   

  @IsNotEmpty()
  status: number

  @IsNotEmpty()
  ownerId: number
  
  @IsNotEmpty()
  categoryId: number
}

export { PostDto }
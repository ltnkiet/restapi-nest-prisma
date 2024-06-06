import { User } from "@prisma/client"
import { Matches, IsNotEmpty, IsOptional } from 'class-validator'


interface  UserFilterType {
  item_per_page?: number
  page?: number
  search?: string
}

interface  UserPaginationResponseType {
  data: User[]
  total: number
  currentPage: number
  itemPerPage: number
}

class UserDto {
  @IsOptional()
  @IsNotEmpty()
  name: string

  @IsOptional()
  @Matches(/(84[3|5|7|8|9])+([0-9]{8})\b/g)
  phone: string
}
export { UserFilterType, UserPaginationResponseType, UserDto }
import { Module } from "@nestjs/common"
import { BlogsService } from "./blogs.service"
import { BlogsResolver } from "./blogs.resolver"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "../Users/entity/user.entity"
import { Blog } from "./entity/blog.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Blog, User])],
  providers: [BlogsService, BlogsResolver],
})
export class BlogModule {}

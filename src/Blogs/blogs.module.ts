import { Module } from "@nestjs/common"
import { BlogsService } from "./blogs.service"
import { BlogsResolver } from "./blogs.resolver"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Blog } from "./entities/blog.entity"
import { Comment } from "./entities/comment.entity"
import { User } from "src/Users/entities/user.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Blog, Comment, User])],
  providers: [BlogsService, BlogsResolver],
})
export class BlogModule {}

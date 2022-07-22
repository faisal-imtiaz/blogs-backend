import { Module } from "@nestjs/common"
import { BlogsService } from "./blogs.service"
import { BlogsResolver } from "./blogs.resolver"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Blog } from "./entities/blog.entity"
import { Comment } from "./entities/comment.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Blog, Comment])],
  providers: [BlogsService, BlogsResolver],
})
export class BlogModule {}

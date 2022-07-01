import { Body, Injectable, InternalServerErrorException } from "@nestjs/common"
import { DataSource, QueryBuilder } from "typeorm"
import { CreateBlogInputDTO } from "./dto/create-blog.input.dto"
import { CreateCommentInputDTO } from "./dto/create-comment.input.dto"
import { CreateReplyInputDTO } from "./dto/create-reply.input.dto"
import { Blog } from "./entities/blog.entity"
import { Comment } from "./entities/comment.entity"
import { Reply } from "./entities/reply.entity"

@Injectable()
export class BlogsService {
  constructor(private db: DataSource) {}

  //GET-BLOGS Service
  async getBlogs(): Promise<Blog[]> {
    try {
      const blogRepository = this.db.getRepository(Blog)

      const blogs = blogRepository.find({
        relations: {
          comments: true,
          user: true,
        },
      })

      return blogs
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  //CREATE-BLOG Service
  async createBlog(
    @Body() createBlogInputDTO: CreateBlogInputDTO
  ): Promise<Blog> {
    try {
      const blogRepository = this.db.getRepository(Blog)
      const blog = new Blog()
      blog.title = createBlogInputDTO.title
      blog.content = createBlogInputDTO.content
      blog.user = createBlogInputDTO.user

      await blogRepository.save(blog)
      return blog
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  //CREATE-COMMENT Service
  async createComment(
    @Body() createCommentInputDTO: CreateCommentInputDTO
  ): Promise<Comment> {
    try {
      const commentRepository = this.db.getRepository(Comment)
      const comment = new Comment()
      comment.content = createCommentInputDTO.content
      comment.user = createCommentInputDTO.user
      comment.blog = createCommentInputDTO.blog
      await commentRepository.save(comment)
      return comment
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  //CREATE-REPLY Service
  async createReply(
    @Body() createReplyInputDTO: CreateReplyInputDTO
  ): Promise<Reply> {
    try {
      const replyRepository = this.db.getRepository(Reply)
      const reply = new Reply()
      reply.content = createReplyInputDTO.content
      reply.user = createReplyInputDTO.user
      reply.comment = createReplyInputDTO.comment
      await replyRepository.save(reply)
      return reply
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
}

import { Injectable } from "@nestjs/common"
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
      const blogs = await blogRepository.find({
        relations: {
          comments: true,
          user: true,
        },
      })
      return blogs
    } catch (error) {
      throw error
    }
  }

  //CREATE-BLOG Service
  async createBlog(createBlogInputDTO: CreateBlogInputDTO): Promise<Blog> {
    try {
      const blogRepository = this.db.getRepository(Blog)
      const blog = new Blog()
      blog.title = createBlogInputDTO.title
      blog.content = createBlogInputDTO.content
      blog.user = createBlogInputDTO.user

      await blogRepository.save(blog)
      return blog
    } catch (error) {
      throw error
    }
  }

  //CREATE-COMMENT Service
  async createComment(
    createCommentInputDTO: CreateCommentInputDTO
  ): Promise<String> {
    try {
      const commentRepository = this.db.getRepository(Comment)
      const comment = new Comment()
      comment.content = createCommentInputDTO.content
      comment.user = createCommentInputDTO.user
      comment.blog = createCommentInputDTO.blog
      await commentRepository.save(comment)
      return "Comment Added!"
    } catch (error) {
      throw error
    }
  }

  //CREATE-REPLY Service
  async createReply(createReplyInputDTO: CreateReplyInputDTO): Promise<String> {
    try {
      const replyRepository = this.db.getRepository(Reply)
      const reply = new Reply()
      reply.content = createReplyInputDTO.content
      reply.user = createReplyInputDTO.user
      reply.comment = createReplyInputDTO.comment
      await replyRepository.save(reply)
      return "Reply Added!"
    } catch (error) {
      throw error
    }
  }
}

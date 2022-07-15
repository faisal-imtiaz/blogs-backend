import { Body, Injectable, InternalServerErrorException } from "@nestjs/common"
import { text } from "express"
import { DataSource } from "typeorm"
import { User } from "../Users/entities/user.entity"
import { CreateBlogInputDTO } from "./dto/create-blog.input.dto"
import { CreateCommentInputDTO } from "./dto/create-comment.input.dto"
import { Blog } from "./entities/blog.entity"
import { Comment } from "./entities/comment.entity"

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

      const addReplyCount = (comments) =>
        comments.map(async (comment) => {
          const replyCount = await this.db.query(
            `select count(id) from "Comments" where commentId = '${comment.id}'`
          )
          return {
            ...comment,
            replyCount: replyCount[0]?.count,
          }
        })

      blogs.map((blog: Blog) => {
        const updatedComments = addReplyCount(blog.comments)
        blog.comments = updatedComments
      })

      return blogs
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  //MY-BLOGS Service
  async getMyBlogs(id: string): Promise<Blog[]> {
    try {
      const blogRepository = this.db.getRepository(Blog)
      const blogs = await blogRepository.find({
        relations: {
          comments: true,
          user: true,
        },
      })

      //RE-FACTORING PENDING
      // NOT ABLE TO USE UUID IN WHERE CLAUSE
      // const newBlogs = await this.db.query(
      //   `select * from "Blogs" where user = '${id}'`
      // )
      // console.log("NEW-BLOGS: ", newBlogs)

      const userBlogs = blogs?.filter((blog: any) => {
        return blog?.user?.id === id
      })

      return userBlogs
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  //GET-REPLIES Service
  async getReplies(id: string): Promise<Comment[]> {
    try {
      const commentRepository = this.db.getRepository(Comment)
      const replies = await commentRepository.find({
        where: { commentid: id },
        relations: { user: true },
      })
      return replies
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
      comment.commentid = createCommentInputDTO.commentid

      await commentRepository.save(comment)
      return comment
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
}

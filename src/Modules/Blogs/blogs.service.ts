import {
  Body,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { CreateBlogInputDTO } from "./dto/create-blog.input.dto"
import { CreateCommentInputDTO } from "./dto/create-comment.input.dto"
import { Blog } from "./entities/blog.entity"
import { Comment } from "./entities/comment.entity"

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) {}

  //GET-BLOGS Service
  async getBlogs(): Promise<Blog[]> {
    try {
      const blogs = await this.blogRepository.find({
        relations: {
          comments: true,
          user: true,
        },
      })

      //ADDING REPLY-COUNT IN EACH COMMENT
      const addReplyCount = (comments) =>
        comments.map(async (comment: Comment) => {
          const replyCount = await this.commentRepository.count({
            where: { commentid: comment.id },
          })
          return {
            ...comment,
            replyCount,
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
      const blogs = await this.blogRepository.find({
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

      //ADDING REPLY-COUNT IN EACH COMMENT
      const addReplyCount = (comments) =>
        comments.map(async (comment: Comment) => {
          const replyCount = await this.commentRepository.count({
            where: { commentid: comment.id },
          })
          return {
            ...comment,
            replyCount,
          }
        })

      userBlogs.map((blog: Blog) => {
        const updatedComments = addReplyCount(blog.comments)
        blog.comments = updatedComments
      })

      return userBlogs
    } catch (error) {
      throw new NotFoundException("User not Authorized")
    }
  }

  //GET-REPLIES Service
  async getReplies(id: string): Promise<Comment[]> {
    try {
      const replies = await this.commentRepository.find({
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
      const blog = new Blog()
      blog.title = createBlogInputDTO.title
      blog.content = createBlogInputDTO.content
      blog.user = createBlogInputDTO.user

      await this.blogRepository.save(blog)
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
      const comment = new Comment()
      comment.content = createCommentInputDTO.content
      comment.user = createCommentInputDTO.user
      comment.blog = createCommentInputDTO.blog
      comment.commentid = createCommentInputDTO.commentid

      await this.commentRepository.save(comment)
      return comment
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
}

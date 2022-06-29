import { Injectable } from "@nestjs/common"
import { DataSource } from "typeorm"
import { CreateBlogDTO } from "./dto/create-blog.input.dto"
import { CreateCommentDTO } from "./dto/create-comment.input.dto"
import { NewReplyDTO } from "./dto/create-reply.input.dto"
import { User } from "../Users/entities/user.entity"
import { Blog } from "./entities/blog.entity"
import { Comment } from "./entities/comment.entity"
import { Reply } from "./entities/reply.entity"

@Injectable()
export class BlogsService {
  constructor(private db: DataSource) {}

  /**
   * GET-BLOGS service
   **/
  async getBlogs(): Promise<Blog[]> {
    try {
      const userRepository = this.db.getRepository(User)
      const blogRepository = this.db.getRepository(Blog)
      const commentRepository = this.db.getRepository(Comment)
      const replyRepository = this.db.getRepository(Reply)

      const users = await userRepository.find()
      const blogs = await blogRepository.find()
      const comments = await commentRepository.find()
      const replies = await replyRepository.find()

      blogs?.map((blog: Blog) => {
        users.map((user) => {
          if (user.id === blog.userid) {
            blog.author = user.name
            return
          }
        })
        blog.comments = []
        comments?.map((comment: Comment) => {
          if (blog.id === comment.blogid) {
            users?.map((user) => {
              if (user.id === comment.userid) {
                comment.userName = user.name
                return
              }
            })

            blog.comments.push(comment)

            comment.replies = []
            replies?.map((reply: Reply) => {
              if (reply.commentid === comment.id) {
                users?.map((user: User) => {
                  if (user.id === reply.userid) {
                    reply.userName = user.name
                    return
                  }
                })
                comment.replies.push(reply)
              }
            })
          }
        })
      })

      return blogs
    } catch (error) {
      throw error
    }
  }

  /**
   * NEW-BLOG service
   */
  async newBlog(args: CreateBlogDTO): Promise<Blog> {
    try {
      const blogRepository = this.db.getRepository(Blog)
      const blog = new Blog()
      blog.title = args.title
      blog.content = args.content
      blog.userid = parseInt(args.userid)
      await blogRepository.save(blog)
      return blog
    } catch (error) {
      throw error
    }
  }

  /**
   * NEW-COMMENT service
   */
  async newComment(args: CreateCommentDTO): Promise<String> {
    try {
      const commentRepository = this.db.getRepository(Comment)
      const comment = new Comment()
      comment.content = args.content
      comment.userid = parseInt(args.userid)
      comment.blogid = args.blogid
      await commentRepository.save(comment)
      return "Comment Added!"
    } catch (error) {
      throw error
    }
  }

  /**
   * NEW-REPLY service
   */
  async newReply(args: NewReplyDTO): Promise<String> {
    try {
      const replyRepository = this.db.getRepository(Reply)
      const reply = new Reply()
      reply.content = args.content
      reply.userid = parseInt(args.userid)
      reply.commentid = args.commentid
      await replyRepository.save(reply)
      return "Reply Added!"
    } catch (error) {
      throw error
    }
  }
}

import { Injectable } from "@nestjs/common"
import { DataSource } from "typeorm"
import { NewBlogDTO } from "./dto/new-blog.dto"
import { NewCommentDTO } from "./dto/new-comment.dto"
import { NewReplyDTO } from "./dto/new-reply.dto"
import { User } from "../Users/entity/user.entity"
import { Blog } from "./entity/blog.entity"
import { Comment } from "./entity/comment.entity"
import { Reply } from "./entity/reply.entity"
import { BlogType } from "src/Types/BlogType"
import { CommentType } from "src/Types/CommentType"
import { ReplyType } from "src/Types/ReplyType"
import { UserType } from "src/Types/UserType"

@Injectable()
export class BlogsService {
  constructor(private db: DataSource) {}

  async getBlogs(): Promise<BlogType[]> {
    try {
      const userRepository = this.db.getRepository(User)
      const blogRepository = this.db.getRepository(Blog)
      const commentRepository = this.db.getRepository(Comment)
      const replyRepository = this.db.getRepository(Reply)

      const users = await userRepository.find()
      const blogs = await blogRepository.find()
      const comments = await commentRepository.find()
      const replies = await replyRepository.find()

      blogs?.map((blog: BlogType) => {
        users.forEach((user) => {
          if (user.id === blog.userid) {
            blog.author = user.name
            return
          }
        })
        blog.comments = []
        comments?.forEach((comment: CommentType) => {
          if (blog.id === comment.blogid) {
            users?.forEach((user) => {
              if (user.id === comment.userid) {
                comment.userName = user.name
                return
              }
            })

            blog.comments.push(comment)

            comment.replies = []
            replies?.forEach((reply: ReplyType) => {
              if (reply.commentid === comment.id) {
                users?.forEach((user: UserType) => {
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

  async newBlog(args: NewBlogDTO): Promise<BlogType> {
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

  async newComment(args: NewCommentDTO): Promise<String> {
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

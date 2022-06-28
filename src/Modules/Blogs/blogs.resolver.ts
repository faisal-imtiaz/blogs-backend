import { Resolver, Query, Args, Mutation } from "@nestjs/graphql"
import { BlogsService } from "./blogs.service"
import { NewBlogDTO } from "./dto/new-blog.dto"
import { NewCommentDTO } from "./dto/new-comment.dto"
import { NewReplyDTO } from "./dto/new-reply.dto"
import { BlogType } from "../../Types/BlogType"

@Resolver()
export class BlogsResolver {
  constructor(private readonly blogsService: BlogsService) {}

  //ALL-BLOGS QUERY
  @Query(() => [BlogType], { name: "blogs" })
  async getBlogs(): Promise<BlogType[]> {
    const blogs = await this.blogsService.getBlogs()
    return blogs
  }

  //NEW-BLOG MUTATION
  @Mutation(() => BlogType, { name: "newBlog" })
  newBlog(@Args("newBlogDTO") newBlogDTO: NewBlogDTO): Promise<BlogType> {
    const blog = this.blogsService.newBlog(newBlogDTO)
    return blog
  }

  //NEW-COMMENT MUTATION
  @Mutation(() => String, { name: "newComment" })
  newComment(
    @Args("newCommentDTO") newCommentDTO: NewCommentDTO
  ): Promise<String> {
    const comment = this.blogsService.newComment(newCommentDTO)
    return comment
  }

  //NEW-REPLY MUTATION
  @Mutation(() => String, { name: "newReply" })
  newReply(@Args("newReplyDTO") newReplyDTO: NewReplyDTO): Promise<String> {
    const reply = this.blogsService.newReply(newReplyDTO)
    return reply
  }
}

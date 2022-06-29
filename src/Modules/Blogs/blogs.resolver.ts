import { Resolver, Query, Args, Mutation } from "@nestjs/graphql"
import { BlogsService } from "./blogs.service"
import { CreateBlogDTO } from "./dto/create-blog.input.dto"
import { CreateCommentDTO } from "./dto/create-comment.input.dto"
import { NewReplyDTO } from "./dto/create-reply.input.dto"
import { Blog } from "./entities/blog.entity"

@Resolver()
export class BlogsResolver {
  constructor(private readonly blogsService: BlogsService) {}

  //ALL-BLOGS QUERY
  @Query(() => [Blog], { name: "getBlogs" })
  async getBlogs(): Promise<Blog[]> {
    const blogs = await this.blogsService.getBlogs()
    return blogs
  }

  //NEW-BLOG MUTATION
  @Mutation(() => Blog, { name: "newBlog" })
  newBlog(@Args("createBlogDTO") createBlogDTO: CreateBlogDTO): Promise<Blog> {
    const blog = this.blogsService.newBlog(createBlogDTO)
    return blog
  }

  //NEW-COMMENT MUTATION
  @Mutation(() => String, { name: "newComment" })
  newComment(
    @Args("createCommentDTO") createCommentDTO: CreateCommentDTO
  ): Promise<String> {
    const comment = this.blogsService.newComment(createCommentDTO)
    return comment
  }

  //NEW-REPLY MUTATION
  @Mutation(() => String, { name: "newReply" })
  newReply(@Args("newReplyDTO") newReplyDTO: NewReplyDTO): Promise<String> {
    const reply = this.blogsService.newReply(newReplyDTO)
    return reply
  }
}

import { Resolver, Query, Args, Mutation } from "@nestjs/graphql"
import { BlogsService } from "./blogs.service"
import { CreateBlogInputDTO } from "./dto/create-blog.input.dto"
import { CreateCommentInputDTO } from "./dto/create-comment.input.dto"
import { CreateReplyInputDTO } from "./dto/create-reply.input.dto"
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

  //CREATE-BLOG MUTATION
  @Mutation(() => Blog, { name: "createBlog" })
  createBlog(
    @Args("createBlogInputDTO") createBlogInputDTO: CreateBlogInputDTO
  ): Promise<Blog> {
    const blog = this.blogsService.createBlog(createBlogInputDTO)
    return blog
  }

  //CREATE-COMMENT MUTATION
  @Mutation(() => String, { name: "createComment" })
  createComment(
    @Args("createCommentInputDTO") createCommentInputDTO: CreateCommentInputDTO
  ): Promise<String> {
    const comment = this.blogsService.createComment(createCommentInputDTO)
    return comment
  }

  //CREATE-REPLY MUTATION
  @Mutation(() => String, { name: "createReply" })
  createReply(
    @Args("createReplyInputDTO") createReplyInputDTO: CreateReplyInputDTO
  ): Promise<String> {
    const reply = this.blogsService.createReply(createReplyInputDTO)
    return reply
  }
}

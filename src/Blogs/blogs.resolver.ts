import { Resolver, Query, Args, Mutation } from "@nestjs/graphql"
import { BlogsService } from "./blogs.service"
import { CreateBlogInputDTO } from "./dto/create-blog.input.dto"
import { CreateCommentInputDTO } from "./dto/create-comment.input.dto"
import { Blog } from "./entities/blog.entity"
import { Comment } from "./entities/comment.entity"

@Resolver()
export class BlogsResolver {
  constructor(private readonly blogsService: BlogsService) {}

  //ALL-BLOGS QUERY
  @Query(() => [Blog], { name: "getBlogs" })
  async getBlogs(): Promise<Blog[]> {
    const blogs = await this.blogsService.getBlogs()
    return blogs
  }

  //MY-BLOGS QUERY
  @Query(() => [Blog], { name: "getMyBlogs" })
  async getMyBlogs(@Args("id") id: string): Promise<Blog[]> {
    const blogs = await this.blogsService.getMyBlogs(id)
    return blogs
  }

  //GET-REPLIES QUERY
  @Query(() => [Comment], { name: "getReplies" })
  async getReplies(@Args("id") id: string): Promise<Comment[]> {
    const blogs = await this.blogsService.getReplies(id)
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
  @Mutation(() => Comment, { name: "createComment" })
  createComment(
    @Args("createCommentInputDTO") createCommentInputDTO: CreateCommentInputDTO
  ): Promise<Comment> {
    const comment = this.blogsService.createComment(createCommentInputDTO)
    return comment
  }
}

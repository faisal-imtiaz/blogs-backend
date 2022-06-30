import { Field, InputType, Int } from "@nestjs/graphql"
@InputType()
export class CreateBlogInputDTO {
  @Field()
  title: string

  @Field()
  content: string

  @Field()
  user: string
}

import { Field, InputType } from "@nestjs/graphql"
@InputType()
export class CreateBlogInputDTO {
  @Field()
  title: string

  @Field()
  content: string

  @Field()
  user: string
}

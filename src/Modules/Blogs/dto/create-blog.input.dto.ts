import { Field, InputType, Int } from "@nestjs/graphql"
@InputType()
export class CreateBlogDTO {
  @Field()
  title: string

  @Field()
  content: string

  @Field()
  userid: string
}

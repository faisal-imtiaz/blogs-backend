import { Field, InputType, Int } from "@nestjs/graphql"

@InputType()
export class CreateCommentDTO {
  @Field()
  content: string

  @Field()
  userid: string

  @Field(() => Int)
  blogid: Number
}

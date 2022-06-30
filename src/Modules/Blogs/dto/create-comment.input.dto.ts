import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class CreateCommentInputDTO {
  @Field()
  content: string

  @Field()
  user: string

  @Field()
  blog: string
}

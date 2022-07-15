import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class CreateCommentInputDTO {
  @Field()
  content: string

  @Field()
  user: string

  @Field({ nullable: true })
  blog?: string

  @Field({ nullable: true })
  commentid?: string
}

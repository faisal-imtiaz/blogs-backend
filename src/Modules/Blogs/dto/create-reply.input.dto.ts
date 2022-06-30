import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class CreateReplyInputDTO {
  @Field()
  content: string

  @Field()
  user: string

  @Field()
  comment: string
}

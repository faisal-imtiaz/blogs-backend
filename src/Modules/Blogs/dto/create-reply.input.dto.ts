import { Field, InputType, Int } from "@nestjs/graphql"

@InputType()
export class NewReplyDTO {
  @Field()
  content: string

  @Field()
  userid: string

  @Field(() => Int)
  commentid: number
}

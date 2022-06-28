import { Field, Int, ObjectType } from "@nestjs/graphql"
import { ReplyType } from "./ReplyType"

@ObjectType()
export class CommentType {
  @Field(() => Int)
  id?: number

  @Field()
  content?: string

  @Field(() => Int)
  userid?: Number

  @Field(() => Int)
  blogid?: Number

  @Field()
  userName?: string

  @Field(() => [ReplyType])
  replies?: ReplyType[]
}

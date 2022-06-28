import { Field, Int, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class ReplyType {
  @Field(() => Int, { nullable: true })
  id?: number

  @Field()
  content: string

  @Field()
  userid: number

  @Field()
  userName?: string

  @Field(() => Int)
  commentid: number
}

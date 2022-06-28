import { Field, Int, ObjectType } from "@nestjs/graphql"
import { CommentType } from "./CommentType"

@ObjectType()
export class BlogType {
  @Field(() => Int, { nullable: true })
  id?: number

  @Field({ nullable: true })
  title: string

  @Field()
  content: string

  @Field()
  userid: number

  @Field(() => [CommentType])
  comments?: CommentType[]

  @Field()
  author?: string
}

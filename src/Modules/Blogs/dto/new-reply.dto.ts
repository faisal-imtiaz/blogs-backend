import { Field, InputType, Int } from "@nestjs/graphql"
import { IsNotEmpty } from "class-validator"

@InputType()
export class NewReplyDTO {
  @Field()
  @IsNotEmpty()
  content: string

  @Field()
  @IsNotEmpty()
  userid: string

  @Field(() => Int)
  @IsNotEmpty()
  commentid: number
}

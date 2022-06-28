import { Field, InputType, Int } from "@nestjs/graphql"
import { IsNotEmpty } from "class-validator"

@InputType()
export class NewCommentDTO {
  @Field()
  @IsNotEmpty()
  content: string

  @Field()
  @IsNotEmpty()
  userid: string

  @Field(() => Int)
  @IsNotEmpty()
  blogid: Number
}

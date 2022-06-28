import { Field, InputType, Int } from "@nestjs/graphql"
import { IsNotEmpty } from "class-validator"

@InputType()
export class NewBlogDTO {
  @Field()
  @IsNotEmpty()
  title: string

  @Field()
  @IsNotEmpty()
  content: string

  @Field()
  @IsNotEmpty()
  userid: string
}

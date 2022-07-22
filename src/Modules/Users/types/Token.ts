import { Field, ObjectType } from "@nestjs/graphql"
import { ResponseHeader } from "src/utills/types"

@ObjectType()
export class TokenType {
  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  jwt?: string

  // @Field(() => ResponseHeader)
  // response: ResponseHeader
}

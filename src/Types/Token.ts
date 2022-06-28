import { Field, Int, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class TokenType {
  @Field(() => Int, { nullable: true })
  id?: Number

  @Field({ nullable: true })
  jwt?: string
}

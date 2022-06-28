import { Field, Int, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class UserType {
  @Field(() => Int)
  id: number

  @Field()
  name: string

  @Field()
  email: string

  @Field()
  password: string
}

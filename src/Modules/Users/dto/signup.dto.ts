import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class SignupDTO {
  @Field()
  name: string

  @Field()
  email: string

  @Field()
  password: string
}

import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class LoginPayloadDTO {
  @Field()
  email: string

  @Field()
  password: string
}

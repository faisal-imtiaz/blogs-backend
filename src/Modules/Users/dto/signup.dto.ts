import { Field, InputType } from "@nestjs/graphql"
import { IsEmail, IsNotEmpty } from "class-validator"

@InputType()
export class SignupDTO {
  @Field()
  @IsNotEmpty()
  name: string

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @Field()
  @IsNotEmpty()
  password: string
}

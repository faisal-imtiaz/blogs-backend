import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class Response {
  @Field()
  public status: number

  @Field()
  public msg: string
}

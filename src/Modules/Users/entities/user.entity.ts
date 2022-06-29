import { Field, Int, ObjectType } from "@nestjs/graphql"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@ObjectType()
@Entity({ name: "Users" })
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  public id: number

  @Column()
  @Field()
  public name: string

  @Column()
  @Field()
  public email: string

  @Column()
  @Field()
  public password: string
}

import { Field, Int, ObjectType } from "@nestjs/graphql"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { Reply } from "./reply.entity"

@ObjectType()
@Entity({ name: "Comments" })
export class Comment {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  public id: number

  @Column()
  @Field()
  public content: string

  @Column()
  @Field(() => Int)
  public userid: Number

  @Column()
  @Field(() => Int)
  public blogid: Number

  @Field()
  userName: string

  @Field(() => [Reply])
  replies?: Reply[]
}

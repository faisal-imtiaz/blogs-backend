import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column } from "typeorm"
import { Field, Int, ObjectType } from "@nestjs/graphql"
import { Comment } from "./comment.entity"
import { v4 as uuid } from "uuid"

@ObjectType()
@Entity({ name: "Blogs" })
export class Blog {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  public id: number

  @Column()
  @Field()
  public title: string

  @Column()
  @Field()
  public content: string

  @Column()
  @Field()
  public userid: number

  @Field(() => [Comment])
  comments?: Comment[]

  @Field()
  author: string
}

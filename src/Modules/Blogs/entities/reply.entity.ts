import { Field, Int, ObjectType } from "@nestjs/graphql"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@ObjectType()
@Entity({ name: "Replies" })
export class Reply {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number

  @Column()
  @Field()
  content: string

  @Column()
  @Field()
  userid: number

  @Column()
  @Field(() => Int)
  commentid: number

  @Field()
  userName: string
}

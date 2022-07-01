import { Field, ObjectType } from "@nestjs/graphql"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "src/Modules/Users/entities/user.entity"
import { Comment } from "./comment.entity"

@ObjectType()
@Entity({ name: "Replies" })
export class Reply {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  public id: string

  @Column()
  @Field()
  public content: string

  // RELATIONS

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.replies, { eager: true })
  public user: string

  @ManyToOne(() => Comment, (comment) => comment.replies)
  public comment: string
}

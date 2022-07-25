import { Field, ObjectType } from "@nestjs/graphql"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Blog } from "./blog.entity"
import { User } from "src/Users/entities/user.entity"

@ObjectType()
@Entity({ name: "Comments" })
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  public id: string

  @Column()
  @Field()
  public content: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  public commentid: string

  @Field({ nullable: true })
  replyCount?: string

  // RELATIONS

  @Field({ nullable: true })
  @ManyToOne(() => Blog, (blog) => blog.comments, { nullable: true })
  public blog: string

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.comments, { eager: true })
  public user: string
}

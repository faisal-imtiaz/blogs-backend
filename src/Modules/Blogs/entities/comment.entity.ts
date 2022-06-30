import { Field, ObjectType } from "@nestjs/graphql"
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm"
import { Reply } from "./reply.entity"
import { Blog } from "./blog.entity"
import { User } from "src/Modules/Users/entities/user.entity"

@ObjectType()
@Entity({ name: "Comments" })
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  public id: string

  @Column()
  @Field()
  public content: string

  // RELATIONS!

  @Field(() => [Reply])
  @OneToMany(() => Reply, (reply) => reply.comment, { eager: true })
  public replies: Reply[]

  @ManyToOne(() => Blog, (blog) => blog.comments)
  public blog: string

  @ManyToOne(() => User, (user) => user.comments)
  public user: string
}

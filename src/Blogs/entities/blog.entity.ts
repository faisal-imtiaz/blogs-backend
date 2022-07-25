import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm"
import { Field, ObjectType } from "@nestjs/graphql"
import { Comment } from "./comment.entity"
import { User } from "src/Users/entities/user.entity"

@ObjectType()
@Entity({ name: "Blogs" })
export class Blog {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  public id: string

  @Column()
  @Field()
  public title: string

  @Column()
  @Field()
  public content: string

  // RELATIONS

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.blog, { eager: true })
  public comments: Comment[]

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.blogs)
  public user: string
}

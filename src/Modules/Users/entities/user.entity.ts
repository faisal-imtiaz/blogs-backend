import { Field, ObjectType } from "@nestjs/graphql"
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Blog } from "src/Modules/Blogs/entities/blog.entity"
import { Comment } from "src/Modules/Blogs/entities/comment.entity"

@ObjectType()
@Entity({ name: "Users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  public id: string

  @Column()
  @Field()
  public name: string

  @Column()
  @Field()
  public email: string

  @Column()
  @Field()
  public password: string

  // RELATIONS

  @Field(() => [Blog])
  @OneToMany(() => Blog, (blog) => blog.user)
  public blogs: Blog[]

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.user)
  public comments: Comment[]
}

import { Field, ObjectType } from "@nestjs/graphql"
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Blog } from "src/Blogs/entities/blog.entity"
import { Comment } from "src/Blogs/entities/comment.entity"
import { ResponseHeader } from "src/utills/types"

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

  // @Field(() => ResponseHeader)
  // res: ResponseHeader

  // RELATIONS

  @Field(() => [Blog])
  @OneToMany(() => Blog, (blog) => blog.user)
  public blogs: Blog[]

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.user)
  public comments: Comment[]
}

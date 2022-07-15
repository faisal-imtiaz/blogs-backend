import { Module } from "@nestjs/common"
import { BlogModule } from "./Modules/Blogs/blogs.module"
import { UsersModule } from "./Modules/Users/users.module"
import { TypeOrmModule } from "@nestjs/typeorm"
import { GraphQLModule } from "@nestjs/graphql"
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { join } from "path"
import { User } from "./Modules/Users/entities/user.entity"
import { Blog } from "./Modules/Blogs/entities/blog.entity"
import { Comment } from "./Modules/Blogs/entities/comment.entity"

@Module({
  imports: [
    BlogModule,
    UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "root",
      database: "blogsDB",
      entities: [User, Blog, Comment],
      synchronize: true,
    }),
  ],
})
export class AppModule {}

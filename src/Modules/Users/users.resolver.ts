import { Mutation, Resolver, Args } from "@nestjs/graphql"
import { TokenType } from "src/Types/Token"
import { CreateUserInputDTO } from "./dto/create-user.input"
import { UsersService } from "./users.service"
import { LoginPayloadDTO } from "./dto/login.payload.dto"
import { User } from "./entities/user.entity"

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  //SIGNUP MUTATION
  @Mutation(() => User, { name: "signup" })
  signup(
    @Args("createUserInputDTO") createUserInputDTO: CreateUserInputDTO
  ): Promise<User> {
    const user = this.usersService.signup(createUserInputDTO)
    return user
  }

  //GET-USERS MUTATION
  @Mutation(() => TokenType, { name: "login" })
  async login(
    @Args("loginDTO") loginPayloadDTO: LoginPayloadDTO
  ): Promise<TokenType> {
    const token = await this.usersService.login(loginPayloadDTO)
    return token
  }
}

import { Mutation, Resolver, Args } from "@nestjs/graphql"
import { TokenType } from "src/Types/Token"
import { SignupDTO } from "./dto/signup.dto"
import { UsersService } from "./users.service"
import { LoginDTO } from "./dto/login.dto"

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  //SIGNUP MUTATION
  @Mutation(() => String, { name: "signup" })
  signup(@Args("signupDTO") signupDTO: SignupDTO): Promise<String> {
    const user = this.usersService.signup(signupDTO)
    return user
  }

  //GET-USERS MUTATION
  @Mutation(() => TokenType, { name: "login" })
  async login(
    @Args("loginDTO") loginDTO: LoginDTO
  ): Promise<String | TokenType> {
    const token = await this.usersService.login(loginDTO)
    return token
  }
}

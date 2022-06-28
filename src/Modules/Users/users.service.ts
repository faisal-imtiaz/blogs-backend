const jwt = require("jsonwebtoken")
import { DataSource } from "typeorm"
import { Injectable } from "@nestjs/common"
import { TokenType } from "src/Types/Token"
import { SignupDTO } from "./dto/signup.dto"
import { LoginDTO } from "./dto/login.dto"
import { User } from "./entity/user.entity"

@Injectable()
export class UsersService {
  constructor(private db: DataSource) {}

  //SIGN-UP
  async signup(args: SignupDTO): Promise<String> {
    try {
      const userRepository = this.db.getRepository(User)
      const user = await userRepository.findOneBy({ email: args.email })
      if (user) {
        return "User Already Exists!"
      } else {
        const user = new User()
        user.name = args.name
        user.email = args.email
        user.password = args.password
        await userRepository.save(user)
        return "User Added!"
      }
    } catch (error) {
      throw error
    }
  }

  //LOGIN
  async login(args: LoginDTO): Promise<String | TokenType> {
    try {
      const userRepository = this.db.getRepository(User)
      const user = await userRepository.findOneBy({
        email: args.email,
        password: args.password,
      })
      if (user) {
        const payload = {
          email: args.email,
        }
        const signedToken = jwt.sign(payload, "kwanso")
        const token = { id: user.id, jwt: signedToken }
        return token
      } else {
        return "incorrect Credentials!"
      }
    } catch (error) {
      throw error
    }
  }
}

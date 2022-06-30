const jwt = require("jsonwebtoken")
import { DataSource } from "typeorm"
import { Injectable } from "@nestjs/common"
import { TokenType } from "src/Types/Token"
import { CreateUserInputDTO } from "./dto/create-user.input"
import { LoginPayloadDTO } from "./dto/login.payload.dto"
import { User } from "./entities/user.entity"

@Injectable()
export class UsersService {
  constructor(private db: DataSource) {}

  //SIGNUP service
  async signup(createUserInputDTO: CreateUserInputDTO): Promise<User> {
    try {
      const userRepository = this.db.getRepository(User)
      const user = await userRepository.findOneBy({
        email: createUserInputDTO.email,
      })
      if (user) {
        return //EXCEPTION-THROW PENDING
      } else {
        const user = new User()
        user.name = createUserInputDTO.name
        user.email = createUserInputDTO.email
        user.password = createUserInputDTO.password
        await userRepository.save(user)
        return user
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * LOGIN service
   */
  async login(loginPayloadDTO: LoginPayloadDTO): Promise<TokenType> {
    try {
      const userRepository = this.db.getRepository(User)
      const user = await userRepository.findOneBy({
        email: loginPayloadDTO.email,
        password: loginPayloadDTO.password,
      })
      if (user) {
        const payload = {
          email: loginPayloadDTO.email,
        }
        const signedToken = jwt.sign(payload, "kwanso")
        const token = { id: user.id, jwt: signedToken }
        return token
      } else {
        return { id: null, jwt: null }
      }
    } catch (error) {
      throw error
    }
  }
}

const jwt = require("jsonwebtoken")
import { DataSource } from "typeorm"
import {
  Injectable,
  NotFoundException,
  ConflictException,
  Body,
} from "@nestjs/common"
import { TokenType } from "src/Types/Token"
import { CreateUserInputDTO } from "./dto/create-user.input"
import { LoginPayloadDTO } from "./dto/login.payload.dto"
import { User } from "./entities/user.entity"

@Injectable()
export class UsersService {
  constructor(private db: DataSource) {}

  //SIGNUP Service
  async signup(@Body() createUserInputDTO: CreateUserInputDTO): Promise<User> {
    try {
      const userRepository = this.db.getRepository(User)
      const user = await userRepository.findOneBy({
        email: createUserInputDTO.email,
      })
      if (user) {
        throw new ConflictException()
      } else {
        const user = new User()
        user.name = createUserInputDTO.name
        user.email = createUserInputDTO.email
        user.password = createUserInputDTO.password
        await userRepository.save(user)
        return user
      }
    } catch (error) {
      throw new ConflictException()
    }
  }

  /**
   * LOGIN service
   */
  async login(@Body() loginPayloadDTO: LoginPayloadDTO): Promise<TokenType> {
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
        throw new NotFoundException()
      }
    } catch (error) {
      throw error
    }
  }
}

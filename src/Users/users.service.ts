const jwt = require("jsonwebtoken")
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import {
  Injectable,
  NotFoundException,
  ConflictException,
  Body,
} from "@nestjs/common"
import { TokenType } from "./types/Token"
import { CreateUserInputDTO } from "./dto/create-user.input"
import { LoginPayloadDTO } from "./dto/login.payload.dto"
import { User } from "./entities/user.entity"

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  //SIGNUP Service
  async signup(@Body() createUserInputDTO: CreateUserInputDTO): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({
        email: createUserInputDTO.email,
      })
      if (user) {
        throw new ConflictException("User already exist!")
      } else {
        const user = new User()
        user.name = createUserInputDTO.name
        user.email = createUserInputDTO.email
        user.password = createUserInputDTO.password
        await this.userRepository.save(user)
        return user
      }
    } catch (error) {
      throw new NotFoundException("Something went wrong!")
    }
  }

  //LOGIN service
  async login(@Body() loginPayloadDTO: LoginPayloadDTO): Promise<TokenType> {
    try {
      const user = await this.userRepository.findOneBy({
        email: loginPayloadDTO.email,
        password: loginPayloadDTO.password,
      })
      const payload = {
        email: loginPayloadDTO.email,
      }
      const signedToken = jwt.sign(payload, "kwanso")
      const token = {
        id: user.id,
        jwt: signedToken,
        res: {
          status: 200,
          message: "Logged-in",
        },
      }
      return token
    } catch (error) {
      throw new NotFoundException("User not found!")
    }
  }
}

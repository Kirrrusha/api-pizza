import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt'
import { Model, Types } from 'mongoose'
import { AuthCredentialsDto } from 'src/modules/auth/dto/auth-credentials.dto'

import { CreateUserDto } from '../dto/create-user.dto'
import { StatusEnum } from '../enums/status.enum'
import { User } from '../schemas/user.schema'
import { lineDelimiter } from './../../../helpers'

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userDB: Model<User>,
  ) {}
  private readonly saltRounds = 10

  async createUser(payload: CreateUserDto): Promise<User> {
    const { email, username } = payload
    const prefix = `USER [NAME: ${username}, EMAIL: ${email}]`

    try {
      const salt = await bcrypt.genSalt(this.saltRounds)
      const password = await this.hashPassword(payload.password, salt)

      Logger.log(`${prefix} CREATE START`)
      const result = await this.userDB.create({
        email,
        username,
        password,
      })

      Logger.log(`${prefix} CREATE SUCCESS`)
      lineDelimiter()

      return result
    } catch (e) {
      Logger.error(`${prefix} CREATE ERROR: ${e.message}`)
      lineDelimiter()
    }
  }

  async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { username, password } = authCredentialsDto
    const user = await this.userDB.findOne({ username })
    if (user && (await user.validatePassword(password))) {
      return user
    } else {
      return null
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt)
  }

  async getAll(): Promise<User[]> {
    try {
      Logger.log('USER FIND ALL START')

      const result = await this.userDB.find()
      Logger.log('USER FIND ALL SUCCESS')
      lineDelimiter()

      return result
    } catch (e) {
      Logger.error(`FIND ALL ERROR: ${e.message}`)
      lineDelimiter()
    }
  }

  async findById(id: Types.ObjectId): Promise<User> {
    const prefix = `USER [MONGO ID: ${id}]`
    try {
      Logger.log(`${prefix} FIND BY ID START`)

      const result = await this.userDB.findById(id)
      Logger.log(`${prefix} FIND BY ID SUCCESS`)
      lineDelimiter()

      return result
    } catch (e) {
      Logger.error(`${prefix} FIND BY ID ERROR: ${e.message}`)
      lineDelimiter()
    }
  }

  async verifyUser({ id, status }): Promise<User> {
    const prefix = `USER [MONGO ID: ${id}]`

    if (status === StatusEnum.blocked) {
      throw Error('This user blocked')
    }

    if (status === StatusEnum.active) {
      throw Error('This user active')
    }

    try {
      Logger.log(`${prefix} VERIFY START`)

      const result = await this.userDB.findByIdAndUpdate(
        id,
        {
          status: StatusEnum.active,
        },
        { returnDocument: 'after' },
      )
      Logger.log(`${prefix} VERIFY SUCCESS`)

      return result
    } catch (e) {
      Logger.error(`${prefix} VERIFY ERROR: ${e.message}`)
      lineDelimiter()
    }
  }

  async findByEmail(email: string): Promise<User> {
    const prefix = `USER [EMAIL: ${email}]`

    try {
      Logger.log(`${prefix} FIND BY EMAIL START`)

      const result = await this.userDB.findOne({ email })
      Logger.log(`${prefix} FIND BY EMAIL SUCCESS`)
      lineDelimiter()

      return result
    } catch (e) {
      Logger.error(`${prefix} FIND BY EMAIL ERROR: ${e.message}`)
      lineDelimiter()
    }
  }

  async updateUser(id: number, payload: Partial<User>) {
    const prefix = `USER [MONGO ID: ${id}]`

    try {
      Logger.log(`${prefix} UPDATE START`)

      const result = await this.userDB.findByIdAndUpdate(id, payload, { returnDocument: 'after' }).lean().exec()
      Logger.log(`${prefix} UPDATE SUCCESS`)

      return result
    } catch (e) {
      Logger.log(`${prefix} UPDATE ERROR: ${e.message}`)
    }
  }

  async deleteUser(id: Types.ObjectId): Promise<void> {
    try {
      Logger.log('USER UPDATE START')

      await this.userDB.findByIdAndDelete(id)
      Logger.log('USER UPDATE SUCCESS')
    } catch (e) {
      Logger.log(`USER UPDATE ERROR: ${e.message}`)
    }
  }
}

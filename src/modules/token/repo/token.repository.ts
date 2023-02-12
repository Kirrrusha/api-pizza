import { lineDelimiter } from './../../../helpers'
import { Model, Types } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable, Logger } from '@nestjs/common'
import * as dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'
import { Token } from '../schemas/token.schema'
import { CreateUserTokenDto } from './dto/create-user-token.dto'

@Injectable()
export class TokenRepository {
  constructor(
    @InjectModel(Token.name)
    private readonly tokenDBProvider: Model<Token>,
  ) {}

  private readonly logger = new Logger(Token.name)

  async createRefreshToken(userId: number): Promise<Token> {
    const payload = {
      expireAt: dayjs().add(60, 'day').toISOString(),
      refreshToken: uuidv4(),
      userId,
    }
    try {
      this.logger.log('CREATE_REFRESH_TOKEN PENDING')
      const result = this.tokenDBProvider
        .findOneAndUpdate(payload, {
          upsert: true,
        })
        .lean()
        .exec()

      Logger.log('CREATE_REFRESH_TOKEN SUCCESS')
      lineDelimiter()

      return result
    } catch (error) {
      this.logger.error(`CREATE_REFRESH_TOKEN ERROR: ${error.message}`)
      lineDelimiter()
    }
  }

  async findRefreshToken(refreshToken: string): Promise<Token> {
    try {
      this.logger.log('FIND_REFRESH_TOKEN PENDING')

      const result = this.tokenDBProvider.findOne({ refreshToken })

      this.logger.log('FIND_REFRESH_TOKEN SUCCESS')
      lineDelimiter()

      return result
    } catch (error) {
      this.logger.error(`FIND_REFRESH_TOKEN ERROR: ${error.message}`)
      lineDelimiter()
    }
  }

  async findByUserId(userId: number): Promise<Token[]> {
    try {
      this.logger.log('FIND_BY_USER_ID PENDING')
      const result = this.tokenDBProvider.find({ userId })

      this.logger.log('FIND_BY_USER_ID SUCCESS')
      lineDelimiter()

      return result
    } catch (error) {
      this.logger.error(`FIND_BY_USER_ID ERROR: ${error.message}`)
      lineDelimiter()

    }
  }

  async updateRefreshToken(id: number) {
    return getRepository(Token)
      .createQueryBuilder()
      .update()
      .set({
        expireAt: moment().add(60, 'day').toISOString(),
        refreshToken: uuidv4(),
      })
      .where('id = :id', { id })
      .execute()
  }

  async getAll(): Promise<Token[]> {
    return await this.find()
  }

  async deleteToken(refreshToken: string): Promise<DeleteResult> {
    return this.delete({ refreshToken })
  }

  async deleteById(id: number): Promise<DeleteResult> {
    return this.delete(id)
  }

  async isExistToken(userId: number, refreshToken: string): Promise<boolean> {
    const result = await this.findOne({ userId, refreshToken })
    return !!result
  }
}

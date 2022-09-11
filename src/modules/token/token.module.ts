import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

import { JwtStrategy } from './strategies/jwt.strategy'
import { TokenService } from './token.service'
import { Token, TokenSchema } from './schemas/token.schema'
import { UserRepository } from '../user/repo/user.repository'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  providers: [TokenService, JwtStrategy, UserRepository],
})
export class TokenModule {}

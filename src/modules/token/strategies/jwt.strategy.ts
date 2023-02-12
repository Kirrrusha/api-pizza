import { Injectable, UnauthorizedException } from '@nestjs/common'
import { IJwtPayload } from './../../auth/interfaces'
import { UserRepository } from './../../user/repo/user.repository'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { User } from '../../user/schemas/user.schema'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret',
    })
  }

  async validate(payload: IJwtPayload): Promise<User> {
    const { userId } = payload
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}

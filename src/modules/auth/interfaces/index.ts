import { Types } from 'mongoose'

export interface IJwtPayload {
  username?: string
  userId: Types.ObjectId
}

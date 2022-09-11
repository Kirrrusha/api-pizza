import * as mongoose from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import * as bcrypt from 'bcrypt'
import { RoleEnum } from '../enums/role.enum'
import { StatusEnum } from '../enums/status.enum'

export type UserDocument = mongoose.Document<User>

@Schema({
  collection: 'User',
  versionKey: false,
  timestamps: true,
  autoIndex: true,
  autoCreate: true,
})
export class User {
  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true, unique: true })
  username: string

  @Prop({ required: true })
  password: string

  @Prop({})
  role: RoleEnum.admin | RoleEnum.user

  @Prop({})
  status: StatusEnum.pending | StatusEnum.blocked | StatusEnum.active

  @Prop()
  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compareAsync(password, this.password)
  }
}

export const UserSchema = SchemaFactory.createForClass(User)

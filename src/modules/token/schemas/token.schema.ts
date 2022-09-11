import * as mongoose from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type TokenDocument = mongoose.Document<Token>

@Schema({
  collection: 'Token',
  versionKey: false,
  timestamps: true,
  autoIndex: true,
  autoCreate: true,
})
export class Token {
  @Prop({ required: true })
  title: string

  @Prop()
  refreshToken: string

  @Prop()
  expireAt: string

  // @Prop({
  //   nullable: false,
  //   default: '5ccca18c-2716-4b2d-99fb-7f0d38816052',
  // })
  // fingerprint: string

  // @Prop({
  //   nullable: false,
  //   default: '192.168.0.1',
  // })
  // ip: string

  @Prop()
  isValid: boolean
}

export const TokenSchema = SchemaFactory.createForClass(Token)

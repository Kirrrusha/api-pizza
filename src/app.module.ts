import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ProductModule } from './modules/product/product.module'
import { OptionModule } from './modules/option/option.module'
import { CategoryModule } from './modules/category/category.module'
import { AuthModule } from './modules/auth/auth.module'
import { TokenModule } from './modules/token/token.module'
import { UserModule } from './modules/user/user.module'
import { MailModule } from './modules/mail/mail.module'
import { UserService } from './modules/user/user.service'

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION, {
      useNewUrlParser: true,
    }),
    ProductModule,
    OptionModule,
    CategoryModule,
    AuthModule,
    TokenModule,
    UserModule,
    MailModule,
  ],
  providers: [UserService],
})
export class AppModule {}

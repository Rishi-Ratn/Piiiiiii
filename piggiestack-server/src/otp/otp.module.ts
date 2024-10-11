import { Module } from '@nestjs/common';
import { OtpController } from './otp.controller';
import { OtpService } from './otp.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module'; 

@Module({
  imports: [
    JwtModule.register({}),
    PrismaModule,UserModule 
  ],
 
  controllers: [OtpController],
  providers: [OtpService]
})
export class OtpModule {}

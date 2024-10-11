import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OtpService } from './otp/otp.service';
import { ConfigModule } from '@nestjs/config';
import { OtpController } from './otp/otp.controller';
import { OtpModule } from './otp/otp.module';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // This makes the ConfigModule available globally
    }),
    OtpModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'yourSecretKey', 
      signOptions: { expiresIn: '1h' }, 
    }),
  ],
  controllers: [AppController, OtpController],
  providers: [OtpService, AuthService, PrismaService, UserService, AppService], 
})
export class AppModule {}

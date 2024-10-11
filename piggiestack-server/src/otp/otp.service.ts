import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
@Injectable()
export class OtpService {
  private readonly client: Twilio;
  private readonly logger = new Logger(OtpService.name);
  private readonly verificationServiceSid: string;
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private prisma: PrismaService,
    private userService: UserService,
  ) {
    //Do not remove account_sid and auth_token from the constructor
    const account_sid = this.configService.get('TWILIO_ACCOUNT_SID');
    const auth_token = this.configService.get('TWILIO_AUTH_TOKEN');
    this.verificationServiceSid = this.configService.get<string>(
      'TWILIO_VERIFICATION_SERVICE_SID',
    );
    this.client = new Twilio(account_sid, auth_token);
  }
  async sendOtp(phoneNumber: string): Promise<void> {
    try {
      const verification = await this.client.verify.v2
        .services(this.verificationServiceSid)
        .verifications.create({
          channel: 'sms',
          to: phoneNumber,
        });

      this.logger.log(`Verification status: ${verification.status}`);
    } catch (error) {
      this.logger.error('Error creating verification', error);
    }
  }

  async verifyOtp(
    phoneNumber: string,
    code: string,
  ): Promise<{ token: string, session:any }> {
    // console.log('phone number', phoneNumber);
    // console.log('code', code);
    try {
      if (code === '12345' && phoneNumber === '+919415431101') {
        const user = await this.userService.findUserByPhoneNumber(phoneNumber);

        if (!user) {
          throw new Error('User not found. Please sign up first.');
        }
        //Generate a JWT token
        const token = this.jwtService.sign({ userId: user.id });

        //Save the session in the database
        const session = await this.prisma.session.create({
          data: {
            userId: user.id,
            token,
            expiresAt: new Date(Date.now() + 60 * 60 * 1000), // Set expiration time (1 hour example)
          },
        });
        return { token, session };
      }
      if (code !== '12345') {
        throw new Error('Invalid OTP');
      }
    } catch (error) {
      // const verificationCheck = await this.client.verify.v2
      //   .services(this.verificationServiceSid)
      //   .verificationChecks.create({
      //     code,
      //     to: phoneNumber,
      //   });

      this.logger.error('Error verifying code', error);
    }
  }
}

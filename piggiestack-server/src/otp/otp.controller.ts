
import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { OtpService } from './otp.service';


@Controller('otp')
export class OtpController {
     constructor(private readonly otpService: OtpService) {}
     @Post('sendotp')
     async sendOtp(@Body('phoneNumber') phoneNumber: string): Promise<void> {
          try {
               const result = await this.otpService.sendOtp(phoneNumber);
               // if (!resul) {
               //   throw new HttpException('Failed to send OTP', HttpStatus.BAD_REQUEST);
               // }
               return result;
             } catch (error) {
               console.error('Error in sendOtp:', error);
               throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
             }  
     }

     @Post('verifyotp')
     async verifyOtp(@Body() body: { phoneNumber: string; code: string }): Promise<{token:string, session:any}> {
          const { phoneNumber, code } = body;
          console.log('body:', body);
          console.log('phoneNumber:', phoneNumber);
          console.log('code:', code);
          
    try {
      const authObject = await this.otpService.verifyOtp(phoneNumber, code);
      //console.log('authToken:', authToken);
      return authObject;
      
    } catch (error) {
      console.error('Error in verifyOtp:', error);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
     }
}

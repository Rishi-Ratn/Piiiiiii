import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateAccessToken(phoneNumber: string): Promise<string> {
    const payload = { phoneNumber };
    return this.jwtService.sign(payload);
  }

  async validateToken(token: string): Promise<any> {
    return this.jwtService.verify(token);
  }
}

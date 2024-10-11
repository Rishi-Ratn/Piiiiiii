import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDetails } from '../interfaces/user-details.interface';


@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findUserByPhoneNumber(phoneNumber: string) {
    return this.prisma.user.findUnique({
      where: { phone_number: phoneNumber },
    });
  }

  async createUser(phoneNumber: string, userDetails: Partial<UserDetails>) {
    return this.prisma.user.create({
      data: {
        phone_number: phoneNumber,
        userDetails: {
          create: {
            username: userDetails.username || '',
            dateOfBirth: userDetails.dateOfBirth ? new Date(userDetails.dateOfBirth) : new Date(),
            salarySlab: userDetails.salarySlab || '',
            occupation: userDetails.occupation || '',
          },
        },
      },
    });
  }
}

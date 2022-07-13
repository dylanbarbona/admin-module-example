import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { AuthRepository } from "../../domain/contracts/auth.repository";
import { User } from "../../domain/entities/user.entity";
import { PrismaService } from "../../../../database/prisma.service";

@Injectable()
export class PrismaAuthRepository implements AuthRepository {
    constructor(
        private prisma: PrismaService,
        private configService: ConfigService) {}

    public async findOne(email: string): Promise<User> {
        let user = await this.prisma.users.findFirst({ where: { email }})
        if (!user)
            throw new HttpException('El usuario no se encuentra registrado', HttpStatus.UNAUTHORIZED);
        return user
    }

    public async create(name: string, email: string, password: string): Promise<User> {
        try {
            return null;
            // return await this.prisma.users.create({
            //     data: {
            //         name,
            //         email,
            //         password,
            //         roles: {
            //             create: {
            //                 role: {
            //                     connect: {
            //                         name: 'user',
            //                     }
            //                 }
            //             }
            //         }
            //     }
            // })
        } catch (error) {
            switch(error.meta.target){
                case 'users_email_key':
                    throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
                default:
                    throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    async findById(id: number) {
        let user = await this.prisma.users.findFirst({ where: { id }})
        if (!user)
            throw new HttpException('El usuario no se encuentra registrado', HttpStatus.UNAUTHORIZED);
        return user
    }
}

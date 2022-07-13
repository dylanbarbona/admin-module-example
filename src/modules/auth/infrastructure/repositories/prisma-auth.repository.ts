import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { AuthRepository } from "../../domain/contracts/auth.repository";
import { User } from "../../domain/entities/user.entity";
import { PrismaService } from "../../../../database/prisma.service";

@Injectable()
export class PrismaAuthRepository implements AuthRepository {
    constructor(private prisma: PrismaService) {}

    public async findOne(email: string): Promise<User> {
        let user = await this.prisma.users.findFirst({ where: { email }})
        if (!user)
            throw new HttpException('El usuario no se encuentra registrado', HttpStatus.UNAUTHORIZED);
        return user
    }

    public async create(first_name: string, last_name: string, email: string, password: string): Promise<User> {
        try {
            return await this.prisma.users.create({
                data: {
                    email,
                    password,
                    first_name,
                    last_name,
                    name: first_name + ' ' + last_name
                }
            })
        } catch (error) {
            switch(error.meta.target){
                case 'users_email_key':
                case 'users_email_unique':
                    throw new HttpException('El usuario ya se encuentra registrado', HttpStatus.BAD_REQUEST);
                default:
                    throw new HttpException('Error interno en el servidor', HttpStatus.INTERNAL_SERVER_ERROR);
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

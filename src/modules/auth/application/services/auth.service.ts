import {Inject, Injectable} from '@nestjs/common';
import {CommandBus, QueryBus} from "@nestjs/cqrs";

import { LoginCommand } from "../../domain/commands/login.command";
import { RegisterCommand } from "../../domain/commands/register.command";

import { LoginInput } from "../inputs/login.input";
import { RegisterInput } from "../inputs/register.input";
import { Token } from "../../domain/entities/token.entity";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../../../../database/prisma.service";
import { randomBytes } from "crypto";
import { User } from "../../domain/entities/user.entity";
import {AuthRepository} from "../../domain/contracts/auth.repository";
import {WhoAmIQuery} from "../../domain/queries/who-am-i.query";
import {I18n, I18nContext} from "nestjs-i18n";

@Injectable()
export class AuthService {
    constructor(
        @Inject('AuthRepository') private authRepository: AuthRepository,
        private commandBus: CommandBus,
        private queryBus: QueryBus){}

    public async login(loginInput: LoginInput): Promise<Token> {
        const { email, password } = loginInput
        return await this.commandBus.execute(new LoginCommand(email, password))
    }

    public async register(registerInput: RegisterInput): Promise<Token> {
        const { name, email, password } = registerInput
        return await this.commandBus.execute(new RegisterCommand(name, email, password))
    }

    public async validateUser(user_id: number): Promise<User> {
        const user = await this.authRepository.findById(user_id)
        if (!user)
            return null;
        return user;
    }

    async whoAmI(user) {
        return await this.queryBus.execute(new WhoAmIQuery(user));
    }
}

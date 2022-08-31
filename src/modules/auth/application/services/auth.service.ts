import {Inject, Injectable} from '@nestjs/common';
import { CommandBus, QueryBus } from "@nestjs/cqrs";

import { LoginInput } from "../inputs/login.input";
import { RegisterInput } from "../inputs/register.input";

import { Token } from "../../domain/entities/token.entity";
import { User } from "../../domain/entities/user.entity";

import { RegisterCommand } from "../../domain/commands/register.command";
import { WhoAmIQuery } from "../../domain/queries/who-am-i.query";
import { LoginQuery } from "../../domain/queries/login.query";

import { AuthRepository } from "../../domain/contracts/auth.repository";

@Injectable()
export class AuthService {
    constructor(
        @Inject('AuthRepository') private authRepository: AuthRepository,
        private commandBus: CommandBus,
        private queryBus: QueryBus){}

    public async login(loginInput: LoginInput): Promise<Token> {
        const { email, password } = loginInput
        return await this.queryBus.execute(new LoginQuery(email, password))
    }

    public async register(registerInput: RegisterInput): Promise<Token> {
        const { first_name, last_name, email, password } = registerInput
        return await this.commandBus.execute(new RegisterCommand(first_name, last_name, email, password))
    }

    async whoAmI(user) {
        return await this.queryBus.execute(new WhoAmIQuery(user));
    }

    public async validateUser(user_id: number): Promise<User> {
        const user = await this.authRepository.findById(user_id)
        if (!user)
            return null;
        return user;
    }
}

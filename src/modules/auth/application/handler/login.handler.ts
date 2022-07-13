import { CommandHandler, EventBus, ICommandHandler} from "@nestjs/cqrs";
import { HttpException, HttpStatus, Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { LoginCommand } from "../../domain/commands/login.command";
import { AuthRepository } from "../../domain/contracts/auth.repository";
import { compareSync, hashSync } from 'bcryptjs';
import {AuthService} from "../services/auth.service";
import {TokenService} from "../services/token.service";
const bcrypt = require('bcrypt');

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
    constructor(
        @Inject('AuthRepository') private repository: AuthRepository,
        private jwtService: JwtService,
        private authService: AuthService,
        private tokenService: TokenService,
        private eventBus: EventBus) {}

    async execute(command: LoginCommand) {
        const { email, password } = command;
        const user = await this.repository.findOne(email);
        const isAuthenticated = user
            ? compareSync(password, user.password)
            : false;

        if(!isAuthenticated)
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

        const token = await this.tokenService.generateJWTToken(user.id);
        return {
            access_token: token,
            token_type: 'Bearer',
            expires_at: this.tokenService.getDateOneYearFromNow(),
            user_id: Number(user.id)
        };
    }
}

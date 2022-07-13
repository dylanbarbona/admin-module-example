import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { AuthRepository } from "../../domain/contracts/auth.repository";
import { RegisterCommand } from "../../domain/commands/register.command";
import {TokenService} from "../services/token.service";
const bcrypt = require('bcrypt');

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
    constructor(
        @Inject('AuthRepository') private repository: AuthRepository,
        private tokenService: TokenService){}

    async execute(command: RegisterCommand) {
        const password = bcrypt.hashSync(command.password, Number(process.env.HASH_SALT))
        const user = await this.repository.create(command.first_name, command.last_name, command.email, password)
        const { accessToken, refreshToken } = await this.tokenService.generateJWTToken(user.id);
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
            token_type: 'Bearer',
            expires_at: this.tokenService.getDateOneYearFromNow(),
            user_id: Number(user.id)
        };
    }
}

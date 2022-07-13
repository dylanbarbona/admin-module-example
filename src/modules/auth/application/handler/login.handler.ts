import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { HttpException, HttpStatus, Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compareSync } from 'bcryptjs';

import { AuthRepository } from "../../domain/contracts/auth.repository";

import { LoginQuery } from "../../domain/queries/login.query";

import { TokenService } from "../services/token.service";
import { AuthService } from "../services/auth.service";

@QueryHandler(LoginQuery)
export class LoginHandler implements IQueryHandler<LoginQuery> {
    constructor(
        @Inject('AuthRepository') private repository: AuthRepository,
        private jwtService: JwtService,
        private authService: AuthService,
        private tokenService: TokenService) {}

    async execute(command: LoginQuery) {
        const { email, password } = command;
        const user = await this.repository.findOne(email);
        const isAuthenticated = user
            ? compareSync(password, user.password)
            : false;

        if(!isAuthenticated)
            throw new HttpException('Correo electrónico o contraseña inválidos', HttpStatus.UNAUTHORIZED);

        const token = await this.tokenService.generateJWTToken(user.id);
        return {
            access_token: token,
            token_type: 'Bearer',
            expires_at: this.tokenService.getDateOneYearFromNow(),
            user_id: Number(user.id)
        };
    }
}

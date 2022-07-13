
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {HttpException, Injectable} from '@nestjs/common';
import {AuthService} from "../services/auth.service";
import {PrismaService} from "../../../../database/prisma.service";
import * as fs from "fs";
import {TokenService} from "../services/token.service";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authService: AuthService,
        private prismaService: PrismaService,
        private tokenService: TokenService) {
        const secretOrKey = fs.readFileSync("oauth-public.key").toString();
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey
        });
    }

    public async validate(payload: any): Promise<any> {
        const user = await this.authService.validateUser(parseInt(payload.sub, 10));
        if (!user)
            throw new HttpException('No autorizado', 401);

        const tokenIsRevoked = await this.tokenService.validateJTI(payload.jti);
        if (tokenIsRevoked)
            throw new HttpException('No autorizado', 401);

        return this.prismaService.format(user);
    }
}

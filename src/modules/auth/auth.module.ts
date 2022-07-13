import { Module } from '@nestjs/common';

import { JwtModule } from "@nestjs/jwt";
import { CqrsModule } from "@nestjs/cqrs";

import { DatabaseModule } from "../../database/database.module";
import { MailModule } from "../../mail/mail.module";

import { RegisterController } from "./application/controllers/register.controller";
import { WhoAmIController } from "./application/controllers/who-am-i.controller";
import { LoginController } from "./application/controllers/login.controller";

import { RegisterResolver } from "./application/resolvers/register.resolver";
import { LoginResolver } from "./application/resolvers/login.resolver";
import { AuthResolver } from "./application/resolvers/auth.resolver";

import { TokenService } from "./application/services/token.service";
import { AuthService } from "./application/services/auth.service";

import { PrismaOAuthAccessTokenRepository } from "./infrastructure/repositories/prisma-oauth_access_token.repository";
import { PrismaOAuthClientRepository } from "./infrastructure/repositories/prisma-oauth_client.repository";
import { PrismaAuthRepository } from "./infrastructure/repositories/prisma-auth.repository";

import { RegisterHandler } from "./application/handler/register.handler";
import { WhoAmIHandler } from "./application/handler/who-am-i.handler";
import { LoginHandler } from "./application/handler/login.handler";

import { UserLoggedInListener } from "./application/listeners/user-logged-in.listener";

import { RefreshTokenStrategy } from "./application/strategies/refresh-token.strategy";
import { AccessTokenStrategy } from "./application/strategies/access-token.strategy";

import { JwtAuthGuard } from "./application/guards/jwt.guard";

import * as fs from "fs";

@Module({
    imports: [
        JwtModule.register({
            secret: fs.readFileSync("oauth-private.key").toString(),
            signOptions: { expiresIn: process.env.TOKEN_EXPIRE_TIME },
            verifyOptions: { algorithms: ['HS256'] }
        }),
        DatabaseModule,
        CqrsModule,
        MailModule
    ],
    controllers: [
        WhoAmIController,
        LoginController,
        RegisterController
    ],
    providers: [
        // Resolvers
        AuthResolver,
        LoginResolver,
        RegisterResolver,

        // Services
        AuthService,
        TokenService,

        // Strategies
        AccessTokenStrategy,
        RefreshTokenStrategy,

        // Guards
        JwtAuthGuard,

        // Handlers
        LoginHandler,
        RegisterHandler,
        WhoAmIHandler,

        // Listeners
        UserLoggedInListener,

        // Repositories
        {
            provide: 'AuthRepository',
            useClass: PrismaAuthRepository
        },
        {
            provide: 'OAuthClientRepository',
            useClass: PrismaOAuthClientRepository
        },
        {
            provide: 'OAuthAccessTokenRepository',
            useClass: PrismaOAuthAccessTokenRepository
        }
    ],
    exports: [
        AuthService,
        JwtAuthGuard
    ]
})
export class AuthModule {}

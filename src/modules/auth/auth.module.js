"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthModule = void 0;
var common_1 = require("@nestjs/common");
var jwt_1 = require("@nestjs/jwt");
var cqrs_1 = require("@nestjs/cqrs");
var access_token_strategy_1 = require("./application/strategies/access-token.strategy");
var login_controller_1 = require("./application/controllers/login.controller");
var register_controller_1 = require("./application/controllers/register.controller");
var login_resolver_1 = require("./application/resolvers/login.resolver");
var auth_service_1 = require("./application/services/auth.service");
var login_handler_1 = require("./application/handler/login.handler");
var auth_resolver_1 = require("./application/resolvers/auth.resolver");
var prisma_auth_repository_1 = require("./infrastructure/repositories/prisma-auth.repository");
var user_logged_in_listener_1 = require("./application/listeners/user-logged-in.listener");
var register_handler_1 = require("./application/handler/register.handler");
var who_am_i_controller_1 = require("./application/controllers/who-am-i.controller");
var register_resolver_1 = require("./application/resolvers/register.resolver");
var database_module_1 = require("../../database/database.module");
var mail_module_1 = require("../../mail/mail.module");
var jwt_guard_1 = require("./application/guards/jwt.guard");
var refresh_token_strategy_1 = require("./application/strategies/refresh-token.strategy");
var fs = require("fs");
var prisma_oauth_client_repository_1 = require("./infrastructure/repositories/prisma-oauth_client.repository");
var prisma_oauth_access_token_repository_1 = require("./infrastructure/repositories/prisma-oauth_access_token.repository");
var token_service_1 = require("./application/services/token.service");
var who_am_i_handler_1 = require("./application/handler/who-am-i.handler");
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        (0, common_1.Module)({
            imports: [
                jwt_1.JwtModule.register({
                    secret: fs.readFileSync("oauth-private.key").toString(),
                    signOptions: { expiresIn: process.env.TOKEN_EXPIRE_TIME },
                    verifyOptions: { algorithms: ['HS256'] }
                }),
                database_module_1.DatabaseModule,
                cqrs_1.CqrsModule,
                mail_module_1.MailModule
            ],
            controllers: [
                who_am_i_controller_1.WhoAmIController,
                login_controller_1.LoginController,
                register_controller_1.RegisterController
            ],
            providers: [
                // Resolvers
                auth_resolver_1.AuthResolver,
                login_resolver_1.LoginResolver,
                register_resolver_1.RegisterResolver,
                // Services
                auth_service_1.AuthService,
                token_service_1.TokenService,
                // Strategies
                access_token_strategy_1.AccessTokenStrategy,
                refresh_token_strategy_1.RefreshTokenStrategy,
                // Guards
                jwt_guard_1.JwtAuthGuard,
                // Handlers
                login_handler_1.LoginHandler,
                register_handler_1.RegisterHandler,
                who_am_i_handler_1.WhoAmIHandler,
                // Listeners
                user_logged_in_listener_1.UserLoggedInListener,
                // Repositories
                {
                    provide: 'AuthRepository',
                    useClass: prisma_auth_repository_1.PrismaAuthRepository
                },
                {
                    provide: 'OAuthClientRepository',
                    useClass: prisma_oauth_client_repository_1.PrismaOAuthClientRepository
                },
                {
                    provide: 'OAuthAccessTokenRepository',
                    useClass: prisma_oauth_access_token_repository_1.PrismaOAuthAccessTokenRepository
                }
            ],
            exports: [
                auth_service_1.AuthService,
                jwt_guard_1.JwtAuthGuard
            ]
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;

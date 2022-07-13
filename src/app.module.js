"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var app_service_1 = require("./app.service");
var database_module_1 = require("./database/database.module");
var mail_module_1 = require("./mail/mail.module");
var modules_module_1 = require("./modules/modules.module");
var config_module_1 = require("./config/config.module");
var schedule_1 = require("@nestjs/schedule");
var throttler_1 = require("@nestjs/throttler");
var event_emitter_1 = require("@nestjs/event-emitter");
var apollo_1 = require("@nestjs/apollo");
var graphql_1 = require("@nestjs/graphql");
var core_1 = require("@nestjs/core");
var app_controller_1 = require("./app.controller");
var nestjs_i18n_1 = require("nestjs-i18n");
var path_1 = require("path");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    var _a, _b, _c;
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                config_module_1.ConfigurationModule,
                database_module_1.DatabaseModule,
                mail_module_1.MailModule,
                modules_module_1.ModulesModule,
                nestjs_i18n_1.I18nModule.forRoot({
                    fallbackLanguage: 'es',
                    loaderOptions: {
                        path: path_1["default"].join(__dirname, '/i18n/'),
                        watch: true
                    }
                }),
                graphql_1.GraphQLModule.forRoot({
                    context: function (_a) {
                        var req = _a.req;
                        return ({ req: req });
                    },
                    driver: apollo_1.ApolloDriver,
                    debug: ((_a = process.env) === null || _a === void 0 ? void 0 : _a.GRAPHQL_DEBUG) == 'true' || false,
                    playground: ((_b = process.env) === null || _b === void 0 ? void 0 : _b.GRAPHQL_PLAYGROUND) == 'true' || false,
                    autoSchemaFile: true,
                    sortSchema: true,
                    disableHealthCheck: true,
                    introspection: true,
                    cors: {
                        origin: ((_c = process.env) === null || _c === void 0 ? void 0 : _c.APP_URL) || '*',
                        credentials: true
                    }
                }),
                throttler_1.ThrottlerModule.forRoot({
                    ttl: Number(process.env.THROTTLE_TTL || 60),
                    limit: Number(process.env.THROTTLE_LIMIT || 60)
                }),
                schedule_1.ScheduleModule.forRoot(),
                event_emitter_1.EventEmitterModule.forRoot(),
            ],
            controllers: [
                app_controller_1.AppController
            ],
            providers: [
                app_service_1.AppService,
                {
                    provide: core_1.APP_GUARD,
                    useClass: throttler_1.ThrottlerGuard
                }
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;

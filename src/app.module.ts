import { Module } from '@nestjs/common';

import { ThrottlerGuard , ThrottlerModule} from "@nestjs/throttler";
import { ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { ScheduleModule } from "@nestjs/schedule";
import { GraphQLModule } from "@nestjs/graphql";
import { APP_GUARD } from "@nestjs/core";

import { ConfigurationModule } from "./config/config.module";
import { DatabaseModule } from './database/database.module';
import { ModulesModule } from './modules/modules.module';
import { MailModule } from './mail/mail.module';
import { AppService } from './app.service';

import { AppController } from "./app.controller";

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    MailModule,
    ModulesModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      context: ({ req }) => ({ req }),
      driver: ApolloDriver,
      debug: process.env?.GRAPHQL_DEBUG == 'true' || false,
      playground: process.env?.GRAPHQL_PLAYGROUND == 'true' || false,
      autoSchemaFile: true,
      sortSchema: true,
      disableHealthCheck: true,
      introspection: true,
      cors: {
        origin: process.env?.APP_URL || '*',
        credentials: true
      }
    }),
    ThrottlerModule.forRoot({
      ttl : Number(process.env.THROTTLE_TTL || 60),
      limit : Number(process.env.THROTTLE_LIMIT || 60)
    }),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
  ],
  controllers: [
      AppController
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    }
  ],
})
export class AppModule {}

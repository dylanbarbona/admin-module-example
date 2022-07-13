import {INestApplication, Injectable, Logger, OnModuleDestroy, OnModuleInit} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private readonly logger: Logger = new Logger(PrismaService.name); // Typing fix
    private readonly softDeleteModels: Prisma.ModelName[] = [
        'users'
    ];

    constructor() {
        super({
            log: [
                { emit: 'event', level: 'query' },
                { emit: 'stdout', level: 'info' },
                { emit: 'stdout', level: 'warn' },
                { emit: 'stdout', level: 'error' }
            ]
        });
        this.$on<any>('query', (e: Prisma.QueryEvent) => {
            this.logger.log('Query: ' + e.query);
            this.logger.log('Params: ' + e.params);
            this.logger.log('Duration: ' + e.duration + 'ms');
        });

        // Soft-delete middleware
        this.$use(async (params, next) => {
            if (this.softDeleteModels.includes(params.model)) {
                // For delete queries
                if (params.action === 'delete') {
                    // Change action to an update
                    params.action = 'update';
                    params.args.data = { deleted_at: new Date() };
                }
                if (params.action === 'deleteMany') {
                    // For delete many queries
                    params.action = 'updateMany';
                    if (params.args.data) {
                        params.args.data.deleted_at = new Date();
                    } else {
                        params.args.data = { deleted_at: new Date() };
                    }
                }
            }
            return next(params);
        });
    }

    public async onModuleInit(): Promise<void> {
        await this.$connect();
    }

    public async onModuleDestroy(): Promise<void> {
        await this.$disconnect();
    }

    public enableShutdownHooks(app: INestApplication): void {
        this.$on('beforeExit', () => app.close());
    }

    public format<Type>(data: Type): Type {
        return JSON.parse(
            JSON.stringify(
                data,
                (_, value) =>
                    typeof value === 'bigint' ? parseInt(value.toString(), 10) : value
            )
        );
    }
}

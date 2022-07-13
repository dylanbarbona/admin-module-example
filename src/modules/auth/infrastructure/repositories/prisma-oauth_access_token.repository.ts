import {  Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../database/prisma.service";
import { OAuthAccessTokenRepository } from "../../domain/contracts/oauth_access_token.repository";
import { OAuthAccessTokenEntity } from "../../domain/entities/OAuthAccessToken.entity";

@Injectable()
export class PrismaOAuthAccessTokenRepository implements OAuthAccessTokenRepository {
    constructor(private prisma: PrismaService) {}

    async findOne(id: string) {
        return await this.prisma.oauth_access_tokens.findFirst({
            where: {
                id
            },
            select: {
                revoked: true,
                expires_at: true,
                id: true,
                user_id: true,
                client_id: true,
            }
        });
    }

    async create(data: OAuthAccessTokenEntity) {
        return await this.prisma.oauth_access_tokens.create({ data });
    }
}

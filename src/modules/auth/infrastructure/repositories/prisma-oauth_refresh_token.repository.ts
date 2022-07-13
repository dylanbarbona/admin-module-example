import {  Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../database/prisma.service";
import {OAuthRefreshTokenEntity} from "../../domain/entities/OAuthRefreshToken.entity";
import {OAuthRefreshTokenRepository} from "../../domain/contracts/oauth_refresh_token.repository";

@Injectable()
export class PrismaOAuthRefreshTokenRepository implements OAuthRefreshTokenRepository {
    constructor(private prisma: PrismaService) {}

    async findOne(id: string) {
        return await this.prisma.oauth_refresh_tokens.findFirst({
            where: {
                access_token_id: id
            },
            select: {
                revoked: true,
                expires_at: true,
                id: true,
                access_token_id: true
            }
        });
    }

    async create(data: OAuthRefreshTokenEntity) {
        return await this.prisma.oauth_refresh_tokens.create({ data });
    }
}

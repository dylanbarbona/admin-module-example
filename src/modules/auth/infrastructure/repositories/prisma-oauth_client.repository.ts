import {  Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../database/prisma.service";
import { OAuthAccessTokenRepository } from "../../domain/contracts/oauth_access_token.repository";
import {OAuthClientRepository} from "../../domain/contracts/oauth_client.repository";

@Injectable()
export class PrismaOAuthClientRepository implements OAuthClientRepository {
    constructor(private prisma: PrismaService) {}

    async findOne(personal_access_client: boolean) {
        return await this.prisma.oauth_clients.findFirst({
            where: {
                'personal_access_client': personal_access_client
            }
        });
    }
}

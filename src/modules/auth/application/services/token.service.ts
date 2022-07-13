import {Inject, Injectable} from "@nestjs/common";
import { OAuthClientRepository } from "../../domain/contracts/oauth_client.repository";
import { OAuthAccessTokenRepository } from "../../domain/contracts/oauth_access_token.repository";
import {randomBytes} from "crypto";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class TokenService {
    constructor(
        private jwtService: JwtService,
        @Inject('OAuthClientRepository') private OAuthClientRepository: OAuthClientRepository,
        @Inject('OAuthAccessTokenRepository') private OAuthAccessTokenRepository: OAuthAccessTokenRepository) {}

    public async generateJWTToken(user_id): Promise<string> {
        const authClient = await this.OAuthClientRepository.findOne(true);

        const jti = await this.OAuthAccessTokenRepository.create({
                id: randomBytes(40).toString('hex'),
                user_id: user_id,
                client_id: authClient.id,
                name: 'Personal Access Token',
                expires_at: this.getDateOneYearFromNow(),
                revoked: false,
                scopes: '[]',
                created_at: new Date(),
                updated_at: new Date()
            }
        );

        return this.jwtService.sign(
            {
                aud: authClient.id.toString(),
                scopes: []
            },
            {
                algorithm: 'RS256',
                expiresIn: 60,
                jwtid: jti.id,
                notBefore: '-1s',
                subject: user_id.toString()
            }
        );
    }

    public getDateOneYearFromNow(): Date {
        return new Date(new Date().setFullYear(new Date().getFullYear() + 1));
    }

    public async validateJTI(jti: string): Promise<boolean> {
        const token = await this.OAuthAccessTokenRepository.findOne(jti)
        return token.revoked;
    }
}

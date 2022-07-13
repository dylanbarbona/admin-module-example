import {Inject, Injectable} from "@nestjs/common";
import { OAuthClientRepository } from "../../domain/contracts/oauth_client.repository";
import { OAuthAccessTokenRepository } from "../../domain/contracts/oauth_access_token.repository";
import {randomBytes} from "crypto";
import {JwtService} from "@nestjs/jwt";
import {OAuthRefreshTokenRepository} from "../../domain/contracts/oauth_refresh_token.repository";

@Injectable()
export class TokenService {
    constructor(
        private jwtService: JwtService,
        @Inject('OAuthClientRepository') private OAuthClientRepository: OAuthClientRepository,
        @Inject('OAuthAccessTokenRepository') private OAuthAccessTokenRepository: OAuthAccessTokenRepository,
        @Inject('OAuthRefreshTokenRepository') private OAuthRefreshTokenRepository: OAuthRefreshTokenRepository) {}

    public async generateJWTToken(user_id): Promise<{ accessToken: string, refreshToken: string }> {
        const authClient = await this.OAuthClientRepository.findOne({ personal_access_token: true, password_client: false, revoked: false });
        const refreshTokenClient = await this.OAuthClientRepository.findOne({ personal_access_token: false, password_client: true, revoked: false });

        const jtiAccessToken = await this.OAuthAccessTokenRepository.create({
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

        const jtiRefreshToken = await this.OAuthRefreshTokenRepository.create({
                id: randomBytes(40).toString('hex'),
                access_token_id: jtiAccessToken.id,
                expires_at: this.getDateOneYearFromNow(),
                revoked: false
            }
        );

        const accessToken = this.jwtService.sign(
            {
                aud: authClient.id.toString(),
                scopes: []
            },
            {
                algorithm: 'RS256',
                expiresIn: '1y',
                privateKey: authClient.secret,
                jwtid: jtiAccessToken.id,
                notBefore: '-1s',
                subject: user_id.toString()
            }
        );

        const refreshToken = this.jwtService.sign(
            {
                aud: authClient.id.toString(),
                scopes: []
            },
            {
                algorithm: 'RS256',
                expiresIn: '1y',
                privateKey: refreshTokenClient.secret,
                jwtid: jtiRefreshToken.id,
                notBefore: '-1s',
                subject: user_id.toString()
            }
        );

        return { accessToken, refreshToken };
    }

    public getDateOneYearFromNow(): Date {
        return new Date(new Date().setFullYear(new Date().getFullYear() + 1));
    }

    public async validateJTI(jti: string): Promise<boolean> {
        const token = await this.OAuthAccessTokenRepository.findOne(jti)
        return token.revoked;
    }
}

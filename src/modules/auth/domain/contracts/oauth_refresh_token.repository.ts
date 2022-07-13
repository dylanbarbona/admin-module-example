import {OAuthRefreshTokenEntity} from "../entities/OAuthRefreshToken.entity";

export interface OAuthRefreshTokenRepository {
    findOne(id: string)
    create(data: OAuthRefreshTokenEntity)
}

import {OAuthAccessTokenEntity} from "../entities/OAuthAccessToken.entity";

export interface OAuthAccessTokenRepository {
    findOne(id: string)
    create(data: OAuthAccessTokenEntity)
}

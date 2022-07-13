import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OAuthRefreshTokenEntity {
    id: string
    access_token_id: string
    revoked: boolean
    expires_at: Date
}

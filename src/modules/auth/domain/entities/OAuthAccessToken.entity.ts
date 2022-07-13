import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class OAuthAccessTokenEntity {
    id: string
    user_id: number
    client_id: number
    name: string
    expires_at: Date
    revoked: boolean
    scopes: any
    created_at: Date
    updated_at: Date
}

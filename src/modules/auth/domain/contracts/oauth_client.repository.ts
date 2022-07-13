export interface OAuthClientRepository {
    findOne(data: { personal_access_token: boolean, password_client: boolean, revoked: boolean })
}

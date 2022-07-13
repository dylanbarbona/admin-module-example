export interface OAuthClientRepository {
    findOne(personal_access_client: boolean)

}

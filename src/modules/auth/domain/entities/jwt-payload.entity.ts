export interface JwtPayload {
    aud: string;
    jti: string;
    iat: number;
    nbf: number;
    exp: number;
    sub: string;
    scopes: any[];
}

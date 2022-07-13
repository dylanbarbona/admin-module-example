export default () => ({
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    APP_URL: process.env.APP_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    GRAPHQL_DEBUG: process.env.GRAPHQL_DEBUG,

    SECRET_JWT: process.env.SECRET_JWT,
    SECRET_SALT: process.env.SECRET_SALT,
    HASH_SALT: process.env.HASH_SALT,

    THROTTLE_TTL: process.env.THROTTLE_TTL,
    THROTTLE_LIMIT: process.env.THROTTLE_LIMIT,

    TOKEN_EXPIRE_TIME: process.env.TOKEN_EXPIRE_TIME,
    TOKEN_SECRET_KEY: process.env.TOKEN_SECRET_KEY,
})

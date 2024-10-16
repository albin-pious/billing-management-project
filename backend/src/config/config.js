import * as dotenv from 'dotenv';
dotenv.config();

const config = {
    port: process.env.PORT,
    dbConnectionString: process.env.DB_CONNECTION_STRING,
    frontendURL: process.env.FRONTEND_URL,
    corsOptions: {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        allowHeaders: ['Authorization', 'Content-Type']
    },
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiration: process.env.JWT_EXPIRES_IN,
    jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRES_IN,
    environment: process.env.NODE_ENV // production or development
}

export default config;
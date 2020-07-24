const IS_PROD = process.env.NODE_ENV === 'production'
const BASE_DIR = IS_PROD ? 'dist' : 'src'

module.exports = {
  type: process.env.DB_TYPE,
  port: process.env.DB_PORT,
  host: IS_PROD ? process.env.DB_HOST : process.env.DB_HOST_STAGING,
  username: IS_PROD ? process.env.DB_USER : process.env.DB_USER_STAGING,
  password: IS_PROD ? process.env.DB_PASSWORD : process.env.DB_PASSWORD_STAGING,
  database: IS_PROD ? process.env.DB_DATABASE : process.env.DB_DATABASE_STAGING,
  synchronize: IS_PROD ? false : true,
  logging: IS_PROD ? false : true,
  entities: [BASE_DIR + '/database/entities/**/*{.ts,.js}'],
  subscribers: [BASE_DIR + '/database/subscribers/**/*{.ts,.js}'],
  migrations: [BASE_DIR + '/database/migrations/**/*{.ts,.js}'],
  seeds: [BASE_DIR + '/database/seeds/**/*{.ts,.js}'],
  factories: [BASE_DIR + '/database/factories/**/*{.ts,.js}'],
  cli: {
    migrationsDir: BASE_DIR + '/database/migrations'
  }
}

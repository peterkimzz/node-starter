const IS_PROD = process.env.NODE_ENV === 'production'

module.exports = {
  type: process.env.DB_TYPE,
  host: IS_PROD ? process.env.DB_HOST : 'db',
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: IS_PROD ? process.env.DB_DATABASE_PROD : process.env.DB_DATABASE_DEV,
  synchronize: IS_PROD ? false : true,
  logging: IS_PROD ? false : true,
  entities: [IS_PROD ? 'dist/database/entity/**/*.js' : 'src/database/entity/**/*.ts'],
  subscribers: [IS_PROD ? 'dist/database/subscriber/**/*.js' : 'src/database/subscriber/**/*.ts'],
  migrations: [IS_PROD ? 'dist/database/migration/**/*.js' : 'src/database/migration/**/*.ts'],
  cli: {
    migrationsDir: IS_PROD ? 'dist/database/migration' : 'src/database/migration'
  }
}

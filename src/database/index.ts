import { createConnection, Connection } from 'typeorm'

export class Database {
  public async Init(): Promise<Connection> {
    try {
      const connection = await createConnection()

      console.log(
        `[INFO] Database "${connection.options.database}" is connected.`
      )

      return Promise.resolve(connection)
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

import 'dotenv/config'
import 'reflect-metadata'

import { Database } from './database'
import { Application } from './app'

async function Start() {
  try {
    const db = new Database()
    await db.Init()

    const app = new Application()
    app.Listen()
  } catch (err) {
    console.log(err)
    console.warn(`[Error] Server couldn't start..`)
  }
}

Start()

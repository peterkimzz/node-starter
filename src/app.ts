import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import { Router } from './routes'
import { NotFoundErrorMiddleware, ErrorMiddleware } from './middlewares/error'

const IS_PROD = process.env.NODE_ENV === 'production'

export class Application {
  private _instance: express.Application
  public get Instance() {
    return this
  }

  constructor() {
    this._instance = express()
    this._instance.use(morgan(IS_PROD ? 'common' : 'dev'))
    this._instance.use(express.json({ limit: '10mb' }))
    this._instance.use(express.urlencoded({ extended: true }))
    this._instance.use(cookieParser(process.env.COOKIE_SECRET as string))
    this._instance.use(Router)
    this._instance.use(NotFoundErrorMiddleware)
    this._instance.use(ErrorMiddleware)
  }

  public Listen() {
    const PORT = Number(process.env.PORT)

    this._instance.listen(PORT, () => {
      console.log(`[Info] Server is listening on http://127.0.0.1:${PORT}`)
    })
  }
}

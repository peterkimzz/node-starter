import express from 'express'
import v1 from './v1'

const Router = express.Router()

Router.get('/favicon.ico', (req, res) => res.sendStatus(204))
Router.use('/v1', v1)

export { Router }

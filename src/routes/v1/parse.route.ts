import express from 'express'

import { Get } from '../../controllers/v1/parse.controller'

const router = express.Router()

router.get('/', Get)

export default router

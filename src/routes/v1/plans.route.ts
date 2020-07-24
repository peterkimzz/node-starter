import express from 'express'

import { Get } from '../../controllers/v1/plans.controller'

const router = express.Router()

router.get('/:uuid?', Get)

export default router

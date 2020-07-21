import express from 'express'

import { Me, Login, Logout } from '../../controllers/v1/auth.controller'

const router = express.Router()

router.get('/me', Me)
router.post('/login', Login)
router.delete('/logout', Logout)

export default router

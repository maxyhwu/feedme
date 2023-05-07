import { Router } from 'express'
import { getEnv } from '../Controllers/envController'

const router = Router()

router.post('/getenv', getEnv)

export default router
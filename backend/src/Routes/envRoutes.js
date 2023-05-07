import { Router } from 'express'
import envController from '../Controllers/envController'
const { getEnv } = envController

const router = Router()

router.post('/getenv', getEnv)

export default router
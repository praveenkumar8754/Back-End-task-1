import express from 'express'
import RoomRoutes from './Rooms.js'

const router = express.Router()
router.use('/room',RoomRoutes)

export default router
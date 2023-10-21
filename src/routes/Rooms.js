import express from "express"
import RoomRoutes from '../controller/Rooms.js'

const router = express.Router()

router.get('/',RoomRoutes.getRoom);
router.post('/create',RoomRoutes.createRoom);
router.post('/booking',RoomRoutes.bookingRoom)
router.get('/bookedRooms',RoomRoutes.bookedRoomsDetails)
router.get('/customerDetails',RoomRoutes.customerDetails)
router.get('/regularCustomer',RoomRoutes.regularCustomer)

export default router;
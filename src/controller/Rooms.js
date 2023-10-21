const room = [];
// Generally Getting All Rooms 
const getRoom = (req,res)=>{
    res.status(200).send({
        message:"Getting Rooms Successfully",
        count:room.length,
        room
    })
}

// Create Room
const createRoom =(req,res)=>{
    const data = {
        roomID : req.body.roomID,
        seats : req.body.seats,
        amenities : req.body.amenities,
        pricePerHour : req.body.pricePerHour,
        bookedStatus : "Not Booked"
    }

    let filteredData = room.filter((e)=>e.roomID === data.roomID)

        if(filteredData.length===0){
            room.push(data);
            res.status(201).send({
            message:"Room Created Successfully"
            })
        }
        else{
            res.status(400).send({
                message:"Room already Booked"
            })
        }    
    }
    
// Booking a Room
const bookingRoom = (req,res)=>{
    // const bookingData = {
    //     customerName:req.body.customerName,
    //     roomID:req.body.roomID,
    //     date:req.body.date,
    //     startTime:req.body.startTime,
    //     endTime:req.body.endTime,
    //     bookedStatus:"Room Booked"
    // }
    // const roomToBook = room.find((e)=>e.roomID === req.body.roomID)
    // if(roomToBook){
    //     roomToBook.customerName = req.body.customerName;
    //     roomToBook.date = req.body.date;
    //     roomToBook.startTime = req.body.startTime;
    //     roomToBook.endTime = req.body.endTime;
    //     roomToBook.roomID = req.body.roomID;
    //     roomToBook.bookedStatus = "Room Booked";

    //     room.push(bookingData);

    //     res.status(200).send({
    //         message: "Room Booked Successfully"
    //     });
 
    // }
    let booking = false;
    room.map((e)=>{
        if(e.roomID===req.body.roomID){
            e.customerName = req.body.customerName;
            e.date = req.body.date;
            e.startTime = req.body.startTime;
            e.endTime = req.body.endTime;
            e.roomID = req.body.roomID;
            e.bookedStatus = "Room Booked"
            booking = true;
        }
    })
    if(booking){
        res.status(200).send({
            message:"Room Booked Successfull"
        })
    }
    else{

        res.status(400).send({
            message: "Room  not found"
        });
    }
}

// List all rooms with booked data
const bookedRoomsDetails = (req,res)=>{
    let data = []
    room.map((e)=>
    {
        if(e.bookedStatus === "Room Booked"){
        data.push({
            roomID : e.roomID,
            bookedStatus : e.bookedStatus,
            customerName : e.customerName,
            date : e.date,
            startTime : e.startTime,
            endTime : e.endTime
        })
       } 
    })
        res.status(200).send({
            message:"Booked Room Details Fetched Successfully",
            data
        })
}

// List all Customer Details
const customerDetails = (req,res)=>{
    let data = [];    
    room.map((e)=>
    {
        if(e.bookedStatus === "Room Booked")
        {
            data.push({
                customerName:e.customerName,
                roomID:e.roomID,
                date:e.date,
                startTime:e.startTime,
                endTime:e.endTime 
            })
        }
    })

    res.status(200).send({
        message:"Customer Details Fetched Successfully",
        data
    })
}

// List how many times a customer has booked the room 

const regularCustomer = (req,res)=>{
    // let data = [];
    const customerNameToSearch = req.params.customerName;
    const customerBookingsData = room.filter((e)=> e.customerName === customerNameToSearch);
    const noOfBookings = customerBookingsData.length;
    if(customerBookingsData){
        customerBookingsData.push({
          customerName:req.body.customerName,
          roomName:req.body.roomName,
          date:req.body.date,
          startTime:req.body.startTime,
          endTime:req.body.endTime,
          bookingID:req.body.bookingID,
          bookingDate:req.body.BookingDate,
          bookingStatus:req.body.bookingStatus
        })
    }
    res.status(200).send({
        message:"Getting how many times a customer booked a room successfully",
        customerName: customerNameToSearch,
        noOfBookings: noOfBookings,
        customerBookingsData
    })

}

export default { 
    getRoom,
    createRoom,
    bookingRoom,
    bookedRoomsDetails,
    customerDetails,
    regularCustomer
}
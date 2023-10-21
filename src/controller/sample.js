const rooms = [
    {
        roomNo:1,
        roomType:"standard",
        noOfSeats:2
    },
    {
        roomNo:2,
        roomType:"single",
        noOfSeats:1
    }
    ]
    
    const roomNo = 1;
    const bookings = [];
    const date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    const time_regex = /^(0[0-9]|1\d|2[0-3])\:(00)/;
    
    const getRooms = (req,res)=>{
        if(rooms){
            res.status(200).send({
                message:"Room Fetched successfully",
                rooms
            })
        }
        else{
            res.status(400).send({
                message:"Can't get the room"
            })
        }
    }
    
    const createRoom = (req,res)=>{
        
        let roomBooking = {};
        roomBooking.roomNo = roomNo; 
        roomBooking.bookings = [];
    
        let isBooking = true;
    
        if(req.body.noOfSeats){
            res.status(200).send({
                message:"Please Enter the Seats"
            })
            isBooking = true;
        }
        else{
            res.status(400).send({
                message:"No seats available"
            })
            isBooking = false
        }
    
        if(req.body.pricePerHour){
            if(isNaN(req.body.pricePerHour)){
                res.status.send({
                    message:"Enter Only digits for Price per Hour"
                })
            
            isBooking = false
            }
            else{
               res.status(400).send({
                message:"Please enter the No of Seats"
               })
            isBooking = true 
            }
           
          if(isBooking){
            roomBooking.noOfSeats = req.body.noOfSeats;
            roomBooking.pricePerHour = req/body.pricePerHour;
            rooms.push(roomBooking)
            roomNo++;
            res.status(201).send({
                message:"Room created successfully"
            })
          }  
        }
    
    
        // let data = req.body
        // let filteredData = rooms.filter((e)=>e.code === data.code)
        // if(filteredData.length===0){
        //     rooms.push(data)
        //     res.status(201).send({
        //     message:"Room created Successfully"
        
        //   })
        // }
        // else{
        //     res.status(400).send({
        //         message:"Room Already Booked"
        //     })
        // }
    }
    export default {
        getRooms,
        createRoom
    }
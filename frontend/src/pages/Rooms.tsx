import { useEffect, useState } from "react"
import { RoomCard } from "../components/RoomCard"
import { Search } from 'lucide-react'
import api from "../utils/api"
import NORESULT from "../assets/svgs/NORESULT.svg"



export function Rooms() {
  const [rooms, setRooms] = useState([])
  const [isFetchingRooms, setIsFetchingRooms] = useState(true)
  const [searchName, setSearchName] = useState('')

  const getRooms = async (room_name:string) => {
    try{
      const response = await api.get(room_name.length > 1? `/conversation/?conversation_type=group&name=${room_name}`:`/conversation/?conversation_type=group`)
      if (response.status === 200){
        setRooms(response.data)
        console.log(response.data)
        setIsFetchingRooms(false)
      }
    }
    catch (error) {
      console.log(`Error: ${error.response?.data || error.message}`)
      setIsFetchingRooms(false)
    }

  }

  useEffect(()=>{
    getRooms(searchName)
  },[searchName])

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Chat <span className="text-emerald-500">Rooms</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Find your community and start chatting
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              onChange={(e)=>setSearchName(e.target.value)}
              placeholder="Search rooms..."
              className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-emerald-200 focus:border-emerald-500 focus:outline-none transition-colors duration-300 text-gray-900"
            />
          </div>
        </div>

        {/* Rooms Grid */}

        {
          isFetchingRooms?
          <p>Loading...</p>
          :
          rooms.length > 0?
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {
              rooms.map((room)=>(
                <RoomCard key={room.id} {...room}/>
              ))
            }
          </div>
          :
          <div className="my-20 flex flex-col items-center">
            <div className="h-80 w-80">
              <img
              className="w-full h-full object-contain"
              src={NORESULT} alt="" />
            </div>
            <p className="w-full text-center">
              <span className="text-2xl text-emerald-500 block">"{searchName}"</span>
              <span>Doesn't match any room name</span>
            </p>
          </div>
        }
      </div>
    </div>
  )
}

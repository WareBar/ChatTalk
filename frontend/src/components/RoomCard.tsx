
import { Users, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


import api from '../utils/api'
interface RoomCardProps {
  id:string
  name: string
  participants: []
  number_of_messages: string
  reference_code:string
}
export function RoomCard({
  id,
  name,
  participants,
  number_of_messages,
  reference_code
}: RoomCardProps) {

  // get the logged in user
  const {user, isLoading} = useAuth()
  console.log(id)


  const handleJoiningRoom = async (id) => {
    try{
      const response = await api.patch(`/conversation/${id}/`,{
        "participant_ids": [user.id]
      })
      if (response.status === 200){
        console.log(`${user.id} joined the room`)
      }
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      <div className="bg-linear-to-r from-emerald-500 to-emerald-600 h-2"></div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900">{name}</h3>
        </div>


        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{participants.length} members</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle className="w-4 h-4" />
            <span>{number_of_messages} messages</span>
          </div>
        </div>

        {
          isLoading?
          <p>Loading...</p>
          :
          user?
          participants.map(participant => participant.id).includes(user.id)?
          <Link
          to={`/conversation/${reference_code}/${name}`}
          className="block w-full text-center px-4 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors duration-300"
          >
            Enter Room
          </Link>
          :
          <Link
          to={`/conversation/${reference_code}/${name}`}
          className="block w-full text-center px-4 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors duration-300"
          onClick={()=>handleJoiningRoom(id)}
          >
            Join Room
          </Link>
          :''
        }

      </div>
    </div>
  )
}

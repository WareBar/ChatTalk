import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"

interface MessageProps {
  content: string
  sender: string
  timestamp: string
  // isOwn?: boolean
}
export function Message({
  content,
  sender,
  timestamp,
  // isOwn = false,
}: MessageProps) {

  const [isOwn, setIsOwn] = useState(false)
  // check if the sender is the user, if yes, then change the style of the message
  const {user, isLoading} = useAuth();

  useEffect(()=>{
    if (!user) return
    if (user.id === sender.id){
      setIsOwn(true)
    }
    else{
      setIsOwn(false)
    }
  },[user,sender])


  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-xs sm:max-w-md lg:max-w-lg ${isOwn ? 'order-2' : 'order-1'}`}
      >


        
        <div className={`flex ${isOwn? 'flex-row-reverse' : 'flex-row'} gap-2 items-center`}>
          <div className="flex flex-col items-center">
            <div className="text-sm font-semibold text-gray-700 mb-1">
              {
                isOwn? 'You':sender.first_name
              }
            </div>
            <div className="h-10 w-10 bg-green-500 rounded-full">
                <img 
                className='w-full h-full object-contain'
                src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/3c9f4a40760693.578c9a4699778.gif" alt="avatar" />
            </div>
          </div>
          <div
            className={`px-4 py-3 rounded-2xl ${isOwn ? 'bg-emerald-500 text-white rounded-br-sm' : 'bg-white text-gray-900 rounded-bl-sm shadow-md'}`}
          >
            <p className="wrap-break-word">{content}</p>
          </div>
        </div>
        <div
          className={`text-xs text-gray-500 mt-1 ${isOwn ? 'text-right' : 'text-left'}`}
        >
          {timestamp}
        </div>
      </div>
    </div>
  )
}

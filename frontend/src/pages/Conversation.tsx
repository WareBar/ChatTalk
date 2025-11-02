import { useEffect, useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Message } from '../components/Message'
import { Send, ArrowLeft, Users } from 'lucide-react'
import api from '../utils/api'
import { useChat } from '../hooks/useChat'



export function Conversation() {
  const { reference_code, room_name } = useParams()
  const [messages, setMessages] = useState([])
  const [isFetchingMessages, setIsFetchingMessages] = useState(true)
  const {data:liveMessages, sendData} = useChat(reference_code)
  const [text, setText] = useState("");
  
  
  
  const getMessages = async (ref:string) => {
    try{
      const response = await api.get(`/message/?conversation__reference_code=${ref}`)
      if(response.status === 200){
        setMessages(response.data)
        setIsFetchingMessages(false)
      }
    }
    catch (error) {
      console.error(`Error: ${error.response?.data || error.message}`)
      setIsFetchingMessages(false)
    }
  }

  useEffect(()=>{
    if (!reference_code) return
    getMessages(reference_code)
  },[reference_code])

  // Combine historical + live messages, sorted by timestamp
  const allMessages = useMemo(() => {
    const combined = [...messages, ...liveMessages]

    // remove duplicates (by id)
    const unique = combined.filter(
      (msg, index, self) => index === self.findIndex((m) => m.id === msg.id)
    )

    // sort by timestamp
    return unique.sort(
      (a, b) => new Date(a.sent_at).getTime() - new Date(b.sent_at).getTime()
    )
  }, [messages, liveMessages])




  const onSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      sendData(text.trim());
      setText("");
    }
  };


  return (
    <div className="h-screen flex flex-col bg-linear-to-br from-emerald-50 via-white to-emerald-50">
      {/* Header */}
      <div className="bg-white border-b border-emerald-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/rooms"
                className="p-2 hover:bg-emerald-50 rounded-lg transition-colors duration-300"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{room_name}</h1>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Users className="w-4 h-4" />
                  <span>unknown yet members online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {
        isFetchingMessages?
        <p>Loading Messages...</p>
        :
        allMessages.length > 0? 
        (
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {allMessages.map((message) => (
              <Message key={message.id} {...message} />
            ))}
          </div>
        </div>
        )
        :
        <div className="flex-1 flex justify-center items-center">
          <p>No Message here yet. Start the conversation</p>
        </div>
      }

        {/* {data.map((m) => (
          <div key={m.id}>
            <b>{m.sender.first_name}</b>: {m.content} <small>({new Date(m.sent_at).toLocaleTimeString()})</small>
          </div>
        ))} */}

      {/* Input Area */} 
      <form onSubmit={onSend}>
      <div className="bg-white border-t border-emerald-100 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-end space-x-3">
            <textarea
              placeholder="Type your message..."
              value={text}
              onChange={(e)=>setText(e.target.value)}
              rows={1}
              className="flex-1 px-4 py-3 rounded-xl border-2 border-emerald-200 focus:border-emerald-500 focus:outline-none resize-none transition-colors duration-300"
            />
            <button
            type='submit'
              className="p-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      </form>
    </div>
  )
}

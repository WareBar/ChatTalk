
import { Link } from 'react-router-dom'
import { MessageCircle, Users, Zap } from 'lucide-react'
export function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-emerald-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500 rounded-full mb-8 shadow-lg">
            <MessageCircle className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-emerald-500">ChatTalk</span>
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Connect with friends, join vibrant communities, and chat in
            real-time. Experience seamless conversations in a modern, beautiful
            interface.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/rooms"
              className="px-8 py-4 bg-emerald-500 text-white rounded-full font-semibold text-lg hover:bg-emerald-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Explore Rooms
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 bg-white text-emerald-600 rounded-full font-semibold text-lg hover:bg-emerald-50 border-2 border-emerald-500 transform hover:scale-105 transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-emerald-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <MessageCircle className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Real-Time Chat
            </h3>
            <p className="text-gray-600">
              Instant messaging with smooth, real-time updates. Never miss a
              conversation.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-emerald-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <Users className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Join Communities
            </h3>
            <p className="text-gray-600">
              Discover and join chat rooms based on your interests and passions.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-emerald-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <Zap className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Lightning Fast
            </h3>
            <p className="text-gray-600">
              Optimized for speed and performance. Enjoy seamless, lag-free
              conversations.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

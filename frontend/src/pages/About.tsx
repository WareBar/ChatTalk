
import { MessageCircle, Shield, Sparkles, Users } from 'lucide-react'
export function About() {
  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-emerald-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            About <span className="text-emerald-500">ChatTalk</span>
          </h1>
          <p className="text-xl text-gray-600">
            Building connections through seamless conversations
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            ChatTalk is designed to bring people together through intuitive,
            real-time communication. We believe that meaningful conversations
            should be effortless, accessible, and enjoyable.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Whether you're connecting with friends, collaborating with
            colleagues, or joining communities that share your interests,
            ChatTalk provides a modern, beautiful space for every conversation.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
            <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Real-Time Messaging
            </h3>
            <p className="text-gray-600">
              Experience instant communication with smooth, real-time message
              delivery and updates.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
            <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Community Rooms
            </h3>
            <p className="text-gray-600">
              Join topic-based chat rooms and connect with people who share your
              interests.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
            <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Safe & Secure
            </h3>
            <p className="text-gray-600">
              Your privacy matters. We prioritize security and data protection
              in every conversation.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
            <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Modern Design
            </h3>
            <p className="text-gray-600">
              Enjoy a clean, intuitive interface that makes chatting a
              delightful experience.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl shadow-xl p-8 sm:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Chatting?</h2>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of users already connecting on ChatTalk
          </p>
          <a
            href="/rooms"
            className="inline-block px-8 py-4 bg-white text-emerald-600 rounded-full font-semibold text-lg hover:bg-emerald-50 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Explore Chat Rooms
          </a>
        </div>
      </div>
    </div>
  )
}

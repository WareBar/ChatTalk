import { Link, useLocation } from 'react-router-dom'
import { MessageCircle, BellRing, LogOut, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNotification } from '../hooks/useNotification'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useEffect, useState, useRef } from 'react'
import Slide from '@mui/material/Slide'
import { CheckCircle } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'


function SlideTransition(props) {
  return <Slide {...props} direction="down" />
}

export function Navbar() {
  const location = useLocation()
  const isActive = (path: string) => location.pathname === path
  const { user, isLoading, logout } = useAuth()
  const { data } = useNotification(user?.id)
  const [open, setOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      setOpen(true)
      console.log(data)
    }
  }, [data])

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-emerald-100 shadow-sm">
      {/* Floating alert */}
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        TransitionComponent={SlideTransition}
      >
        <Alert
          icon={<CheckCircle fontSize="inherit" sx={{ color: '#047857' }} />}
          onClose={() => setOpen(false)}
          severity="success"
          variant="filled"
          sx={{
            width: '100%',
            backgroundColor: '#10B981',
            color: 'white',
            fontWeight: 500,
            borderRadius: '12px',
            boxShadow: '0 6px 20px rgba(16, 185, 129, 0.3)',
            letterSpacing: '0.3px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span className="text-sm">
            📧 <strong>{data?.title}</strong> | {data?.conversation_name}
          </span>
        </Alert>
      </Snackbar>

      {/* Navbar content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-emerald-500 p-2 rounded-lg group-hover:bg-emerald-600 transition-colors duration-300">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-emerald-600">ChatTalk</span>
          </Link>

          {/* Navigation links */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isActive('/') ? 'bg-emerald-500 text-white' : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isActive('/about') ? 'bg-emerald-500 text-white' : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
              }`}
            >
              About
            </Link>
            <Link
              to="/rooms"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isActive('/rooms') ? 'bg-emerald-500 text-white' : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
              }`}
            >
              Rooms
            </Link>

            {/* Auth Section */}
            {isLoading ? (
              <p>Loading...</p>
            ) : user ? (
              <div className="relative" ref={dropdownRef}>
                {/* Profile Image */}
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="rounded-full border h-12 w-12 overflow-hidden focus:outline-none ring-2 ring-transparent hover:ring-emerald-400 transition"
                >
                  <img
                    className="w-full h-full object-cover"
                    src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/3c9f4a40760693.578c9a4699778.gif"
                    alt="avatar"
                  />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-2xl shadow-lg py-2 animate-fade-in-down">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-semibold text-gray-800">{user.first_name} {user.last_name}</p>
                      <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    </div>

                    <button
                      onClick={() => navigate('notifications')}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition"
                    >
                      <BellRing className="w-4 h-4 mr-2" /> Notifications
                    </button>

                    <button
                      onClick={logout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
                    >
                      <LogOut className="w-4 h-4 mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive('/login') ? 'bg-emerald-500 text-white' : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
                }`}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

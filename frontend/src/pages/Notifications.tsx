import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import { motion } from "framer-motion";
import { CheckCircle, Bell } from "lucide-react";

interface Notification {
  id: number;
  to: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

export function Notifications() {
  const { user, isLoading } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch notifications
  const fetchNotifications = async (user_id: number) => {
    try {
      const response = await api.get(`/notification/?to__id=${user_id}`);
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  // Mark as read
  const markAsRead = async (id: number) => {
    try {
      await api.patch(`/notification/${id}/`, { is_read: true });
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, is_read: true } : notif
        )
      );
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  useEffect(() => {
    if (!isLoading && user) {
      fetchNotifications(user.id);
    }
  }, [user, isLoading]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-emerald-50 via-white to-emerald-50 text-gray-600">
        Loading notifications...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-emerald-50 via-white to-emerald-50 text-gray-600">
        Please log in to view notifications.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-emerald-50 py-20 px-6 sm:px-10">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500 rounded-full shadow-lg mb-6">
          <Bell className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
          Your <span className="text-emerald-500">Notifications</span>
        </h1>
        <p className="text-lg text-gray-600 mt-3">
          Stay updated with real-time alerts and messages.
        </p>
      </div>

      {/* Notification List */}
      <div className="max-w-3xl mx-auto space-y-4">
        {notifications.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center text-gray-500 border border-emerald-100">
            No new notifications. You're all caught up!
          </div>
        ) : (
          notifications.map((notif) => (
            <motion.div
              key={notif.id}
              layout
              whileHover={{ scale: 1.02 }}
              onClick={() => !notif.is_read && markAsRead(notif.id)}
              className={`p-6 rounded-2xl cursor-pointer border transition-all duration-500 shadow-md ${
                notif.is_read
                  ? "bg-white border-gray-100 hover:bg-gray-50"
                  : "bg-emerald-50 border-emerald-200 hover:bg-emerald-100"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p
                    className={`text-base sm:text-lg font-medium ${
                      notif.is_read ? "text-gray-800" : "text-emerald-800"
                    }`}
                  >
                    {notif.content}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(notif.created_at).toLocaleString()}
                  </p>
                </div>
                {notif.is_read ? (
                  <CheckCircle className="w-6 h-6 text-gray-300" />
                ) : (
                  <CheckCircle className="w-6 h-6 text-emerald-500 animate-pulse" />
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

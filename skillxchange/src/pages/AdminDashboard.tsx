import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { collection, getDocs, query, updateDoc, doc, addDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { UserProfile, SystemMessage } from "../types";

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [messages, setMessages] = useState<SystemMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState({
    title: "",
    content: "",
    type: "update" as const,
  });

  useEffect(() => {
    const fetchData = async () => {
      const usersSnap = await getDocs(collection(db, "users"));
      const messagesSnap = await getDocs(collection(db, "systemMessages"));
      
      setUsers(
        usersSnap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<UserProfile, "id">),
        }))
      );
      
      setMessages(
        messagesSnap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<SystemMessage, "id">),
        }))
      );
      
      setLoading(false);
    };

    fetchData();
  }, []);

  const toggleUserBan = async (userId: string, currentBanStatus: boolean) => {
    await updateDoc(doc(db, "users", userId), {
      banned: !currentBanStatus,
    });
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, banned: !currentBanStatus } : user
      )
    );
  };

  const sendSystemMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const message: Omit<SystemMessage, "id"> = {
      ...newMessage,
      timestamp: Date.now(),
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    };
    
    const docRef = await addDoc(collection(db, "systemMessages"), message);
    setMessages((prev) => [...prev, { id: docRef.id, ...message }]);
    setNewMessage({ title: "", content: "", type: "update" });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* User Management */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">User Management</h2>
            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 border rounded"
                >
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="text-xs text-gray-400">Role: {user.role}</p>
                  </div>
                  <button
                    onClick={() => toggleUserBan(user.id, user.banned || false)}
                    className={`px-4 py-2 rounded text-white ${
                      user.banned
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    {user.banned ? "Unban" : "Ban"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* System Messages */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">System Messages</h2>
            <form onSubmit={sendSystemMessage} className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  value={newMessage.title}
                  onChange={(e) =>
                    setNewMessage((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  value={newMessage.content}
                  onChange={(e) =>
                    setNewMessage((prev) => ({ ...prev, content: e.target.value }))
                  }
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  value={newMessage.type}
                  onChange={(e) =>
                    setNewMessage((prev) => ({
                      ...prev,
                      type: e.target.value as SystemMessage["type"],
                    }))
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="update">Update</option>
                  <option value="alert">Alert</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Send Message
              </button>
            </form>

            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 rounded ${
                    message.type === "alert"
                      ? "bg-red-50"
                      : message.type === "maintenance"
                      ? "bg-yellow-50"
                      : "bg-blue-50"
                  }`}
                >
                  <h3 className="font-medium">{message.title}</h3>
                  <p className="text-sm mt-1">{message.content}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(message.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard; 
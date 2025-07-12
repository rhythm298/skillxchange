import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import {
  getSwapRequests,
  updateRequestStatus,
  getUserProfile,
} from "../lib/api";
import { SwapRequest, UserProfile } from "../types";
import { useAuth } from "../contexts/AuthContext";

const RequestsPage: React.FC = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState<"pending" | "accepted" | "rejected">(
    "pending",
  );
  const [requests, setRequests] = useState<SwapRequest[]>([]);
  const [usersCache, setUsersCache] = useState<Record<string, UserProfile>>({});

  useEffect(() => {
    if (!user) return;
    (async () => {
      const data = await getSwapRequests(user.uid, "received");
      setRequests(data);
    })();
  }, [user]);

  const handleStatusChange = async (
    req: SwapRequest,
    status: "accepted" | "rejected",
  ) => {
    await updateRequestStatus(req.id, status);
    setRequests((prev) =>
      prev.map((r) => (r.id === req.id ? { ...r, status } : r)),
    );
  };

  const getUser = async (id: string) => {
    if (usersCache[id]) return usersCache[id];
    const profile = await getUserProfile(id);
    if (profile) {
      setUsersCache((c) => ({ ...c, [id]: profile }));
      return profile;
    }
    return null;
  };

  const filtered = requests.filter((r) => r.status === tab);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-4xl px-4 py-6 mx-auto bg-white rounded shadow">
        <div className="flex gap-2 mb-4">
          {(["pending", "accepted", "rejected"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1 border rounded ${
                tab === t ? "bg-blue-600 text-white" : "bg-white"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {filtered.map((req) => (
            <div key={req.id} className="p-4 border rounded">
              <p className="font-semibold">Request from: {req.fromUserId}</p>
              <p className="text-sm">
                Offered: {req.offeredSkill} | Wanted: {req.wantedSkill}
              </p>
              <p className="text-sm">Message: {req.message}</p>
              <p className="text-sm">Status: {req.status}</p>
              {tab === "pending" && (
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleStatusChange(req, "accepted")}
                    className="px-3 py-1 text-sm text-white bg-green-600 rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleStatusChange(req, "rejected")}
                    className="px-3 py-1 text-sm text-white bg-red-600 rounded"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && <p>No {tab} requests.</p>}
        </div>
      </main>
    </div>
  );
};

export default RequestsPage;
 
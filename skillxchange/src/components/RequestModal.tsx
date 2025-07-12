import React, { useState } from "react";
import { sendSwapRequest } from "../lib/api";
import { UserProfile } from "../types";
import { useAuth } from "../contexts/AuthContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  targetUser: UserProfile;
  currentUserProfile: UserProfile;
}

const RequestModal: React.FC<Props> = ({
  isOpen,
  onClose,
  targetUser,
  currentUserProfile,
}) => {
  const { user } = useAuth();
  const [offeredSkill, setOfferedSkill] = useState("");
  const [wantedSkill, setWantedSkill] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!user) return;
    setLoading(true);
    await sendSwapRequest({
      fromUserId: user.uid,
      toUserId: targetUser.id,
      offeredSkill,
      wantedSkill,
      message,
    });
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">Send Swap Request</h2>
        <div className="mb-3">
          <label className="block mb-1 text-sm font-medium">
            Your Offered Skill
          </label>
          <select
            value={offeredSkill}
            onChange={(e) => setOfferedSkill(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select skill</option>
            {currentUserProfile.skillsOffered.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="block mb-1 text-sm font-medium">Wanted Skill</label>
          <select
            value={wantedSkill}
            onChange={(e) => setWantedSkill(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select skill</option>
            {targetUser.skillsWanted.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="block mb-1 text-sm font-medium">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            rows={3}
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-200 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 text-sm text-white bg-green-600 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Request"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestModal;

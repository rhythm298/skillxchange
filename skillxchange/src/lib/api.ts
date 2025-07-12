import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { RequestStatus, SwapRequest, UserProfile } from "../types";

export const getPublicProfiles = async (): Promise<UserProfile[]> => {
  const q = query(
    collection(db, "users"),
    where("profileVisibility", "==", "public"),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<UserProfile, "id">),
  }));
};

export const getUserProfile = async (
  userId: string,
): Promise<UserProfile | null> => {
  const ref = doc(db, "users", userId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as Omit<UserProfile, "id">) };
};

export const saveUserProfile = async (profile: UserProfile) => {
  const ref = doc(db, "users", profile.id);
  await updateDoc(ref, { ...profile });
};

export const sendSwapRequest = async (data: {
  fromUserId: string;
  toUserId: string;
  offeredSkill: string;
  wantedSkill: string;
  message?: string;
}): Promise<void> => {
  await addDoc(collection(db, "swapRequests"), {
    ...data,
    status: "pending",
    timestamp: Date.now(),
  });
};

export const getSwapRequests = async (
  userId: string,
  type: "sent" | "received",
): Promise<SwapRequest[]> => {
  const field = type === "sent" ? "fromUserId" : "toUserId";
  const q = query(
    collection(db, "swapRequests"),
    where(field, "==", userId),
    orderBy("timestamp", "desc"),
    limit(100),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<SwapRequest, "id">),
  }));
};

export const updateRequestStatus = async (
  requestId: string,
  status: RequestStatus,
) => {
  const ref = doc(db, "swapRequests", requestId);
  await updateDoc(ref, { status });
};

import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  serverTimestamp,
  updateDoc,
  doc 
} from "firebase/firestore";
import { db } from "../firebase";

// Collection names
const APPOINTMENTS_COL = "appointments";
const DISPATCH_COL = "emergency_dispatches";
const CHAT_LOGS_COL = "dispatch_chat_logs";

/**
 * Save an appointment booking to Firestore
 */
export async function createAppointment(data) {
  try {
    const docRef = await addDoc(collection(db, APPOINTMENTS_COL), {
      ...data,
      status: "Confirmed",
      createdAt: serverTimestamp(),
      createdDateString: new Date().toISOString()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error creating appointment in Firestore:", error);
    // Return graceful fallback so user can still continue even if offline
    return { success: false, error: error.message };
  }
}

/**
 * Fetch all appointments from Firestore
 */
export async function getAppointments() {
  try {
    const q = query(collection(db, APPOINTMENTS_COL), orderBy("createdAt", "desc"), limit(50));
    const querySnapshot = await getDocs(q);
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });
    return results;
  } catch (error) {
    console.warn("Error fetching appointments from Firestore:", error);
    return [];
  }
}

/**
 * Trigger an Emergency Dispatch alert
 */
export async function requestEmergencyDispatch(dispatchData) {
  try {
    const docRef = await addDoc(collection(db, DISPATCH_COL), {
      ...dispatchData,
      status: "Active Dispatched",
      eta: "5-7 mins",
      priority: "CRITICAL-1",
      createdAt: serverTimestamp(),
      timestamp: new Date().toISOString()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error dispatching unit in Firestore:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Fetch emergency dispatches
 */
export async function getEmergencyDispatches() {
  try {
    const q = query(collection(db, DISPATCH_COL), orderBy("createdAt", "desc"), limit(20));
    const querySnapshot = await getDocs(q);
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });
    return results;
  } catch (error) {
    console.warn("Error fetching dispatches:", error);
    return [];
  }
}

/**
 * Log chat messages to Firestore for auditing / emergency response tracking
 */
export async function logChatMessage(sessionId, message) {
  try {
    await addDoc(collection(db, CHAT_LOGS_COL), {
      sessionId,
      sender: message.sender,
      text: message.text,
      timestamp: serverTimestamp()
    });
  } catch (e) {
    // Non-blocking log error
    console.warn("Chat log error:", e);
  }
}

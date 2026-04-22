import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.js";

/**
 * Estado en tiempo real del dispositivo desde la colección `devices/{deviceId}`.
 * El backend actualiza este documento con cada mensaje de estado MQTT (online/offline).
 */
export function useDeviceStatus(deviceId) {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!deviceId) return;
    return onSnapshot(doc(db, "devices", deviceId), (snap) => {
      if (snap.exists()) setStatus(snap.data());
    });
  }, [deviceId]);

  return status;
}

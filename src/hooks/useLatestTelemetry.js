import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.js";

/**
 * Escucha el documento `patients/{patientId}/devices/{deviceId}/latest/current`
 * que el backend sobreescribe con cada trama MQTT recibida del ESP32.
 */
export function useLatestTelemetry(patientId, deviceId) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!patientId || !deviceId) return;
    const ref = doc(
      db,
      "patients", patientId,
      "devices",  deviceId,
      "latest",   "current"
    );
    return onSnapshot(ref, (snap) => {
      if (snap.exists()) setData(snap.data());
    });
  }, [patientId, deviceId]);

  return data;
}

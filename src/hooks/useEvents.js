import { useEffect, useState } from "react";
import { collection, query, orderBy, limit as fbLimit, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.js";

/**
 * Suscripción en tiempo real a los últimos `maxEvents` eventos del paciente,
 * ordenados por timestamp descendente. Devuelve el array actualizado en cada cambio.
 */
export function useEvents(patientId, maxEvents = 50) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!patientId) return;
    const q = query(
      collection(db, "patients", patientId, "events"),
      orderBy("timestamp", "desc"),
      fbLimit(maxEvents)
    );
    // onSnapshot devuelve la función de desuscripción; React la llama al desmontar.
    return onSnapshot(q, (snap) => {
      setEvents(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }, [patientId, maxEvents]);

  return events;
}

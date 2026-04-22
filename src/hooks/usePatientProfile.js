import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.js";

/**
 * Perfil del paciente desde `patients/{patientId}`.
 * Contiene nombre, tipo de epilepsia y metadatos clínicos.
 */
export function usePatientProfile(patientId) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!patientId) return;
    return onSnapshot(doc(db, "patients", patientId), (snap) => {
      if (snap.exists()) setProfile(snap.data());
    });
  }, [patientId]);

  return profile;
}

// ──────────────────────────────────────────
// TEMA
// ──────────────────────────────────────────
// Persiste la preferencia en localStorage (clave "ng-theme").
// Aplica/quita la clase "light" en <html>; el modo por defecto es oscuro.
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({ dark: true, toggle: () => {} });

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem("ng-theme");
      return saved ? saved === "dark" : true;
    } catch {
      return true;
    }
  });

  // Aplica/quita la clase "light" en el elemento raíz y persiste la preferencia.
  useEffect(() => {
    if (dark) {
      root.classList.remove("light");
    } else {
      root.classList.add("light");
    }
    try {
      localStorage.setItem("ng-theme", dark ? "dark" : "light");
    } catch {}
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark((d) => !d) }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

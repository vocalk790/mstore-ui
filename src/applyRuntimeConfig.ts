export function applyRuntimeConfig() {
  try {
    const raw = localStorage.getItem("negastore_cfg") || "{}";
    const cfg = JSON.parse(raw);
    (window as any).VITE_API_BASE  = cfg.base  || (import.meta as any).env.VITE_API_BASE;
    (window as any).VITE_API_TOKEN = cfg.token || (import.meta as any).env.VITE_API_TOKEN;
    (window as any).VITE_WS_TRADES = cfg.ws    || (import.meta as any).env.VITE_WS_TRADES;
    if (cfg.debug) (window as any).NEGASTORE_DEBUG = true;
  } catch(e) { console.warn("[negastore] runtime cfg fail:", e); }
}

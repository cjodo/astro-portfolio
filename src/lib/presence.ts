type NvimMode = "i" | "n" | "v" | "V";
export type PresenceStatus = "connected" | "disconnected" | "idle" | "offline";

export type SubscribeFn = (
  state: PresenceState | null,
  status: PresenceStatus
) => void;

export type PresenceState = {
  project?: string;
  user: string;
  updated_at: number;
  session: string;
  filetype?: string;
  cwd: string;
  mode: NvimMode;
  received_at: string;
  file?: string;
};

const IDLE_THRESHOLD_MS = 30000;
const ACTIVE_THRESHOLD_MS = 5000;

export const createPresenceClient = (endpoint: string) => {
  const es = new EventSource(endpoint);

  let subscribers: SubscribeFn[] = [];
  let state: PresenceState | null = null;
  let rawStatus: "connected" | "disconnected" = "disconnected";
  let lastUpdateTime = 0;
  let statusCheckInterval: ReturnType<typeof setInterval> | null = null;

  const getStatus = (): PresenceStatus => {
    if (rawStatus === "disconnected") return "offline";
    if (!state) return "connected";

    const timeSinceUpdate = Date.now() - lastUpdateTime;
    if (timeSinceUpdate > IDLE_THRESHOLD_MS) return "offline";
    if (timeSinceUpdate > ACTIVE_THRESHOLD_MS) return "idle";
    return "connected";
  };

  const notify = (newState: PresenceState | null) => {
    const currentStatus = getStatus();
    subscribers.forEach((fn) => {
      fn(newState, currentStatus);
    });
  };

  const startStatusCheck = () => {
    if (statusCheckInterval) return;
    statusCheckInterval = setInterval(() => {
      notify(state);
    }, 5000);
  };

  const stopStatusCheck = () => {
    if (statusCheckInterval) {
      clearInterval(statusCheckInterval);
      statusCheckInterval = null;
    }
  };

  es.onopen = () => {
    rawStatus = "connected";
    startStatusCheck();
    notify(state);
  };

  es.onerror = () => {
    rawStatus = "disconnected";
    stopStatusCheck();
    notify(state);
  };

  es.onmessage = (event) => {
    try {
      const data: PresenceState = JSON.parse(event.data);
      state = data;
      lastUpdateTime = Date.now();
      rawStatus = "connected";
      notify(state);
    } catch (err) {
      console.error("Failed to parse presence state:", err);
    }
  };

  return {
    subscribe(fn: SubscribeFn) {
      subscribers.push(fn);
      fn(state, getStatus());
      return () => {
        subscribers = subscribers.filter((s) => s !== fn);
        if (subscribers.length === 0) {
          stopStatusCheck();
        }
      };
    },
    getState(): PresenceState | null {
      return state;
    },
    getStatus(): PresenceStatus {
      return getStatus();
    },
    disconnect() {
      stopStatusCheck();
      es.close();
      rawStatus = "disconnected";
      state = null;
      notify(null);
    },
  };
};

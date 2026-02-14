type NvimMode = "i" | "n" | "v" | "V";
type Status = "connected" | "disconnected";

export type SubscribeFn = (
  state: PresenceState,
  prevState: PresenceState
) => void;

export type PresenceState = {
  project?: string;
  user: string;
  updated_at: number;
  session: string;
  filetype: string;
  cwd: string;
  mode: NvimMode;
  received_at: string;
};

/**
 * @param endpoint URL where presence.nvim is sending POST requests (server SSE endpoint)
 */
export const createPresenceClient = (endpoint: string) => {
  const es = new EventSource(endpoint);

  let subscribers: SubscribeFn[] = [];
  let state: PresenceState | null = null;
  let status: Status = "disconnected";

  const notify = (newState: PresenceState) => {
    const prev = state;
    state = newState;
    subscribers.forEach((fn) => {
      fn(state!, prev ?? state!);
    });
  };

  es.onopen = () => {
    status = "connected";
  };

  es.onerror = () => {
    status = "disconnected";
  };

  es.onmessage = (event) => {
    try {
      const data: PresenceState = JSON.parse(event.data);
      notify(data);
    } catch (err) {
      console.error("Failed to parse presence state:", err);
    }
  };

  return {
    subscribe(fn: SubscribeFn) {
      subscribers.push(fn);
      if (state) fn(state, state);
      return () => {
        subscribers = subscribers.filter((s) => s !== fn);
      };
    },
    getState(): PresenceState | null {
      return state;
    },
    getStatus(): Status {
      return status;
    },
    disconnect() {
      es.close();
      status = "disconnected";
    },
  };
};


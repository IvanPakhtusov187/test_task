const AUTH_STORAGE_KEY = "admin_auth";

interface StoredAuth {
  token: string;
  userId: number;
}

const parseStoredAuth = (value: string | null): StoredAuth | null => {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as StoredAuth;
    if (!parsed.token || typeof parsed.userId !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
};

export const getStoredAuth = (): StoredAuth | null => {
  const fromSession = parseStoredAuth(sessionStorage.getItem(AUTH_STORAGE_KEY));
  if (fromSession) return fromSession;
  return parseStoredAuth(localStorage.getItem(AUTH_STORAGE_KEY));
};

export const setStoredAuth = (payload: StoredAuth, rememberMe: boolean) => {
  const serialized = JSON.stringify(payload);
  if (rememberMe) {
    localStorage.setItem(AUTH_STORAGE_KEY, serialized);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
  } else {
    sessionStorage.setItem(AUTH_STORAGE_KEY, serialized);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
};

export const clearStoredAuth = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
};

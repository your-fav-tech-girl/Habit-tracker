import { User, Session } from "../types/auth";
import {
  STORAGE_KEYS,
  getStorage,
  setStorage,
  removeFromStorage,
} from "./storage";

/**
 * Get all users
 */
export function getUsers(): User[] {
  return getStorage<User[]>(STORAGE_KEYS.users, []);
}

/**
 * Save users
 */
export function saveUsers(users: User[]): void {
  setStorage(STORAGE_KEYS.users, users);
}

/**
 * Get current session
 */
export function getSession(): Session | null {
  return getStorage<Session | null>(STORAGE_KEYS.session, null);
}

/**
 * Set active session
 */
export function setSession(session: Session): void {
  setStorage(STORAGE_KEYS.session, session);
}

/**
 * Remove active session
 */
export function clearSession(): void {
  removeFromStorage(STORAGE_KEYS.session);
}

/**
 * Signup
 */
export function signup(email: string, password: string) {
  const users = getUsers();

  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    return {
      success: false,
      message: "User already exists",
    };
  }

  const newUser: User = {
    id: crypto.randomUUID(),
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  const updatedUsers = [...users, newUser];

  saveUsers(updatedUsers);

  setSession({
    userId: newUser.id,
    email: newUser.email,
  });

  return {
    success: true,
    user: newUser,
  };
}

/**
 * Login
 */
export function login(email: string, password: string) {
  const users = getUsers();

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }

  setSession({
    userId: user.id,
    email: user.email,
  });

  return {
    success: true,
    user,
  };
}

/**
 * Logout
 */
export function logout(): void {
  clearSession();
}

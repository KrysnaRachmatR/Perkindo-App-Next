// src/utils/auth.ts

// Mengambil token dari local storage
export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token"); // Pastikan Anda menyimpan token di localStorage dengan key 'token'
  }
  return null;
};

// Mengatur header otorisasi
export const setAuthHeader = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Menyimpan token ke local storage
export const setToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
};

// Menghapus token dari local storage
export const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
};

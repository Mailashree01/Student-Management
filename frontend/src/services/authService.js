// Simple authentication service (no JWT, just basic role assignment)
export const login = (username, password) => {
  // Simple hardcoded authentication for demo purposes
  if (username === "admin" && password === "admin123") {
    return { role: "ADMIN" };
  } else if (username === "student" && password === "student123") {
    return { role: "STUDENT" };
  } else {
    throw new Error("Invalid credentials");
  }
};

export const logout = () => {
  localStorage.removeItem("role");
};

export const getCurrentUser = () => {
  // Return a default user for demo
  return { role: "ADMIN" };
};

export const getToken = () => {
  // No JWT token
  return null;
};

export const isAuthenticated = () => {
  // Always authenticated for demo
  return true;
};
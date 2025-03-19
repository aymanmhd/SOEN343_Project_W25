import { createContext, useState, useContext, useEffect } from "react";

// Create Authentication Context
const AuthContext = createContext();

// AuthProvider: Wrap this around your app to manage authentication state globally
export const AuthProvider = ({ children }) => {
  // User state: Stores the logged-in user's information
  const [user, setUser] = useState(null);

  // Simulate user login (mock for now)
  const login = async (role) => {
    // TODO: Replace this with actual API call when backend is ready
    // Example: await fetch('/api/login', { method: 'POST', body: { email, password } })

    console.log(`Mock login as ${role}`);
    setUser({ role }); // Setting a fake user role (attendee, organizer, admin)
  };

  // Simulate user logout
  const logout = async () => {
    // TODO: Replace this with actual API logout request
    // Example: await fetch('/api/logout')

    console.log("Mock logout");
    setUser(null); // Clearing user session
  };

  // Simulate checking for an existing user session (useful if backend supports JWT sessions)
  useEffect(() => {
    // TODO: Fetch session data from backend if user is already logged in
    // Example: fetch('/api/session').then(res => res.json()).then(data => setUser(data.user))

    console.log("Mock checking session (replace with actual API call)");
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook: Use this in any component to access authentication state
export const useAuth = () => {
  return useContext(AuthContext);
};

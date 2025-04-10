import React, { createContext, useContext, useEffect, useState } from "react";

// Keys in localStorage
const STORAGE_USERS = "mockUsers";
const STORAGE_EVENTS = "mockEvents";
const STORAGE_CURRENT_USER = "mockCurrentUser";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);    // currently logged-in user
  const [users, setUsers] = useState([]);    // all registered users
  const [events, setEvents] = useState([]);  // all created events

  // Load from localStorage when app first mounts
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem(STORAGE_USERS)) || [];
    const storedEvents = JSON.parse(localStorage.getItem(STORAGE_EVENTS)) || [];
    const storedCurrentUser =
      JSON.parse(localStorage.getItem(STORAGE_CURRENT_USER)) || null;
    setUsers(storedUsers);
    setEvents(storedEvents);
    setUser(storedCurrentUser);
  }, []);

  // Helper to update user in state + localStorage
  function saveCurrentUser(u) {
    localStorage.setItem(STORAGE_CURRENT_USER, JSON.stringify(u));
    setUser(u);
  }

  // Helper to update entire user list + localStorage
  function saveUsers(uList) {
    localStorage.setItem(STORAGE_USERS, JSON.stringify(uList));
    setUsers(uList);
  }

  // Helper to update events + localStorage
  function saveEvents(eList) {
    localStorage.setItem(STORAGE_EVENTS, JSON.stringify(eList));
    setEvents(eList);
  }

  //----------------------------------------------------------------
  // SIGN UP: using the form on SignUpPage
  //----------------------------------------------------------------
  function signUpUser({ name, email, password, role }) {
    const existing = users.find(
      (usr) => usr.email.toLowerCase() === email.toLowerCase()
    );
    if (existing) {
      // For a real flow, you might show "Email already in use"
      // But for quick mock, let's just overwrite existing user:
      existing.name = name;
      existing.password = password;
      existing.role = role;
      saveUsers([...users]);
      return;
    }

    // Otherwise create new user
    const newUser = {
      id: Date.now(), // just a numeric ID
      name,
      email,
      password,
      role,
      dailyStreak: role === "attendee" ? 0 : undefined, // track streak if attendee
      registeredEvents: role === "attendee" ? [] : undefined, // only for attendee
    };
    saveUsers([...users, newUser]);
  }

  //----------------------------------------------------------------
  // LOGIN: real email/password approach
  //----------------------------------------------------------------
  function login(email, password) {
    // Find matching user in mock DB
    const foundUser = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!foundUser) {
      // If no match, throw an error
      throw new Error("Invalid credentials");
    }

    // If it's an attendee, increment dailyStreak
    if (foundUser.role === "attendee") {
      foundUser.dailyStreak = (foundUser.dailyStreak || 0) + 1;
    }

    // Persist the updated user + set as current user
    saveCurrentUser(foundUser);
    // If we changed foundUser, also update users array
    saveUsers([...users]);

    return foundUser;
  }

  //----------------------------------------------------------------
  // LOGOUT
  //----------------------------------------------------------------
  function logout() {
    localStorage.removeItem(STORAGE_CURRENT_USER);
    setUser(null);
  }

  //----------------------------------------------------------------
  // CREATE AN EVENT
  //----------------------------------------------------------------
  function createEvent({
    name,
    date,
    time,
    location,
    price,
    description,
    speakers,
  }) {
    const newEvent = {
      id: Date.now(),
      title: name,
      date,
      time,
      location,
      price,
      description,
      speakers,
      organizerId: user?.id, // who created it
      organizerEmail: user?.email,
      registeredAttendees: [], // which attendee IDs have registered
    };
    saveEvents([...events, newEvent]);
  }

  //----------------------------------------------------------------
  // REGISTER FOR EVENT
  //----------------------------------------------------------------
  function registerForEvent(eventId) {
    if (!user) return; // not logged in
    if (user.role !== "attendee") return; // only attendees can register

    // 1) Mark the event as “registered by this user”
    const updatedEvents = events.map((evt) => {
      if (evt.id === Number(eventId)) {
        // add userId to “registeredAttendees” if not already present
        if (!evt.registeredAttendees.includes(user.id)) {
          evt.registeredAttendees.push(user.id);
        }
      }
      return evt;
    });
    saveEvents(updatedEvents);

    // 2) Also keep track in user’s “registeredEvents”
    const updatedUser = { ...user };
    if (!updatedUser.registeredEvents.includes(eventId)) {
      updatedUser.registeredEvents.push(Number(eventId));
    }
    // update the user in the user list
    const newUserList = users.map((u) =>
      u.id === updatedUser.id ? updatedUser : u
    );
    saveUsers(newUserList);
    saveCurrentUser(updatedUser);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        events,
        signUpUser,
        login,
        logout,
        createEvent,
        registerForEvent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook for components to consume
export function useAuth() {
  return useContext(AuthContext);
}

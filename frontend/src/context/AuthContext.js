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
  // SIGN UP
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
      id: Date.now(),
      name,
      email,
      password,
      role,
      dailyStreak: role === "attendee" ? 0 : undefined,
      registeredEvents: role === "attendee" ? [] : undefined,
    };
    saveUsers([...users, newUser]);
  }

  //----------------------------------------------------------------
  // LOGIN
  //----------------------------------------------------------------
  function login(email, password) {
    const foundUser = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!foundUser) {
      throw new Error("Invalid credentials");
    }

    // If it's an attendee, increment dailyStreak
    if (foundUser.role === "attendee") {
      foundUser.dailyStreak = (foundUser.dailyStreak || 0) + 1;
    }

    saveCurrentUser(foundUser);
    saveUsers([...users]); // persist any changes (streak, etc.)

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
      organizerId: user?.id,
      organizerEmail: user?.email,
      registeredAttendees: [],
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
        if (!evt.registeredAttendees.includes(user.id)) {
          evt.registeredAttendees.push(user.id);
        }
      }
      return evt;
    });
    saveEvents(updatedEvents);

    // 2) Also keep track in user’s “registeredEvents”
    const updatedUser = { ...user };
    if (!updatedUser.registeredEvents.includes(Number(eventId))) {
      updatedUser.registeredEvents.push(Number(eventId));
    }
    const newUserList = users.map((u) =>
      u.id === updatedUser.id ? updatedUser : u
    );
    saveUsers(newUserList);
    saveCurrentUser(updatedUser);
  }

  //----------------------------------------------------------------
  // DELETE AN EVENT
  //----------------------------------------------------------------
  function deleteEvent(eventId) {
    // Remove the event from events array
    const updatedEvents = events.filter((evt) => evt.id !== eventId);

    // For every attendee that had this event in their registeredEvents,
    // remove it to avoid leftover references
    const updatedUsers = users.map((u) => {
      if (u.registeredEvents) {
        u.registeredEvents = u.registeredEvents.filter(
          (regId) => regId !== eventId
        );
      }
      return u;
    });

    saveEvents(updatedEvents);
    saveUsers(updatedUsers);

    // If the current user had that event in their registrations,
    // we've already updated them in updatedUsers => re-pull from there
    if (user) {
      const newCurrentUser = updatedUsers.find((u) => u.id === user.id);
      if (newCurrentUser) {
        saveCurrentUser(newCurrentUser);
      }
    }
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
        deleteEvent, // expose our new function
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

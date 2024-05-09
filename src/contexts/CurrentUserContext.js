import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

// Create context for current user and context for setting current user
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

// Custom hook to access current user context
export const useCurrentUser = () => useContext(CurrentUserContext);
// Custom hook to access set current user context
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Get and set current user when component mounts
  const handleMount = async () => {
    try {
      const { data } = await axios.get("/dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  // Call handleMount when component mounts
  useEffect(() => {
    handleMount();
  }, []);

  return (
    // Provide current user data through context to child components
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};

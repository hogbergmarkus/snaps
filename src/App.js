import { useState, useEffect, createContext } from "react";
import axios from "axios";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";

// Create context for current user and context for setting current user
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

function App() {
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
        <div className={styles.App}>
          <NavBar />
          <Container>
            <Routes>
              <Route exact path="/" element={<h1>Home</h1>} />
              <Route exact path="/sign-in" element={<SignInForm />} />
              <Route exact path="/register" element={<SignUpForm />} />
              <Route exact path="/profile" element={<h1>Profile</h1>} />
              <Route exact path="/albums" element={<h1>Albums</h1>} />
              <Route exact path="/liked-posts" element={<h1>Liked Posts</h1>} />
              <Route path="*" element={<p>Page not found</p>} />
            </Routes>
          </Container>
        </div>
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;

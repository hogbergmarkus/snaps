import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";

function App() {
  return (
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
          <Route
            exact
            path="/posts/create"
            element={<h1>Create Post Page</h1>}
          />
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;

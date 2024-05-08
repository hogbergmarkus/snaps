import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container>
        <Routes>
          <Route exact path="/" element={<h1>Home</h1>} />
          <Route exact path="/sign-in" element={<h1>Sign in</h1>} />
          <Route exact path="/register" element={<SignUpForm />} />
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;

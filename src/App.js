import "./App.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Container>
        <Routes>
          <Route exact path="/" element={<h1>Home</h1>} />
          <Route exact path="/sign-in" element={<h1>Sign in</h1>} />
          <Route exact path="/register" element={<h1>Register</h1>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;

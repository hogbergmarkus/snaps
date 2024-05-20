import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostDetail from "./pages/posts/PostDetail";
import PostsFeed from "./pages/posts/PostsFeed";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import PostEditForm from "./pages/posts/PostEditForm";
import Albums from "./pages/albums/Albums";
import AlbumDetail from "./pages/albums/AlbumDetail";
import ProfilePage from "./pages/profiles/ProfilePage";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container>
        <Routes>
          <Route
            exact
            path="/"
            element={<PostsFeed message="No results found." />}
          />
          <Route exact path="/sign-in" element={<SignInForm />} />
          <Route exact path="/register" element={<SignUpForm />} />
          <Route exact path="/profiles/:id" element={<ProfilePage />} />
          <Route exact path="/albums" element={<Albums />} />
          <Route exact path="/albums/:id" element={<AlbumDetail />} />
          <Route
            exact
            path="/liked-posts"
            element={
              <PostsFeed
                message="No results found."
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            }
          />
          <Route exact path="/posts/create" element={<PostCreateForm />} />
          <Route exact path="/posts/:id" element={<PostDetail />} />
          <Route exact path="/posts/:id/edit" element={<PostEditForm />} />
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;

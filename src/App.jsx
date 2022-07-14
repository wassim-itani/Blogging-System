import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PostContext, UserContext } from "./context";
import { Navbar, Footer } from "./component/layout";
import {
  Home,
  About,
  Contact,
  Auth,
  CreatePost,
  EditPost,
  Dashboard,
  SinglePost,
  Search,
  NotFound,
} from "./pages";
import { RestrictedRoute, PrivateRoute } from "./component/wrapper";
import "./scss/index.scss";

const App = () => {
  return (
    <Router>
      <UserContext>
        <PostContext>
          <Navbar />
          <div className="content-wrapper">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/search" element={<Search />} />
              <Route path="/post/:id" element={<SinglePost />} />
              <Route
                path="/login"
                element={
                  <RestrictedRoute>
                    <Auth key="1" type="login" />
                  </RestrictedRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <RestrictedRoute>
                    <Auth key="2" type="register" />
                  </RestrictedRoute>
                }
              />
              <Route
                path="/create-post"
                element={
                  <PrivateRoute>
                    <CreatePost />
                  </PrivateRoute>
                }
              />
              <Route
                path="/edit/:postId"
                element={
                  <PrivateRoute>
                    <EditPost />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </div>
        </PostContext>
      </UserContext>
      <Footer />
    </Router>
  );
};

export default App;

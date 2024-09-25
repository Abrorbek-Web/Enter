import { ToastContainer } from "react-toastify";
import { Login, Register } from "./pages";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Home, Layout, ReportPage, ListPage, UserProfile } from "./components";
import { LayoutAdmin, AdminPanel, UserDetails, Projects } from "./admin";
import { useEffect } from "react";
import { getAccessToken } from "./services/tokenService";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

function AppRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAccessToken();
    const admin = localStorage.getItem("isAdmin");
    if (token && admin === "true") {
      navigate("/admin");
    } else if (token && admin === "false") {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <Routes>
      {/* Routes without Layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Routes with Layout */}
      <Route
        path="/*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/list/:id" element={<ListPage />} />
              <Route path="/detail/:id" element={<ReportPage />} />
              <Route path="/userProfile/:id" element={<UserProfile />} />
              {/* <Route path="/detailModal/:id" element={<DetailModel />} /> */}
              {/* Add more routes here */}
            </Routes>
          </Layout>
        }
      />
      {/* Routes with Layout Admin */}
      <Route
        path="/admin/*"
        element={
          <LayoutAdmin>
            <Routes>
              <Route path="/" element={<AdminPanel />} />
              <Route path="/project" element={<Projects />} />
              <Route path="/details/:id" element={<UserDetails />} />
              {/* <Route path="/list/:id" element={<ListPage />} />
              <Route path="/detail/:id" element={<ReportPage />} /> */}
              {/* <Route path="/detailModal/:id" element={<DetailModel />} /> */}
              {/* Add more routes here */}
            </Routes>
          </LayoutAdmin>
        }
      />
    </Routes>
  );
}

export default App;

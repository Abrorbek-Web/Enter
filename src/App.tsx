import { ToastContainer } from "react-toastify";
import { Login, Register } from "./pages";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Home, Layout, ReportPage, ListPage } from "./components";
import { useEffect } from "react";
import { getAccessToken } from "./services/tokenService";

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
    if (token) {
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
              {/* <Route path="/detailModal/:id" element={<DetailModel />} /> */}
              {/* Add more routes here */}
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;

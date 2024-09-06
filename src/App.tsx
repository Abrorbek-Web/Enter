import { ToastContainer } from "react-toastify";
import { Login, Register } from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ListPage } from "./components/list";
import { Home, Layout } from "./components";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
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
                  <Route path="/:id" element={<ListPage />} />
                  {/* Add more routes here */}
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

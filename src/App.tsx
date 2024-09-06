import { ToastContainer } from "react-toastify";
import { Login, Register } from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QuotesListPage } from "./components/list";
import { Home, Layout } from "./components";
// import ProtectedRoutes from "./routes/ProtectedRoutes";
function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          {/* <Route path="/admin" element={<ProtectedAdminRoutes />}>
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/file-uploading" element={<FileUploading />} />
            <Route path="/admin/users/:id" element={<UserDetails />} />
            <Route path="/admin/documents" element={<Documents />} />
            <Route path="/admin/documents/:id" element={<DocumentDetails />} />
          </Route> */}

          {/* <Route path="/" element={<ProtectedRoutes />}> */}
          <Route path="/" element={<Home />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* </Route> */}
          <Route path="/ref" element={<QuotesListPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/waiting" element={<Waiting />} /> */}

          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

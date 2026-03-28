import { BrowserRouter, Routes, Route } from "react-router-dom"
import Welcome from "./pages/welcome"
import Dashboard from "./pages/admin/dashboard"
import Login from "./pages/auth/login"
import Register from "./pages/auth/register"
import DocumentListPage from "./pages/admin/document/list"
import UserListPage from "./pages/admin/user/list-user"
import CreateDocumentPage from "./pages/admin/document/create"
import EditDocumentPage from "./pages/admin/document/edit-document"
import ProcessDocumentPage from "./pages/admin/document/process-document"
import UnauthorizedPage from "./pages/unauthorized"
import NewChatPage from "./pages/chat/new-chat"
import DetailChatPage from "./pages/chat/detail-chat"
import { AdminRoute } from "./components/auth/AdminRoute"
import { ProtectedRoute } from "./components/auth/ProtectedRoute"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* Protected routes (any authenticated user) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Welcome />
            </ProtectedRoute>
          }
        />

        {/* Chat routes (protected) */}
        <Route
          path="/chat/new"
          element={
            <ProtectedRoute>
              <NewChatPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat/:id"
          element={
            <ProtectedRoute>
              <DetailChatPage />
            </ProtectedRoute>
          }
        />

        {/* Admin-only routes with /admin prefix */}
        <Route path="/admin">
          <Route
            path="dashboard"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
          <Route
            path="document"
            element={
              <AdminRoute>
                <DocumentListPage />
              </AdminRoute>
            }
          />
          <Route
            path="document/create"
            element={
              <AdminRoute>
                <CreateDocumentPage />
              </AdminRoute>
            }
          />
          <Route
            path="document/edit/:id"
            element={
              <AdminRoute>
                <EditDocumentPage />
              </AdminRoute>
            }
          />
          <Route
            path="document/process"
            element={
              <AdminRoute>
                <ProcessDocumentPage />
              </AdminRoute>
            }
          />
          <Route
            path="user"
            element={
              <AdminRoute>
                <UserListPage />
              </AdminRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

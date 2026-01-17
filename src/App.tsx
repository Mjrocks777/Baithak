import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import { SidebarLayout } from "./pages/SidebarLayout";
import ProfilePage from "./pages/ProfilePage";
import Dashboard from "./pages/Dashboard";
import TheVault from "./pages/TheVault";
import SettingsPage from "./pages/SettingsPage";
import { ThemeProvider } from "./components/theme-provider";
import ErrorBoundary from "./components/error-boundary";
import { ProtectedRoute } from "./components/ProtectedRoute";
import "./index.css";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          {/* Public Route: Landing page */}
          <Route path="/" element={<LandingPage />} errorElement={<ErrorBoundary />} />

          {/* Auth Page */}
          <Route path="/auth" element={<AuthPage />} errorElement={<ErrorBoundary />} />

          {/* Protected Routes with Sidebar - requires authentication */}
          <Route element={
            <ProtectedRoute>
              <SidebarLayout />
            </ProtectedRoute>
          } errorElement={<ErrorBoundary />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/vault" element={<TheVault />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          {/* Fallback - redirect unknown routes to landing */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
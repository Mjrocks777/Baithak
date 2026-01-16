
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import { SidebarLayout } from "./pages/SidebarLayout";
import ProfilePage from "./pages/ProfilePage";
import Dashboard from "./pages/Dashboard";
import { ThemeProvider } from "./components/theme-provider";
import "./index.css";

import ErrorBoundary from "./components/error-boundary";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} errorElement={<ErrorBoundary />} />
          <Route path="/auth" element={<AuthPage />} errorElement={<ErrorBoundary />} />
          <Route element={<SidebarLayout />} errorElement={<ErrorBoundary />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          {/* Catch-all route to prevent blank screens on 404 */}
          <Route path="*" element={<ErrorBoundary />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

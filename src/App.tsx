import { Authenticated, Unauthenticated, AuthLoading, useConvexAuth } from "convex/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import { SidebarLayout } from "./pages/SidebarLayout";
import ProfilePage from "./pages/ProfilePage";
import Dashboard from "./pages/Dashboard";
import TheVault from "./pages/TheVault"; // Corrected path to TheVault
import { ThemeProvider } from "./components/theme-provider";
import ErrorBoundary from "./components/error-boundary";
import "./index.css";

// Protected Route wrapper that redirects to /auth if not authenticated
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background text-foreground">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>

        {/* 1. Global Loading State 
            Shows this while checking if the user is logged in. 
            Prevents flickering. */}
        <AuthLoading>
          <div className="flex h-screen w-full items-center justify-center bg-background text-foreground">
            <div className="animate-pulse">Loading Baithak...</div>
          </div>
        </AuthLoading>

        <Routes>
          {/* 2. Public Route: Accessible by everyone */}
          <Route path="/" element={<LandingPage />} errorElement={<ErrorBoundary />} />

          {/* 3. Auth Route: Smart Redirection 
              - If Logged Out: Show AuthPage
              - If Logged In: Redirect to Dashboard immediately 
          */}
          <Route
            path="/auth"
            element={
              <>
                <Unauthenticated>
                  <AuthPage />
                </Unauthenticated>
                <Authenticated>
                  <Navigate to="/dashboard" />
                </Authenticated>
              </>
            }
            errorElement={<ErrorBoundary />}
          />

          {/* 4. Protected Routes 
              - TODO: Re-enable ProtectedRoute wrapper when backend auth is ready
              - For now, allowing direct access for frontend testing
          */}
          <Route
            element={
              // <ProtectedRoute>
              <SidebarLayout />
              // </ProtectedRoute>
            }
            errorElement={<ErrorBoundary />}
          >
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/vault" element={<TheVault />} />
          </Route>

          {/* 5. Fallback for Unauthenticated users trying to hit protected routes */}
          <Route
            path="*"
            element={
              <Unauthenticated>
                <Navigate to="/auth" />
              </Unauthenticated>
            }
          />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
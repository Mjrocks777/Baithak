import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import { SidebarLayout } from "./pages/SidebarLayout";
import ProfilePage from "./pages/ProfilePage";
import Dashboard from "./pages/Dashboard";
import { ThemeProvider } from "./components/theme-provider";
import ErrorBoundary from "./components/error-boundary";
import "./index.css";

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
              - We wrap the Layout in <Authenticated>.
              - If user is NOT logged in, this entire section is hidden 
                and they are redirected to /auth automatically.
          */}
          <Route 
            element={
              <Authenticated>
                <SidebarLayout />
              </Authenticated>
            } 
            errorElement={<ErrorBoundary />}
          >
             {/* If not logged in, these children won't render */}
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { DarkModeProvider } from "./context/DarkModeContext";
import ToasterComponent from "./utils/ToasterComponent";
import ProtectedRoute from "./ui/ProtectedRoute";
import GlobalStyles from "./styles/GlobalStyles";

const AppLayout = lazy(() => import("./ui/AppLayout"));

const Account = lazy(() => import("./pages/Account"));
const Booking = lazy(() => import("./pages/Booking"));
const Cabins = lazy(() => import("./pages/Cabins"));
const Checkin = lazy(() => import("./pages/Checkin"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Guest = lazy(() => import("./pages/Guest"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Settings = lazy(() => import("./pages/Settings"));
const Workers = lazy(() => import("./pages/Workers"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/account" element={<Account />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/checkin" element={<Checkin />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/cabins" element={<Cabins />} />
                <Route path="/guest" element={<Guest />} />
                <Route path="/workers" element={<Workers />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToasterComponent />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;

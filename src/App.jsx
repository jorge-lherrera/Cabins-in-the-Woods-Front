import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

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

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<AppLayout />}>
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
  );
}

export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UsersPage } from "../../pages/users/UsersPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { ProductsPage } from "../../pages/ProductsPage/ProductsPage";
import { AuthGuard } from "../../features/auth/ui/AuthGuard";
import { useAppSelector } from "../storeHooks";

export const AppRouter = () => {
  const token = useAppSelector((state) => state.auth.token);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/products"
        element={
          <AuthGuard>
            <ProductsPage />
          </AuthGuard>
        }
      />
      <Route
        path="*"
        element={<Navigate to={token ? "/products" : "/login"} replace />}
      />
    </Routes>
  );
};

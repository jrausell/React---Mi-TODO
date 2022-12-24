import { Navigate, Outlet, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedLayout = () => {
   const { user } = useAuth();
   const outlet = useOutlet();

   if (!user) {
      console.log('protectedlayour !user')
      return <Navigate to="/" />;
   }

   return (
      <Outlet />
   );
};
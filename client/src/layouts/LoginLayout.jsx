import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import Footer from "../components/Footer";

export const LoginLayout = () => {
   const { user } = useAuth();
   const outlet = useOutlet();

   if (user) {
      //return <Navigate to="/in/todo" replace />;
   }

   return (
      <div className="flex flex-col h-full relative justify-center items-center">

         <div className="flex-1 w-2/12 relative place-content-center text-center">
            <div className="flex place-content-center text-center">
             {outlet}
            </div>
         </div>
   
         <Footer note="MERN test app to learn the basics of Mongo Express React & Node" />
      </div>
   );
};

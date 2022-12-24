import { Navigate, useOutlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';

import Header from '../components/Header';
import Footer from '../components/Footer';

const queryClient = new QueryClient();

export const TodoLayout = () => {
   const outlet = useOutlet();

	const cssItemsList = [
		'flex h-full relative',
		'place-content-center',
      'shadow'
	]

   return (
      <QueryClientProvider client={queryClient}>
         <div className="App flex flex-col h-full relative">
            <Header title="Mi TO-DO" subtitle="simple+ TO-DO ReactJs" />
   
            <div className={cssItemsList.join(' ')}>
               {outlet}
			   </div>
   
            <Footer note="MERN test app to learn the basics of Mongo Express React & Node" />
         </div>
      </QueryClientProvider>
   );
};

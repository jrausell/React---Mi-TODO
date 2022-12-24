import React, { useContext } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

export const ProfilePage = () => {
  return (
    <div>
      <Header title="Mi TO-DO" subtitle="simple+ TO-DO ReactJs" />
      <h1>Profile</h1>
      <Footer note="MERN test app to learn the basics of Mongo Express React & Node" />
    </div>
  );
};

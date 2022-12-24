import React, { useContext } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

export const SettingsPage = () => {
  return (
    <div>
      <Header title="Mi TO-DO" subtitle="simple+ TO-DO ReactJs" />
      <h1>Settings</h1>
      <Footer note="MERN test app to learn the basics of Mongo Express React & Node" />
    </div>
  );
};

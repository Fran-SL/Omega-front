import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Profile from '../components/Profile';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />
      
      {/* Contenido principal */}
      <main className="flex-grow">
        <Profile />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;

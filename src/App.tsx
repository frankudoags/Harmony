import React from 'react';
import Routes from './Routes';
import { Footer, Navbar, Search } from './components';
import { HRC20, HRC721, HRC1155 } from './components/helpers';
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <Router>
      <Toaster />
    <div className="max-w-8xl mx-auto">
      <Navbar />
      <Search />
      <Routes />
    </div>
      <Footer />
      {/* Helper components */}
      <HRC20 />
      <HRC721 />
      <HRC1155 />
    </Router>
  );
}

export default App;

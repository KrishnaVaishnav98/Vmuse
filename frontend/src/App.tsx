import React from 'react';
import { AllRoutes } from './AllRoutes/AllRoutes';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <div className="App center">
      <Navbar />
      <AllRoutes />
    </div>
  );
}

export default App;

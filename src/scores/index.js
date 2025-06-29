import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './Header';
import Footer from './Footer';
import App from './App';
import LineItems from './LineItems';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <div className="flex-container">
      <Header />
      {/* Add more content or components here as needed */}
      <LineItems title="Hole" values={[1, 2, 3, 4, 5, 6, 7, 8, 9]} />
      <LineItems title="Handicap" values={[4, 4, 3, 5, 4, 4, 4, 3, 5]} />
      <App />
      <Footer />
    </div>
  </React.StrictMode>
);

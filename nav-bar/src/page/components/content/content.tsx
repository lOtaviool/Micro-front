import React from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = () => <div><h1>Home Page</h1></div>;
const About = () => <div><h1>About Page</h1></div>;
const Contact = () => <div><h1>Contact Page</h1></div>;

const Content = () => {
  return (
    <div className="content">
      <Routes>
        <Route path="/" element={Home} />
        <Route path="/about" element={About} />
        <Route path="/contact" element={Contact} />
      </Routes>
    </div>
  );
};

export default Content;